require('dotenv').config();   // to use .env file content in this file 
const mongoose = require('mongoose'); // provides the schema/structure/plan for the data stored in MongoDB and allows CRUD operations on the database

const connectDB = async () => {
  console.log('Starting MongoDB connection...');  // Log to indicate the start of the connection process
  try {
    // Attempt to connect to MongoDB using the URL from the .env file
    await mongoose.connect(process.env.MONGO_URL, {  // process.env.MONGO_URL reads the connection URL from .env file
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Remove useCreateIndex
    });
    console.log('MongoDB connected successfully');  // Log if the connection is successful

  } catch (err) {
    console.error('Could not connect to database:', err.message); // Log the specific error message
    console.error('Stack trace:', err.stack);  // Log the stack trace for more details
    process.exit(1);  // Exit the process with failure if connection fails
  }
};

// module.exports --> exporting this component to other files 
module.exports = connectDB;

