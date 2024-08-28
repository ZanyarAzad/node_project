const db = require("../db");
const reusable = require("../plugin/methods");

class UserController {
  async getAllUsers(req, res) {
    const allUser = await db.user.findMany({
      select: { id: true, first_name: true, age: true },
      where: { active: true },
    });
    res.send(allUser);
  }

  async getUser(req, res) {
    const userId = parseInt(req.params.userId);
    try {
      const user = await db.user.findFirstOrThrow({
        where: { id: userId },
        select: { id: true, first_name: true, age: true },
      });
      res.send(user);
    } catch (err) {
      const error = reusable.prismaCatch(err);
      res.status(error.status).send({ message: error.message });
    }
  }

  async getUserByAge(req, res) {
    const age = req.params.age;
    const user = await db.user.findFirst({
      where: { age: age },
      select: { id: true, first_name: true, age: true },
    });
    res.send(user);
  }

  async createUser(req, res) {
    const body = req.body;
    const addUser = await db.user.create({ data: body });
    res.send(addUser);
  }

  async updateUser(req, res) {
    const body = req.body;
    const userId = parseInt(req.params.userId);
    const user = await db.user.update({ data: body, where: { id: userId } });
    res.send(user);
  }

  async deleteUser(req, res) {
    const user_id = parseInt(req.params.user_id);
    try {
      const deletedUser = await db.user.delete({ where: { id: user_id } });
      res.send({ message: "User deleted successfully", user: deletedUser });
    } catch (err) {
      const error = reusable.prismaCatch(err);
      res.status(error.status).send({ message: error.message });
    }
  }
}

module.exports = new UserController();
