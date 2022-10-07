const models = require("../models/data.models/index");
const { NotFound } = require("../utils/errors");

const getAllUsers = async () => {
    const User = models.User;
    const users = await User.find();
    return users;
}

const saveUser = async (user) => {
    const model = new models.User(user);
    const savedUser = await model.save();
    return savedUser;
};

const update = async (user) => {
    const id = user._id;
    const User = models.User;
    let model = await User.findById(id);
    if (model) {
        model.username = user.username;
        model.save();
        return model;
    }

    throw new NotFound('User not found by the id: ' + id);
}

const deleteById = async (id) => {
    const User = models.User;
    let model = await User.findById(id);
    if (model) {
        let result = await User.deleteOne({ _id: id });
        return result;
    }

    throw new NotFound('User not found by the id: ' + id);
}


module.exports = {
    getAllUsers,
    saveUser,
    update,
    deleteById
}