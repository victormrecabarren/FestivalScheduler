const mongoose = require('mongoose');


const artistSchema = new mongoose.Schema({
  artist: {type: String, required: true},
  camp: {type: Boolean, required: true},
  flog: {type: Boolean, required: true},
  startTime: {type: String, required: true},
  endTime: {type: String, required: true},
  img: {type: String},
  album: {type: String},
  albumCover: {type: String},
  bio: {type: String},
});

const SaturdayArtist = mongoose.model('SaturdayArtist', artistSchema);

module.exports = SaturdayArtist
