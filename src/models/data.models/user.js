const mongoose =require("mongoose");

const userSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    name: {type: String, required: true},
    address: {type: String},
    email: {type: String, unique: true, required: true},
    age: {type: Number},
    createdAt : { type: Date, required: false}
})
const User = mongoose.model("User", userSchema);
module.exports = User;