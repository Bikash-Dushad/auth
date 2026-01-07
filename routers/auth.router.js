const express = require("express");
const UserRouter = express.Router();

const { authMiddleware } = require("../middleware/authMiddleware");
const { sendOTP, verifyOTP } = require("../controllers/auth.controller");

UserRouter.post("/sendOTP", sendOTP);
UserRouter.post("/verifyOTP", verifyOTP);

module.exports = UserRouter;
