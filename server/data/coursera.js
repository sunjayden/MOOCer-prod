const axios = require('axios');
const Course = require('../models/Course');

// Import courses
const getCourseList = async () => {
	let start = 0;
	let all_courses = [],
		courses = [];

	// Added 500 courses since Udacity only has around 200 courses.
	do {
		const response = await axios.get('https://api.coursera.org/api/courses.v1?start=' + start);
		courses = response.data.elements;
		all_courses = all_courses.concat(courses);
		start += courses.length;
	} while (all_courses.length < 500)

	return all_courses;
}

const courses = async () => {
	try {
		var courseList = await getCourseList();
		console.log("Adding " + courseList.length + " Coursera courses")
		courseList.forEach(async (course) => {
			const response = await axios.get('https://api.coursera.org/api/courses.v1/' + course.id + '?fields=id,slug,name,content,primaryLanguages,photoUrl,description,courseType,workload,domainTypes');
			const data = response.data.elements[0];
			var courseLevel = "On Demand"
			if (data.courseType == "v1.session") {
				courseLevel = "Session"
			}

			const courseraCourse = new Course({
				// affiliates: "",
				duration: data.workload.split(" ").slice(0, 2).join(" "),
				// learning: "",
				key: data.id,
				image: data.photoUrl,
				level: courseLevel,
				isFreeCourse: true,
				prerequisite: "No prerequisite is required.",
				shortSummary: data.description.substring(0, data.description.indexOf(".") + 1),
				url: 'https://www.coursera.org/learn/' + data.slug,
				// subtitle: "",
				summary: data.description,
				tags: convertTags(data.domainTypes),
				title: data.name,
				platform: 'coursera',
			});

			await courseraCourse.save();
		});
		console.log("Added all Coursera degrees")
	} catch (error) {
		console.log(error);
	}
}

function convertTags(domainTypes) {
	var tags = []
	domainTypes.forEach(data => {
		tags.push(data.subdomainId);
		tags.push(data.domainId);
	})
	return tags;
}

module.exports = {
	courseraCourses: courses
};