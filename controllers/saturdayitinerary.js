const express = require('express');
const router = express.Router();
const SaturdayItinerary = require('../models/itinerary');
const SaturdayLineup = require('../models/artists')

router.get('/', (req, res) => {
  res.send('itinerary page')
});

router.post('/', (req, res) => {
    checkedArray = [];
    uncheckedArray = [];
    for (keys in req.body) {
      if (req.body[keys] == 0) {
        req.body[keys] = false;
        uncheckedArray.push(keys)
      }
      else {
        req.body[keys] = true;
      checkedArray.push(keys);
    }
  }

    SaturdayLineup.updateMany({_id: {$in: uncheckedArray}}, {$set: {checked: false}}, {new: true}, (err, data) => {
      console.log('these weree unchecked:', data);
    });

    SaturdayLineup.updateMany({_id: {$in: checkedArray}}, {$set: {checked: true}}, {new: true}, (err, data) => {
      console.log('these weree checked:', data);
    });

    // console.log('checked array', checkedArray);
    // console.log('unchecked array', uncheckedArray);


    res.send(req.body)

})



module.exports = router
