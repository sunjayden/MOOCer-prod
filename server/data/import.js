const dotenv = require('dotenv');
const mongoose = require('mongoose');
const {
	udacityCourses, udacityDegree
} = require('./udacity');
const {
	courseraCourses
} = require('./coursera');
require('dotenv').config()

// Import environment variable
dotenv.config();

// Connect to DB
mongoose.connect('mongodb://admin:a123456@ds339648.mlab.com:39648/moocer', {
		useNewUrlParser: true,
		useUnifiedTopology: true
	},
	() => console.log('Connected to DB!')
);

// Import courses and reviews
(async () => {
	try {
		// await udacityCourses();
		// await udacityDegree();
		await courseraCourses();
	} catch (err) {
		console.log(err);
	}
})();