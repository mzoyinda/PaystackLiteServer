require("dotenv").config({ path: "./config/config.env" });
const mongoose = require("mongoose");

let isConnected = false; 

const connectDB = async () => {
  if (isConnected) return; // Prevent reconnecting if already connected

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true; 
    console.log("DB connected successfully");
  } catch (error) {
    console.error("DB connection failed", error);
  }
};

module.exports = connectDB;
