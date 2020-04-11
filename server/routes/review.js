const router = require('express').Router();
const Review = require('../models/Review')
const verify = require('./verifyToken');
const {
	reviewValidation,
	courseIdValidation
} = require('../validation');

router.get('/', async (req, res) => {
	const {
		error
	} = courseIdValidation(req.query);
	if (error) return res.status(400).send(error.details[0].message);

	const courseId = req.query.courseId
	const perPage = parseInt(req.query.perPage) || 5;
	const page = parseInt(req.query.page) || 1;

	const reviews = await Review.find({course: courseId})
		.skip((perPage * page) - perPage)
		.limit(perPage)
		.sort({date: -1})
		.populate('rated_by', 'firstName lastName');
	const numOfReviews = await Review.find({course: courseId}).countDocuments();

	const allReviews = await Review.find({course: courseId}).select('rating -_id');

	return res.send({
		reviews: reviews,
		limit: perPage,
		page: page,
		pages: Math.ceil(numOfReviews / perPage),
		total: numOfReviews,
		avg_rating: ratingAvg(allReviews)
	})
});

router.post('/', verify, async (req, res) => {
	const {
		error
	} = reviewValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const review = new Review({
		comment: req.body.comment,
		rating: req.body.rating,
		course: req.body.course,
		rated_by: req.user._id
	});

	try {
		await review.save();
		res.send({'review': review});
	} catch (err) {
		res.status(400).send(err);
	}
});

// Helper function
const ratingAvg = arr => {
	var sum = 0;
	for (var i = 0; i < arr.length; i++) {
		sum += arr[i].rating;
	}
	return sum / arr.length;
}

module.exports = router;