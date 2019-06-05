// set up express server
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const methodOverride = require('method-override');
const saturdayLineupController = require('./controllers/saturdaylineup')
const saturdayItineraryController = require('./controllers/saturdayitinerary')



// set up mongoose
const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI || `mongodb://localhost:27017/campfloggnaw`;
mongoose.connect(MONGODB_URI, {useNewUrlParser: true});
mongoose.connection.once('open', () => {
  console.log('connected to mongoDB');
});



//set up middleware
app.use( express.static ( 'public' ) );
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(methodOverride('_method'));


// use lineup routes
app.use('/CampFlogGnaw/Saturday/Lineup', saturdayLineupController);
app.use('/CampFlogGnaw/Saturday/MyItinerary', saturdayItineraryController);




// listener
app.listen(PORT, () => {
  console.log('now listening on port', PORT);
})
