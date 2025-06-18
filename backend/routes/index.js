const express = require("express");

const router = express.Router();
const userRouter = require("./user");

router.use("/user", userRouter.router);
router.use("/account", accountRouter.router);
module.exports = {
  router,
};
