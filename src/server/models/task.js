const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    task: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model("task", taskSchema);
// mongoose.model(collection_name , schema) Mongoose automatically pluralizes this name, 
//so if the model is named "task", Mongoose will look for a collection named "tasks" in the database.
