const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const verify = require('./verifyToken');
const {
	registerValidation,
	loginValidation
} = require('../validation');

// Register
router.post('/register', async (req, res) => {
	const {
		error
	} = registerValidation(req.body);
	if (error) return res.status(400).send({
		'success': false,
		'message': error.details[0].message
	});

	const emailExist = await User.findOne({
		email: req.body.email.toLowerCase()
	});
	if (emailExist) return res.status(400).send({
		'success': false,
		'message': 'This email already exists!'
	});

	const salt = await bcrypt.genSalt(10);
	const hashPassword = await bcrypt.hash(req.body.password, salt);

	const user = new User({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email.toLowerCase(),
		password: hashPassword
	});

	try {
		await user.save();
		const token = jwt.sign({
			_id: user._id
		}, process.env.TOKEN_SECRET);
		res.header('Authorization', token).send({
			'success': true,
			'token': token
		});
	} catch (err) {
		res.status(400).send({
			'success': false,
			'error': err
		});
	}
});

// Login
router.post('/login', async (req, res) => {
	const {
		error
	} = loginValidation(req.body);
	if (error) return res.status(400).send({
		'success': false,
		'message': error.details[0].message
	});

	const user = await User.findOne({
		email: req.body.email.toLowerCase()
	});
	if (!user) return res.status(400).send({
		'success': false,
		'message': 'The email or password is invalid'
	});

	const validPass = await bcrypt.compare(req.body.password, user.password);
	if (!validPass) return res.status(400).send({
		'success': false,
		'message': 'The email or password is invalid'
	});

	const token = jwt.sign({
		_id: user._id
	}, process.env.TOKEN_SECRET);
	res.header('Authorization', token).send({
		'success': true,
		'token': token
	});
});

// Get Basic Info
router.get('/', verify, async (req, res) => {
	const infoExist = await User.findOne({
		_id: req.user._id
	}, '-password -__v');
	if (!infoExist) return res.status(400).send({
		'success': false,
		'error': 'Information not found'
	});

	res.send(infoExist);
});

// Create Profile
router.post('/profile', verify, async (req, res) => {
	const user = await User.findOne({
		_id: req.user._id
	});

	user.firstName = req.body.firstName;
	user.lastName = req.body.lastName

	const courses = user.profile ? user.profile.courses : [];
	const in_progress = user.profile ? user.profile.courses : [];

	user.profile = {
		title: req.body.title,
		education: req.body.education,
		location: req.body.location,
		courses: courses,
		in_progress: in_progress,
		about: req.body.about,
		skills: req.body.skills,
		experiences: req.body.experiences
	}

	try {
		await user.save();
		res.send({
			'success': true,
			'message': user
		});
	} catch (err) {
		res.status(400).send({
			'success': false,
			'error': err
		});
	}
});

// Get Profile
router.get('/profile', verify, async (req, res) => {
	const user = await User.findOne({
			_id: req.user._id
		}, '-password -created_at -__v')
		.populate({
			path: 'profile.courses',
			model: 'Course',
			select: '_id title url image shortSummary'
		})
		.populate({
			path: 'profile.in_progress',
			model: 'Course',
			select: '_id title url image shortSummary'
		})

	res.send(user);
});

// Add course to in progress
router.post('/course', verify, async (req, res) => {
	const user = await User.findOne({
		_id: req.user._id
	});

	const newStatus = req.body.newStatus;
	if (newStatus == "inProgress") {
		user.profile.in_progress.push(req.body.courseId);
	} else if (newStatus == "Completed") {
		const index = user.profile.in_progress.indexOf(req.body.courseId);
		if (index > -1) {
			user.profile.in_progress.splice(index, 1);
		}
		user.profile.courses.push(req.body.courseId);
	}

	try {
		await user.save();
		res.send({
			'success': true,
			'message': 'Course status changed'
		});
	} catch (err) {
		res.status(400).send({
			'success': false,
			'error': err
		});
	}
});

// Get course progress 
router.get('/course/:id', verify, async (req, res) => {
	const user = await User.findOne({
		_id: req.user._id
	});

	if (user.profile.in_progress.includes(req.params.id)) {
		return res.send({
			'success': true,
			'message': 'In Progress'
		});
	} else if (user.profile.courses.includes(req.params.id)) {
		return res.send({
			'success': true,
			'message': 'Completed'
		});
	}

	return res.send({
		'success': true,
		'message': 'New Course'
	});
});



module.exports = router;