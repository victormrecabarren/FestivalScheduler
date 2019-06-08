const express = require('express');
const router = express.Router();
const SaturdayArtist = require('../models/artists');


router.get('/', (req, res) => {
  SaturdayArtist.find({}).sort({trueStartTime: 'ascending'}).exec((err, data) => {
    res.render('index.ejs', {
      saturdayLineup: data,
      currentUser: req.session.currentUser
    });
  });
});

router.get('/:id', (req, res) => {
  SaturdayArtist.findById(req.params.id, (err, data) => {
    res.render('show.ejs', {
      artist: data
    })
  })
})

module.exports = router
