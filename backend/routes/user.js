const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const zod = require("zod");
const { JWT_SECRET } = require("../config");

const { User } = require("../db");

const signupBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
  firstname: zod.string(),
  lastname: zod.string(),
});

router.post("/signup", async (req, res) => {
  const success = signupBody.parse(req.body);
  if (!success) {
    return res.status(411).json({
      msg: "invalid input / user already exists",
    });
  }
  const { username, password, firstname, lastname } = req.body;

  const exists = await User.findOne({
    username: username,
  });

  if (exists) {
    return res.status(411).json({
      msg: "username already exists try something new",
    });
  }

  const user = await User.create({
    username: username,
    password: password,
    firstname: firstname,
    lastname: lastname,
  });

  const userId = user._id;

  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );

  return res.status(200).json({
    token: token,
    msg: "User created successfully",
  });
});

const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

router.post("/signin", async (req, res) => {
  const success = signinBody.parse(req.body);

  if (!success) {
    return res.status(411).json({
      msg: "Error while logging in",
    });
  }

  const { username, password } = req.body;

  const user = await User.findOne({
    username: username,
    password: password,
  });

  if (!user) {
    return res.status(411).json({
      msg: "incorrect email or password",
    });
  }

  const userId = user._id;

  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );

  return res.status(200).json({
    msg: "User signed in successfully",
    token: token,
  });
});

module.exports = {
  router,
};
