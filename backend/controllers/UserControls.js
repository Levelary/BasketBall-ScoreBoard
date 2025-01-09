const UserModel = require("../models/UserModel");

exports.login = async (req, res) => {
    try {
        const users = await UserModel.login();
        res.status(200).json(users);
    }
    catch(error) {
        res.status(500).json({error: err.message});
    }
};

exports.signup = async (req, res) => {
    try {
        const newUser = req.body;
        const result = await UserModel.signup(newUser);
        res.status(201).json({id: result.insertId});
    }
    catch(error) {
        res.status(500).json({error: error.message});
    }
}