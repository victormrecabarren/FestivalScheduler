const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const SaturdayLineup = require('../models/artists');



// functions
const addItineraryItem = (info) => {
  checkedArray = [];
  uncheckedArray = [];
  for (keys in info) {
    if (info[keys] == 0) {
      info[keys] = false;
      uncheckedArray.push(keys)
    }
    else {
      info[keys] = true;
    checkedArray.push(keys);
    }
  }

  SaturdayLineup.updateMany({_id: {$in: uncheckedArray}}, {$set: {checked: false}}, {multi: true}, (err, unchecked) => {
    if (err) console.log(err);
  });

  SaturdayLineup.updateMany({_id: {$in: checkedArray}}, {$set: {checked: true}}, {multi: true}, (err, checked) => {
    if (err) console.log(err)
    else console.log(checked);
  });
}



router.get('/', (req, res) => {
  SaturdayLineup.find({checked: true}, (err, data) => {
    res.render('itinerary.ejs', {
      itinerary: data
    })
  })
});

router.post('/', (req, res) => {
    addItineraryItem(req.body)
    res.send(req.body)
})



module.exports = router
