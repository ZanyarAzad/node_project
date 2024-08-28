const Joi = require("joi");

exports.validateUser = (req, res, next) => {
  const schema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    age: Joi.number().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    res.status(400).send({ message: error.details[0].message });
  } else {
    next();
  }
};
