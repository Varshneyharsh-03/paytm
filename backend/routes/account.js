const express = require("express");
const router = express.Router();
const { Account, User } = require("../db");
const authmiddleware = require("../middleware");

router.get("/balance", authmiddleware, async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId,
  });

  return res.status(201).json({
    balance: account.balance,
  });
});

router.post("/transfer", authmiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const { to, amount } = req.body;
  const account = await Account.findOne({ userId: req.userId }).session(
    session
  );

  if (!account || account.balance < amount) {
    await session.abortTransaction();
    return res.status(411).json({
      msg: "account doesnot exists or have insufficient balance",
    });
  }

  const toAccount = await Account.findOne({ userId: to }).session(session);

  if (!toAccount) {
    await session.abortTransaction();
    return res.status(411).json({
      msg: "account to be credited does not exists",
    });
  }

  try {
    await Account.findByIdAndUpdate(
      { userId: req.userId },
      { $inc: { balance: -amount } }
    ).session(session);

    await Account.findByIdAndUpdate(
      { userId: to },
      { $inc: { balance: +amount } }
    ).session(session);

    await session.commitTransaction();
    return res.status(200).json({
      msg: "Transaction Successfull",
    });
  } catch (error) {
    console.log("Error in Transaction: ");
    console.log(error);
  }
});

module.exports = {
  router,
};
