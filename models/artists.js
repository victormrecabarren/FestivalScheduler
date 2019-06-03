const mongoose = require('mongoose');


const artistSchema = new mongoose.Schema({
  artist: {type: String, required: true},
  camp: {type: Boolean, required: true},
  flog: {type: Boolean, required: true},
  startTime: {type: String, required: true},
  endTime: {type: String, required: true},
  trueStartTime: {type: Date, required: true},
  trueEndTime: Date,
  img: {type: String},
  album: {type: String},
  albumCover: {type: String},
  bio: {type: String},
  checked: {type: Boolean, default: false},
  half: Boolean,
  comments: String,
  rating: {type: Number, min: 0, max: 5},
  favorite: String
});

const SaturdayArtist = mongoose.model('SaturdayArtist', artistSchema);

module.exports = SaturdayArtist
