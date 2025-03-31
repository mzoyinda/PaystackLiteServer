const express = require("express");
const connectDB = require("./config/db"); 
const PaymentRoutes = require("./routes/payment.routes");

const app = express();

// Middleware
app.use(express.json()); 
app.use(express.urlencoded({ extended: false })); 

// Routes
app.use("/api/v1/payments", PaymentRoutes);
app.get('/', (req, res) => {
  res.status(200).json({ message: "Welcome to the PayStacklite Server!" });
});


const startServer = async () => {
  try {
      await connectDB();

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error.message);
    process.exit(1); // Exit the process on failure
  }
};


if (process.env.NODE_ENV !== "test") {
  startServer();
}

module.exports = app; 