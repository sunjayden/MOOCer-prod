const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
	title: String,
	location: String,
	education: [{
		school: String,
      	degree: String,
		major: String,
		startDate: String,
		endDate: String,
	}],
	about: String,
	skills: [{
		type: String
	}],
	courses: [{
		type: mongoose.Types.ObjectId,
		ref: 'Course'
	}],
	in_progress: [{
		type: mongoose.Types.ObjectId,
		ref: 'Course'
	}],
	experiences: [{
		title: String,
		company: String,
		startDate: String,
		endDate: String,
		description: String
	}]
}, {
	_id: false
});

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		min: 6,
		max: 255
	},
	password: {
		type: String,
		required: true,
		min: 6,
		max: 1024
	},
	created_at: {
		type: Date,
		default: Date.now
	},
	profile: profileSchema
});

module.exports = mongoose.model('User', userSchema);