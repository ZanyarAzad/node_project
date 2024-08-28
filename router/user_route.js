const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");

router.get("", userController.getAllUsers);
router.get("/:userId", userController.getUser);
router.get("/:userId/:age", userController.getUserByAge);
router.post("", userController.createUser);
router.put("/:userId");
router.delete("/remove_user/:user_id", userController.deleteUser);

module.exports = router;
