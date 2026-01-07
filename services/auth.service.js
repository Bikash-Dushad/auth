const AuthModel = require("../models/auth.schema");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const {
  sendOTPValidator,
  generateOTP,
  generateUniqueId,
  verifyOTPValidator,
} = require("../validators/auth.validator");
const { createToken } = require("../utils/token.handler");

const sendOTPService = async (payload) => {
  const { phone, role } = payload;
  const { error } = sendOTPValidator.validate(payload);
  if (error) {
    throw new Error(error.details[0].message);
  }
  const authId = generateUniqueId();
  const otp = generateOTP();
  const findUser = await AuthModel.findOne({ phone, role });
  if (findUser) {
    findUser.otp = otp;
    await findUser.save();
    return findUser;
  }
  const newUser = new AuthModel({
    phone,
    role,
    authId,
    otp,
  });
  await newUser.save();
  return newUser;
};

const verifyOTPService = async (payload) => {
  const { phone, role, otp } = payload;
  const { error } = verifyOTPValidator.validate(payload);
  if (error) {
    throw new Error(error.details[0].message);
  }
  const user = await AuthModel.findOne({ phone, role });
  if (!user) {
    throw new Error("User not found");
  }
  if (user.otp !== otp) {
    throw new Error("Invalid otp");
  }
  const tokenPayload = {
    id: user._id,
  };
  const token = createToken(tokenPayload);
  user.otp = "";
  await user.save();
  return token;
};

module.exports = {
  sendOTPService,
  verifyOTPService,
};
