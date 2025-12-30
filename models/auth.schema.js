const mongoose = require("mongoose");

const authSchema = new mongoose.Schema(
  {
    authId: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      default: "",
    },
    role: {
        type: String,
        enum: ["user", "captain", "super-admin", "admin", "moderator"],
        default: "user"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Auth", authSchema);
