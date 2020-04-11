const dotenv = require('dotenv');
const mongoose = require('mongoose');
const {
	udacityCourses, udacityDegree
} = require('./udacity');
require('dotenv').config()

// Import environment variable
dotenv.config();

// Connect to DB
mongoose.connect(process.env.DB_CONNECTION, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	},
	() => console.log('Connected to DB!')
);

// Import courses and reviews
(async () => {
	try {
		await udacityCourses();
		await udacityDegree();
	} catch (err) {
		console.log(err);
	} finally {
		// process.exit()
	}
})();