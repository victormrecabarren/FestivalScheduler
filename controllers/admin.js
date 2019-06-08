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

// Edit route
router.get('/edit/:id', (req, res) => {
  SaturdayLineup.findById(req.params.id, (err, data) => {
    res.render('admin/edit.ejs', {
      artist: data,
      currentUser: req.session.currentUser
    });
  });
})

// POST to apply edits
router.post('/edit/:id', (req, res) => {

  if (req.body.camp === "Camp" || req.body.stage === "camp") {
    req.body.camp = true;
    req.body.flog = false
  } else {
    req.body.camp = false;
    req.body.flog = true;
  }



  SaturdayLineup.updateOne({_id: req.params.id}, {$set: req.body}, (err, data) => {
    res.redirect('/CampFlogGnaw/admin/');
  });
})


module.exports = router
