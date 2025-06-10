//Post Schema for Mongodb using mongoose
const mongoose = require('mongoose');

//this is the format in which it will be saved and displayed in the db
const postSchema = new mongoose.Schema({
  username: String,
  content: String,
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  likedBy: { type: [String], default: [] },
  dislikedBy: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now }
});
//exports the post model so it can be used in rest of project
module.exports = mongoose.model('Post', postSchema);
