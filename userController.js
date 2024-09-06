const User = require('../model/userModel.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
	const { username, email, password} = req.body;
	console.log(req.body);
	try {
		const existingUser = await User.findOne({ email });

		if (!existingUser) {
			const user = new User({ username,email,password });
			const createdUser = await user.save();
			if (createdUser) {
				return res.status(201).send(createdUser);
			}
		} else {
			console.log("User already exists. User Request :", req.body);
			return res.status(400).send({
				message: "User already exists",
			});
		}
	} catch (error) {
		if (
			error.name == "ValidationError" &&
			error._message == "user validation failed"
		) {
			return res.status(400).send({ message: "User role is unknown" });
		}
		return res.status(500).send(error);
	}
};

const loginUser = async(req, res) =>{
	try {
		const {email, password} = req.body;
		const user = await User.findOne({email: email});
		console.log(user);

		if (!user) {
			return res.status(400).send({error : 'Invalid login credentials'});
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).send({error: 'Password Incorrect'});
		}

		const token = jwt.sign({_id : User.email},'tejas',{expiresIn :'1h'});
		return res.status(200).send({accessToken :token, task: user});
		// console.log(token);
	} catch (error) {
		console.log("error during user login",error);
        return res.status(500).send(error);
	}
}

module.exports = {
    registerUser,
    loginUser
};



