const express = require('express');
const router = express.Router();
const SaturdayArtist = require('../models/artists');


router.get('/', (req, res) => {
  SaturdayArtist.find({}, (err, data) => {
    res.render('index.ejs', {
      saturdaylineup: data
    });
  });
});

module.exports = router
