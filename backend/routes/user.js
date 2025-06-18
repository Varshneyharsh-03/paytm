const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const zod = require("zod");
const { JWT_SECRET } = require("../config");
const authmiddleware = require("../middleware");

const { User, Account } = require("../db");

const signupBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
  firstname: zod.string(),
  lastname: zod.string(),
});

router.post("/signup", async (req, res) => {
  const success = signupBody.safeParse(req.body);
  if (!success.success) {
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

  await Account.create({
    userId: user._id,
    balance: 1 + Math.random() * 10000,
  });

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
  const success = signinBody.safeParse(req.body);

  if (!success.success) {
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

const updateBody = zod.object({
  password: zod.string(),
  firstname: zod.string(),
  lastname: zod.string(),
});

async function updateHandler(req, res) {
  try {
    updateBody.safeParse(req.body); // throws if invalid
  } catch (error) {
    return res.status(411).json({
      msg: "Error while updating information",
      error: error.errors, // optional: include Zod error details
    });
  }

  const user = await User.updateOne({ _id: req.userId }, req.body);

  return res.status(200).json({
    user,
    msg: "User details updated successfully",
  });
}

router.put("/", authmiddleware, updateHandler);

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      { firstname: { $regex: filter, $options: "i" } },
      { lastname: { $regex: filter, $options: "i" } },
    ],
  });

  return res.status(200).json({
    user: users.map((u) => ({
      username: u.username,
      firstName: u.firstName,
      lastName: u.lastName,
      _id: u._id,
    })),
  });
});

module.exports = router;
