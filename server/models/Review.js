const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
	comment: {
		type: String,
		required: true,
	},
	rating: {
		type: Number,
		required: true,
		min: 1,
		max: 5
	},
	course: {
		type: mongoose.Types.ObjectId,
		ref: 'Course',
		required: true
	},
	rated_by: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
		required: true
	},
	created_at: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Review', reviewSchema);