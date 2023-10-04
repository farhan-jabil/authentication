const mongoose = require("mongoose");

// Define the MongoDB connection URL
const mongoURL = "mongodb://127.0.0.1:27017/authentication"; // Replace with your MongoDB URL and database name

// Connect to database using async/await

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to Database");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
};

module.exports = connectToMongo;
