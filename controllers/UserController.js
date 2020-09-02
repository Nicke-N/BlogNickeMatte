const userModel = require("../models/UserModel");


exports.createUser = async (req, res) => {
    const { username, password, role } = req.body;
    try {
        const existingUser = await userModel.findUser(username)
        if(!existingUser) {
            const user = await userModel.createUser(
                username, 
                password,
                role
            );
    
            res.json("Created user succesfully").status(200);
        } else {
            res.send('User already exists!')
        }
        
    } catch (error) {
        res.json({ error: error.message });
    }
    
    
};

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await userModel.loginUser(username, password);
        res.json(user)
    } catch (error) {
        res.json({ error: "username not found: " + error.message });
    }
};

exports.countUsers = async (req,res) => {
    
    try {
      const users = await userModel.countUsers();
      res.json(users);
    } catch (error) {
      res.json({ error: error.message });
    }
}

exports.getUser = async (req, res) => {
    const userId = req.params.id
    try {
        const user = await userModel.getUser(userId);
        res.json(user)
    } catch (error) {
        res.json({error: error.message})
    }
}
