// set up express server
const express = require('express');
const app = express();
const port = 3000;
const methodOverride = require('method-override');
const saturdayLineupController = require('./controllers/saturdaylineup')
const saturdayItineraryController = require('./controllers/saturdayitinerary')

// set up mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/campfloggnaw', {useNewUrlParser: true});
mongoose.connection.once('open', () => {
  console.log('connected to mongoDB');
});

//set up middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(methodOverride('_method'));

// use lineup routes
app.use('/CampFlogGnaw/Saturday/Lineup', saturdayLineupController);
app.use('/CampFlogGnaw/Saturday/MyItinerary', saturdayItineraryController);

// listener
app.listen(port, () => {
  console.log('now listening on port', port);
})
