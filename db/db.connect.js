const mongoose = require("mongoose");
require("dotenv").config();

const URI = process.env.MONGODB_URI;
const initializeDBConnection = async () => {
  try {
    const connection = await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (connection) {
      console.info("Successfully Connected");
    }
  } catch (error) {
    console.error("mongoose connection failed", error);
  }
};

module.exports = { initializeDBConnection };
