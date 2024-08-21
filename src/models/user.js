const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "User name is required"],
  },
  email: {
    type: String,
    required: [true, "User email is required"],
  },
  password: {
    type: String,
    required: [true, "User password is requird"],
  },
});

module.exports = mongoose.model("User", userSchema);
