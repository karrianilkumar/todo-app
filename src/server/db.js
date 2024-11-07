
require('dotenv').config()   // to use .env file content in this file 
const mongoose = require('mongoose'); // // to provide the scehema / structure / plan for the data stored in the mogodb and allows to perform crud operations on databse 

const connectDB = async () => {
  try {
  
  //  await mongoose.connect('mongodb://localhost:27017/todo-app', { // // connected to the todo-app collection in mongodb 
   
await mongoose.connect(process.env.MONGO_URL, { //process.env.MONGO_URL open .env there db connection url link  
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Remove useCreateIndex
    });
    console.log('MongoDB connected');


  } catch (err) {
    console.error('Could not connect to database.', err);
    process.exit(1);
  }
};
// // module.exports --> exporting this component to other files 
module.exports = connectDB;



