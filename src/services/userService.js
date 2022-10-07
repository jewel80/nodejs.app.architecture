const { UserViewModel } = require("../models/view.models");
const models = require("../models/data.models/index");
const { NotFound } = require("../utils/errors");

/**
 * @returns {All user data}
 */
const getAllUsers = async () => {
    const User = models.User;
    const users = await User.find();
    //created a class which view render data as "UserViewModel"...
    let viewModels = users.map(user => new UserViewModel(user));
    return viewModels;
}

/**
 * @param {*, all input data} user 
 * @returns {save data}
 */
const saveUser = async (user) => {
    const model = new models.User(user);
    const savedUser = await model.save();
    return savedUser;
};

/**
 * @param {*, update value} user 
 * @returns {update data}
 */
const update = async (user) => {
    const id = user._id ? user._id : user.id;
    const User = models.User;
    let model = await User.findById(id);
    if (model) {
        model.username = user.username;
        model.name = user.name;
        model.age = user.age;
        model.address = user.address;
        model.email = user.email;
        model.save();
        return model;
    }

    throw new NotFound('User not found by the id: ' + id);
}

/**
 * @param {string} id 
 * @returns {id}
 */
const deleteById = async (id) => {
    const User = models.User;
    let model = await User.findById(id);
    if (model) {
        let result = await User.deleteOne({ _id: id });
        return result;
    }

    throw new NotFound('User not found by the id: ' + id);
}

/**
 * @param {string} id 
 * @returns {return record by id..}
 */
const getUserById = async (id) => {
    const User = models.User;
    let model = await User.findById(id);
    let viewModel = new UserViewModel(model);
    return viewModel;
}


module.exports = {
    getAllUsers,
    saveUser,
    update,
    deleteById,
    getUserById
}