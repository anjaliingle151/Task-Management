const mongoose = require("mongoose");

async function connectDB() {
    try {
        await mongoose.connect("mongodb+srv://anjaliingle2078:Anjali@cluster0.aemasyi.mongodb.net/");
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log("Server connection error", error);
    }
}

module.exports = {connectDB};
