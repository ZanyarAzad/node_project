const db = require("../db");
const reusable = require("../plugin/methods");
const model = require("../models/user.model");
const validate = require("../validation/user.validation");
class UserController {
  getAllUsers(req, res) {
    model
      .getAllUsers()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        const error = reusable.prismaCatch(err);
        res.status(error.status).send({ message: error.message });
      });
  }

  getUser(req, res) {
    const userId = parseInt(req.params.userId);
    model
      .getUserById(userId)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        const error = reusable.prismaCatch(err);
        res.status(error.status).send({ message: error.message });
      });
  }

  getUserByAge(req, res) {
    const age = req.params.age;
    model
      .getUserByAge(age)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        const error = reusable.prismaCatch(err);
        res.status(error.status).send({ message: error.message });
      });
  }

  createUser(req, res) {
    const body = req.body;
    if (validate.addUserValidation(body).error) {
      res.send({
        message: validate.addUserValidation(body).error.details[0].message,
      });
    } else {
      console.log("valid");
      model
        .addUser(body)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          const error = reusable.prismaCatch(err);
          res.status(error.status).send({ message: error.message });
        });
    }
  }

  async updateUser(req, res) {
    const body = req.body;
    const userId = parseInt(req.params.userId);
    model
      .updateUser(body, userId)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        const error = reusable.prismaCatch(err);
        res.status(error.status).send({ message: error.message });
      });
  }

  async deleteUser(req, res) {
    const user_id = parseInt(req.params.user_id);
    model
      .deleteUser(user_id)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        const error = reusable.prismaCatch(err);
        res.status(error.status).send({ message: error.message });
      });
  }
}

module.exports = new UserController();
