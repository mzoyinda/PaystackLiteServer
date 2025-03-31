require("dotenv").config({ path: "./config/test.env" });
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;

console.log("✅ Jest is using TEST ENV:", process.env.NODE_ENV);

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri); // Removed deprecated options
  console.log("Connected to in-memory MongoDB");
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
  console.log("MongoDB connection closed");
});
