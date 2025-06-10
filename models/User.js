//Post Schema for Mongodb using mongoose
const mongoose = require('mongoose');

//this is the format in which it will be saved and displayed in the db
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
//exports the post model so it can be used in rest of project
module.exports = mongoose.model('User', userSchema);

