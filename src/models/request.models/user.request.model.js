const Joi = require('joi');

const schema = Joi.object().keys(
    {
        username: Joi.string().alphanum().min(3).max(30).required(),
        name: Joi.string().alphanum().min(3).max(30),
        address: Joi.string(),
        email: Joi.string().min(3).max(30).required(),
        age: Joi.number(),
    }
);

const validate = (data) => {
    const result = schema.validate(data);
    data.createdAt = new Date();
    result.value = data;
    return result;
}
module.exports = validate;