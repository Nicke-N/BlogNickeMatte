const userModel = require("../models/user");
const bcrypt = require("bcryptjs");

exports.createUser = async (req, res) => {
    const { username, password } = req.body;
    bcrypt.hash(password, 10, async (error, hashedPassword) => {
        try {
            const user = await userModel.createUser(username, hashedPassword);
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
                res.json("wrong password")
            } else {
                res.json("login success").status(200); 
            }
            
        })
    } catch (error) {
        res.json({ error: error.message });
    }
    
}