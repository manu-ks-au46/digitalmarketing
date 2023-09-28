const { Router } = require("express");
const { signUp, logIn, logOut } = require("../controllers/userController");

const userRouter = new Router();

userRouter.post("/signup", signUp);
userRouter.post("/login", logIn);
userRouter.post("/logout", logOut);

module.exports = userRouter;
