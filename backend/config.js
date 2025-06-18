const mongoose = require("mongoose");
const Account = require("./db");

const moneyTransfer = async (accountIdFrom, accountIdTo, amount) => {
  try {
    await Account.findByIdAndUpdate(accountIdFrom, {
      $inc: { balance: -amount },
    });

    await Account.findByIdAndUpdate(accountIdTo, {
      $inc: { balance: +amount },
    });
  } catch (error) {
    console.log("Error in trancation");
    console.log(error);
  }
};

module.exports = {
  JWT_SECRET: "TERI_MAA_KI_JAI_HO_69_96",
  moneyTransfer,
};
