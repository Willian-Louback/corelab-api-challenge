const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    check: {
        type: Boolean,
        required: true,
        default: false
    },
    favorite: {
        type: Boolean,
        required: true,
        default: false
    },
    date: {
        type: Date,
        default: Date.now()
    }
}, { collection: "Tasks" });

module.exports = mongoose.model("Task", taskSchema);