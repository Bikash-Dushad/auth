const Joi = require("joi");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");

const generateOTP = () => {
  const buffer = crypto.randomBytes(4);
  const hex = buffer.toString("hex");
  const otp = parseInt(hex, 16) % 1000000;
  return otp.toString().padStart(6, "0");
};

const generateUniqueId = () => {
  const uuid = uuidv4().split("-")[0];
  return `${uuid}`.toUpperCase();
};

const sendOTPValidator = Joi.object({
  phone: Joi.string().required().messages({
    "any.only": "Phone is required",
  }),
  role: Joi.string().required().messages({
    "any.only": "Role is required",
  }),
});

const verifyOTPValidator = Joi.object({
  phone: Joi.string().required().messages({
    "any.only": "Phone is required",
  }),
  role: Joi.string().required().messages({
    "any.only": "Role is required",
  }),
  otp: Joi.string().required().messages({
    "any.only": "Otp is required",
  }),
});

module.exports = {
  generateOTP,
  generateUniqueId,
  sendOTPValidator,
  verifyOTPValidator,
};
