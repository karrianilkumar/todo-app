require('dotenv').config()   // to use .env file content in this file 

const tasks = require("./routes/tasks");
const connection = require("./db");  // importing the database connection  
const cors = require("cors");
const express = require("express");
const app = express();

connection(); //  function that establishes a connection to a database

/*  If a client sends a JSON object in a request, this middleware will parse it into JavaScript objects so your 
routes can use it.
example of json format  : 
{
    "task": "Complete homework",
    "completed": false
}
*/
app.use(express.json());
app.use(cors());  // : This enables Cross-Origin Resource Sharing (CORS).
/*
This is a route-level middleware that forwards any requests made to /api/tasks to the tasks router. 
The tasks router would typically handle all routes 
related to task management, such as getting, adding, updating, or deleting tasks.
*/
app.use("/api/tasks", tasks);

const port = process.env.PORT || 8080; //  process.env.PORT  is genera port number of the server to be run in expressjs   
app.listen(port, () => console.log(`Listening on port ${port}...`));

