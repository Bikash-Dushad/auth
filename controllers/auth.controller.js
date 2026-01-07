const {
  sendOTPService,
  verifyOTPService,
} = require("../services/auth.service");
const { handleError } = require("../utils/error.handler");

const sendOTP = async (req, res) => {
  try {
    const payload = req.body;
    const data = await sendOTPService(payload);
    return res.status(200).json({
      responseCode: 200,
      message: "Opt sent successfully",
      data,
    });
  } catch (error) {
    return handleError(res, error, "sendOTP");
  }
};

const verifyOTP = async (req, res) => {
  try {
    const payload = req.body;
    const data = await verifyOTPService(payload);
    return res.status(200).json({
      responseCode: 200,
      message: "Otp verified successfully",
      data,
    });
  } catch (error) {
    return handleError(res, error, "verifyOtp");
  }
};

module.exports = {
  sendOTP,
  verifyOTP,
};
