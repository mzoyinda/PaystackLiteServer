require("dotenv").config({ path: "./config/test.env" });
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri); 
  console.log("Connected to in-memory MongoDB");

  if (!process.env.PAYSTACK_SECRET_KEY) {
    throw new Error("❌ PAYSTACK_SECRET_KEY is missing!");
  } else {
    console.log("✅ PAYSTACK_SECRET_KEY is loaded!");
  }
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
  console.log("MongoDB connection closed");
});
