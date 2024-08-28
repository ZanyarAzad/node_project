const Joi = require("joi");

class ValidateUser {
  addUserValidation(body) {
    const schema = Joi.object({
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      age: Joi.number().integer().required(),
    });
    return schema.validate(body);
    // return (req, res, next) => {
    //   const { error } =

    //   if (error) {
    //     res.status(400).send({ message: error.details[0].message });
    //   } else {
    //     next();
    //   }
    // };
  }
}

module.exports = new ValidateUser();
