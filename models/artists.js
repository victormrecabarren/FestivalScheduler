const mongoose = require('mongoose');


const artistSchema = new mongoose.Schema({
  artist: {type: String, required: true},
  camp: {type: Boolean, required: true},
  flog: {type: Boolean, required: true},
  startTime: {type: String, required: true},
  endTime: {type: String, required: true},
  trueStartTime: Date,
  trueEndTime: Date,
  img: {type: String},
  album: {type: String},
  albumCover: {type: String},
  bio: {type: String},
  checked: {type: Boolean, default: false},
  opening: {type: Boolean, default: false},
  finale: {type: Boolean, default: false},
  comments: {type: String, default: ""},
  rating: {type: Number, min: 0, max: 5, default: 0},
});

const SaturdayArtist = mongoose.model('SaturdayArtist', artistSchema);

module.exports = SaturdayArtist
