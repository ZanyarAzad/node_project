const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
const userValidation = require("../validation/user.validation");

router.get("/users", userController.getAllUsers);
router.get("/users/:userId", userController.getUser);
router.get("/users/:userId/:age", userController.getUserByAge);
router.post("/users", userController.createUser);
router.put(
  "/users/:userId",
  userValidation.validateUser,
  userController.updateUser
);
router.delete("/remove_user/:user_id", userController.deleteUser);

module.exports = router;
