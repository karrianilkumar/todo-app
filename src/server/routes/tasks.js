const Task = require("../models/task");
const express = require("express");
// The router allows you to define route handlers 
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const task = await new Task(req.body).save();  //here Task is model of a collection in the db  saving req.body to the database 
        res.send(task);
    } catch (error) {
        res.send(error);
    }
});

router.get("/", async (req, res) => {
    try {
        //find() used in Mongoose (a MongoDB object modeling library for Node.js)
        // to query or retrieve documents from a MongoDB collection based on certain conditions
        const tasks = await Task.find();   //here Task is model of a collection in the db
        res.send(tasks);
    } catch (error) {
        res.send(error);
    }
});

router.put("/:id", async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate(   //here Task is model of a collection in the db
            // req.params.id is used to identify which document to update.
            // req.body contains the new values
            { _id: req.params.id },   // req.params.id  ---> router.put("/:id", async (req, res)
            req.body
        );
        res.send(task);
    } catch (error) {
        res.send(error);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);  // req.params.id  ---> router.delete("/:id", async (req, res)
        res.send(task);
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;

