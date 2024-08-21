const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const dbConnect = async () => {
  try {
    console.log(process.env.LINK_CONNECT_DB);
    await mongoose.connect(process.env.LINK_CONNECT_DB).then(() => {
      console.log("Connected to the database");
    });
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

module.exports = dbConnect;
