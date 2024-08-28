const db = require("../db");
const reusable = require("../plugin/methods");
class UserModel {
  async getAllUsers() {
    return await db.user.findMany({
      select: { id: true, first_name: true, age: true },
      where: { active: true },
    });
  }
  async getUserById(userId) {
    return await db.user.findFirstOrThrow({
      where: { id: userId },
      select: { id: true, first_name: true, age: true },
    });
  }

  async getUserByAge(age) {
    return await db.user.findFirst({
      where: { age: age },
      select: { id: true, first_name: true, age: true },
    });
  }
  async addUser(body) {
    return await db.user.create({ data: body });
  }

  async updateUser(body, userId) {
    return await db.user.update({ data: body, where: { id: userId } });
  }

  async deleteUser(user_id) {
    return await db.user.delete({ where: { id: user_id } });
  }
}
module.exports = new UserModel();
