const Joi = require('@hapi/joi');

// Register Validation
const registerValidation = (data) => {
	const schema = Joi.object({
		firstName: Joi.string()
			.required(),
		lastName: Joi.string()
			.required(),
		email: Joi.string()
			.min(6)
			.required()
			.email(),
		password: Joi.string()
			.required()
	});

	return schema.validate(data);
};

// Login Validation
const loginValidation = (data) => {
	const schema = Joi.object({
		email: Joi.string()
			.min(6)
			.required()
			.email(),
		password: Joi.string()
			.min(6)
			.required()
	});

	return schema.validate(data);
};

// Review Validation
const reviewValidation = (data) => {
	const schema = Joi.object({
		comment: Joi.string()
			.required(),
		rating: Joi.number()
			.min(1)
			.max(5)
			.required(),
		course: Joi.string()
			.required()
	});

	return schema.validate(data);
};

// Course ID Validation
const courseIdValidation = (data) => {
	const schema = Joi.object({
		courseId: Joi.string()
			.min(24)
			.max(24)
			.required(),
		perPage: Joi.string(),
		page: Joi.string()
	});

	return schema.validate(data);
};

module.exports = {
	registerValidation,
	loginValidation,
	reviewValidation,
	courseIdValidation
};