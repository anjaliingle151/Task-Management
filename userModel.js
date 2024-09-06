const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
    username: {type: String, required: true},
    email: {type:String, required:true, unique:true},
    password: {type: String, required: true},
});

userSchema.pre('save', async function(next) {
    const user = this;
    if(user.isModified('password')) {
        try {
            user.password = await bcrypt.hash(user.password, 8);
        } catch (error) {
            return next(error);
        }
    }
    next();
});

userSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User",userSchema);