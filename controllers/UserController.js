const userModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const secret = "secret";

exports.createUser = async (req, res) => {
    const { username, password, role } = req.body;
    bcrypt.hash(password, 10, async (error, hashedPassword) => {
        try {
            const user = await userModel.createUser(
                username, 
                hashedPassword,
                role
                );
            res.json("Created user succesfully").status(200);
        } catch (error) {
           res.json({ error: error.message });
        }
    })
};

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await userModel.loginUser(username);
        bcrypt.compare(password, user[0].password, (err, result) => {
            if(!result) {
                res.json("wrong password");
            } else {
                const token = jwt.sign(user[0], secret);

                res.json(
                    { 
                        message: "login success",
                        token: token
                    }
                ).status(200); 
            }
        });
    } catch (error) {
        res.json({ error: "username not found" });
    }
};


