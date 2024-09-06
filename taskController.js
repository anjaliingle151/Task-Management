const Task = require('../model/taskModel.js');


//Add Tasks
const addTask = async (req, res) => {
    console.log("Task  to add from here",req.body);
    try {
        const newTask = new Task(req.body);
        const result = await newTask.save();
        return res.status(200).send({ message : "Task added successfully", task: result});
    } catch (error) {
        return res.status(500).send(error);
    }
}

//Get All Tasks
const getAllTasks = async(req, res) => {
    console.log("Show all the  tasks");
    try {
        result = await Task.find({},{__v:0});
        console.log(result);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
};

//Delete Task
const deleteTask = async(req, res) => {
   
    try {
        const tasks = await Task.findByIdAndDelete(req.params.id, req.body);
        if (!tasks){
            res.status(400).send({ message : "Task  Not Found"});
        }
        res.send({task : tasks, message : "Task Deleted"});
    } catch (error) {
        res.status(500).send(error);
    }
};

//Update Task
const updateTask = async(req, res) => {
    console.log(req.params.id);
    console.log("Check Update Task req.body",req.body);
    try {
    const tasks = await Task.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
        });
    if (!tasks){
        res.status(400).send({message:"Task Not Found"});
    }
    res.status(200).send({message : "Task Updated",task : tasks});
    } catch (error) {
        res.status(500).send(error);
    }
}


module.exports = {
    addTask,
    getAllTasks,
    updateTask,
    deleteTask
};