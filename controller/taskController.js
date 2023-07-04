const Task = require("../models/taskSchema");

const init = (_req, res) => {
    return res.status(200).send("<h1>Testando</h1>");
};

const getAllTasks = async (_req, res) => {
    try {
        const favoriteTasks = await Task.find({ favorite: true });
        const othersTasks = await Task.find({ favorite: false });

        return res.status(200).json({ favoriteTasks: favoriteTasks.reverse(), othersTasks: othersTasks.reverse() });
    } catch(err) {
        return res.status(500).json({ error: err.message });
    }
};

const createTask = async (req, res) => {
    try{
        const { taskName, taskContent, color = "#FFF", favorite } = req.body;
        const task = {
            "task": taskName,
            "taskContent": taskContent,
            "color": color,
            "favorite": favorite
        };

        const { _id } = await Task.create(task);

        task._id = _id;

        return res.status(200).json({
            message: "created",
            task
        });
    } catch(err) {
        return res.status(500).json({ error: err.message });
    }

};

const updateTask = async (req, res) => {
    const { taskName, taskContent, id } = req.body;
    const task = {
        task: taskName,
        taskContent: taskContent
    };

    try{
        await Task.updateOne({  _id: id }, task);
        return res.status(200).json({ message: "updated", updated: task });
    } catch(err) {
        return res.status(500).json({ error: err.message });
    }
};

const deleteTask = async (req, res) => {
    const { id } = req.body;

    try {
        await Task.deleteOne({ _id: id });
        return res.status(204).send();
    } catch(err) {
        return res.status(500).json({ error: err.message });
    }
};

const changeTaskStatus = async (req, res) => {
    try {
        const { id, color } = req.body;
        const isFavorite = await Task.findOne({ _id: id }, { favorite: 1 });
        const taskChange = {};

        if(color){
            taskChange.color = color;
        } else {
            isFavorite.favorite ? taskChange.favorite = false : taskChange.favorite = true;
        }

        await Task.updateOne({  _id: id }, taskChange);

        return res.status(200).json({
            message: "updated",
            updated: taskChange
        });
    } catch(err) {
        return res.status(500).json({ error: err.message });
    }
};

module.exports = {
    init,
    getAllTasks,
    createTask,
    updateTask,
    deleteTask,
    changeTaskStatus
};