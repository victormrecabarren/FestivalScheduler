const express = require('express');
const router = express.Router();
const SaturdayArtist = require('../models/artists');


router.get('/', (req, res) => {
  SaturdayArtist.find({}).sort({trueStartTime: 'ascending'}).exec((err, data) => {
    res.render('index.ejs', {
      saturdayLineup: data
    });
  });
});

module.exports = router
