const axios = require('axios');
const Course = require('../models/Course');

// Import courses
const courses = async () => {
	try {
		const response = await axios.get('https://www.udacity.com/public-api/v1/courses');
		const courses = response.data.courses

		await courses.forEach(async (course_info) => {
			if (course_info.available && course_info.public_listing) {
				course = convertCourse(course_info)
				await course.save();
			}
		});
		console.log('Added all Udacity courses');
	} catch (error) {
		console.log(error);
	}
}

// Import Nanodegrees
const degrees = async () => {
	try {
		const response = await axios.get('https://catalog-api.udacity.com/v1/degrees');
		const degrees = response.data.degrees

		await degrees.forEach(async (degree_info) => {
			if (degree_info.available) {
				degree = convertDegree(degree_info)
				degree_reviews = await addReviews(degree);
				await degree_reviews.save();
			}
		});

		console.log('Added all Udacity degrees');
	} catch (error) {
		console.log(error);
	}
}

const addReviews = async (degree) => {
	try {
		const response = await axios.get('https://ratings-api.udacity.com/api/v1/reviews?node=' + degree.key + '&limit=5000');
		const reviews = response.data.reviews;

		if (reviews) {
			reviews.forEach((review) => {
				degree.reviews.push({
					name: review.display_name,
					rating: review.rating,
					comment: review.student_comment,
					created_at: review.created_at
				});
			})
		}

		return degree;
	} catch (error) {
		console.log(error);
	}
}

// Helper functions
function convertCourse(course) {
	return new Course({
		affiliates: course.affiliates,
		duration: course.expected_duration + ' ' + course.expected_duration_unit,
		learning: removeHtmlTags(course.expected_learning),
		key: course.key,
		image: course.image,
		level: course.level,
		isFreeCourse: course.metadata.is_free_course,
		lessons: course.program_syllabus.lessons,
		// projects: course.projects,
		prerequisite: course.required_knowledge,
		shortSummary: course.short_summary,
		url: 'https://www.udacity.com/course/' + course.slug,
		subtitle: course.subtitle,
		summary: removeHtmlTags(course.summary),
		tags: combineTags(course.tags, course.tracks, course.skills),
		title: course.title,
		platform: 'udacity'
	});
}

function convertDegree(degree) {
	return new Course({
		affiliates: degree.affiliates,
		learning: removeHtmlTags(degree.expected_learning),
		key: degree.key,
		image: degree.image,
		level: degree.level,
		isFreeCourse: degree.metadata.is_free_course,
		prerequisite: degree.required_knowledge,
		shortSummary: degree.short_summary,
		url: 'https://www.udacity.com/course/' + degree.slug,
		subtitle: degree.subtitle,
		summary: removeHtmlTags(degree.summary),
		tags: combineTags(degree.tags, degree.tracks, degree.skills),
		title: degree.title,
		platform: 'Udacity',
		degree: true
	});
}

function removeHtmlTags(str) {
	return str.replace(/(<([^>]+)>)/ig, '');
}

function combineTags(tags, tracks, skills) {
	if (tracks) tags.concat(tracks);
	if (skills) tags.concat(skills);
	tags.filter(item => item !== 'All')
	return tags;
}

module.exports = {
	udacityCourses: courses,
	udacityDegree: degrees
};