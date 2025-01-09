const express = require("express");
const UserController = require("../controllers/UserController");

const userRouter = express.Router();

// routes
userRouter.get("register", UserController.login);
userRouter.post("/register", UserController.signup);
// userRouter.put("/register/:id", UserController.updatePassword);
// userRouter.delete("/register/:id", UserController.deleteUser);

module.exports = userRouter;