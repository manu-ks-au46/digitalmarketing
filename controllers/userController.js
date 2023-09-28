const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");

const signUp = async (req, res) => {
  const { userName, email, mobileNumber, password } = req.body;
  try {
    loggedInUser = await userModel.findOne({ mobileNumber: mobileNumber });
    if (loggedInUser) {
      res.status(400).send({ status: "error", msg: "user already exist" });
      return;
    }
    const protectedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      email,
      userName,
      mobileNumber,
      password: protectedPassword,
    });
    res.status(200).send({
      status: "success",
      msg: "user registred successfully",
      user: {
        userName: newUser.userName,
        mobileNumber: newUser.mobileNumber,
        email: newUser.email,
      },
    });
  } catch (error) {
    res
      .status(500)
      .send({ status: "error", msg: "internal server error ", error });
  }
};

const logIn = async (req, res) => {
  const { mobileNumber, password } = req.body;
  try {
    const loggedInUser = await userModel.findOne({
      mobileNumber: mobileNumber,
    });
    if (!loggedInUser) {
      res.status(400).send({ status: "error", msg: "User not found" });
      return;
    } else {
      isPasswordMatch = await bcrypt.compare(password, loggedInUser.password);
      if (!password) {
        res.status(400).send({ status: "error", msg: "Password Incorrect" });
        return;
      }
    }
    const userPayload = { mobileNumber, isAdmin: loggedInUser.isAdmin };
    const token = jwt.sign(userPayload, process.env.SECRET_KEY, {
      algorithm: "HS384",
      expiresIn: "1d",
    });
    res.cookie("jwt", token);
    res.send({ status: "success", msg: "User Logged in Successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ status: "error", error, msg: "Internal Server Error" });
  }
};

const logOut = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.send({ status: "success", msg: "Logged Out Successfully" });
};

module.exports = {
  signUp,
  logIn,
  logOut,
};
