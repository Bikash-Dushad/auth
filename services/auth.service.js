const AuthModel = require("../models/auth.schema");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const sendOTP = async (payload) => {
  const { phone, role } = payload;
};
