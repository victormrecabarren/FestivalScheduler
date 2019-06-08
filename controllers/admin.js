const express = require('express');
const router = express.Router();

const SaturdayLineup = require('../models/artists');


router.get('/', (req, res) => {
  SaturdayLineup.find({}).sort({trueStartTime: 'ascending'}).exec((err, data) => {
    res.render('admin/admin.ejs', {
      saturdayLineup: data,
      currentUser: req.session.currentUser
    });
  });
})

router.get('/edit/:id', (req, res) => {
  SaturdayLineup.findById(req.params.id, (err, data) => {
    res.render('admin/edit.ejs', {
      artist: data,
      currentUser: req.session.currentUser
    });
  });
})


module.exports = router
