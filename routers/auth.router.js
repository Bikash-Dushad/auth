const express = require("express");
const User = express.Router();

const { authMiddleware } = require("../middleware/authMiddleware");

module.exports = User;
