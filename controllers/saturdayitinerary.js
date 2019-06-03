const express = require('express');
const router = express.Router();
const SaturdayItinerary = require('../models/itinerary');

router.get('/', (req, res) => {
  res.send('itinerary page')
});

router.post('/', (req, res) => {
  res.send(req.body)
})



module.exports = router
