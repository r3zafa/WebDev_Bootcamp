const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const cleanedText = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {}
                });
                if (cleanedText !== value) return helpers.error('string.escapeHTML', { value })
                return cleanedText;
            }
        }
    }
});


const Joi = BaseJoi.extend(extension);

module.exports.campgroundSchema = Joi.object({
    campground: Joi.object({
        title: Joi.string().required().escapeHTML(),
        price: Joi.number().required().min(0),
        location: Joi.string().required().escapeHTML(),
        geometry: Joi.object,
        description: Joi.string().required().escapeHTML()

    }).required(),
    deleteImages: Joi.array()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(0).max(5),
        body: Joi.string().required().min(3).max(300).escapeHTML()
    }).required()
});