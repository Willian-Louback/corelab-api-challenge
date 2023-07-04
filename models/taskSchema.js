const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    taskContent: {
        type: String,
        required: true
    },
    favorite: {
        type: Boolean,
        required: true,
        default: false
    },
    color: {
        type: String,
        required: true,
        default: "#FFF"
    },
    date: {
        type: Date,
        default: Date.now()
    }
}, { collection: "Tasks" });

module.exports = mongoose.model("Task", taskSchema);