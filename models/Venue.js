//Post Schema for Mongodb using mongoose
const mongoose = require('mongoose');
//this is the format in which it will be saved and displayed in the db
const venueSchema = new mongoose.Schema({
  name: String,
  description: String,
  location: {
    address: String,
    city: String
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comments: [
    {
      username: String,
      content: String,
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ]
});
//exports the post model so it can be used in rest of project
const Venue = mongoose.model('Venue', venueSchema);

module.exports = Venue;



