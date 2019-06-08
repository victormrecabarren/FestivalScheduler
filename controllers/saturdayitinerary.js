const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const SaturdayLineup = require('../models/artists');


//////////////////////////
////////////////////////// functions
const addItineraryItem = (info, req, res) => {
  selectedArray = [];
  unselectedArray = [];
  openingArray = [];
  notOpeningArray = [];
  finaleArray = [];
  notFinaleArray = [];

// sort into correct arrays
  for (keys in info) {
    if (info[keys].includes('selected')){
      selectedArray.push(keys)
    } else unselectedArray.push([keys]);
    if (info[keys].includes('opening')) {
      openingArray.push(keys)
    } else notOpeningArray.push(keys);
    if (info[keys].includes('finale')) {
      finaleArray.push(keys)
    } else notFinaleArray.push(keys);
  }


  SaturdayLineup.updateMany({_id: {$in: selectedArray}}, {$set: {checked: true}}, {multi: true}, () => {
    SaturdayLineup.updateMany({_id: {$in: unselectedArray}}, {$set: {checked: false}}, {multi: true}, () => {
      SaturdayLineup.updateMany({_id: {$in: openingArray}}, {$set: {opening: true}}, {multi: true}, () => {
        SaturdayLineup.updateMany({_id: {$in: notOpeningArray}}, {$set: {opening: false}}, {multi: true}, () => {
          SaturdayLineup.updateMany({_id: {$in: finaleArray}}, {$set: {finale: true}}, {multi: true}, () => {
            SaturdayLineup.updateMany({_id: {$in: notFinaleArray}}, {$set: {finale: false}}, {multi: true}, () => {
              SaturdayLineup.find({$or: [{checked: true}, {opening: true}, {finale: true}]}).sort({trueStartTime: 'ascending'}).exec((err, data) => {
                res.render('itinerary.ejs', {
                  itinerary: data,
                  currentUser: req.session.currentUser
                })
              })
            });
          });
        });
      });
    });
  });
}
//////////////////////////
//////////////////////////


//// SAT INDEX
router.get('/', (req, res) => {
  addItineraryItem(req.body, req, res)
});


///// SAT UPDATE route
router.put('/', (req, res) => {
  addItineraryItem(req.body, req, res)
})

//// SAT UPDATE personal itinerary route

router.put('/:id/edit', (req, res) => {
  SaturdayLineup.updateOne({_id: req.params.id}, {$set:req.body}, {$upsert: true}, (err, data) => {
  })
  res.redirect('/CampFlogGnaw/Saturday/MyItinerary')
})



module.exports = router
