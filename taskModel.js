const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
title:{type:String, require:true},
description:{type:String},
status: [
    {type:String},{enum:["pending","in-Progress","completed"], default:"pending"}
]
});

module.exports = mongoose.model("Task", taskSchema);