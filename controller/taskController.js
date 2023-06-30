const Task = require("../models/taskSchema");

const generateTaskObject = (taskName, check, favorite) => {
    return {
        "task": taskName,
        "check": check,
        "favorite": favorite
    };
};

const init = (_req, res) => {
    return res.status(200).send("<h1>Testando</h1>");
};

const getAllTasks = async (_req, res) => {
    try {
        const allTasks = await Task.find();
        return res.status(200).json({ allTasks: allTasks });
    } catch(err) {
        return res.status(500).json({ error: err.message });
    }
};

const createTask = async (req, res) => {
    try{
        const { taskName, check, favorite } = req.body;
        const task = generateTaskObject(taskName, check, favorite);

        await Task.create(task);

        return res.status(200).json({
            "message": "created",
            task
        });
    } catch(err) {
        return res.status(500).json({ error: err.message });
    }

};

const updateTask = async (req, res) => {
    const { taskName, check, favorite, id } = req.body;
    const task = generateTaskObject(taskName, check, favorite);

    try{
        await Task.updateOne({  _id: id }, task);
        return res.status(200).json({ message: "updated", task: task });
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
        const { id, status } = req.body;
        const task = await Task.findOne({ _id: id });

        switch(status) {
        case "check":
            task.check ? task.check = false : task.check = true;
            break;
        case "favorite":
            task.favorite ? task.favorite = false : task.favorite = true;
            break;
        }

        await Task.updateOne({  _id: id }, task);

        return res.status(200).json({
            message: "updated",
            task: {
                task
            }
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