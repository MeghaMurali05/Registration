const User = require('../models/loginModel');
const bcrypt = require('bcryptjs');





// Register

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check whether user already exists

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            })
        }

        //Hash password

        const hashPassword = await bcrypt.hash(password, 10);

        //Create user

        const user = await User.create({
            name,
            email,
            password: hashPassword
        });
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });


    } catch (error) {
        res.status(500).json({
            message: "Registration failed",
            error: error.message
        });
    }
}


//Login

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        //Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        //Compare password

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );
        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "invalid password"
            })
        }
        res.status(200).json({
            message: "Login Successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch (error) {
        res.status(500).json({
            message: "Login failed",
            error: error.message

        })
    }
}









module.exports = { registerUser, loginUser }