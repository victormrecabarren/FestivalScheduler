// set up express server
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const methodOverride = require('method-override');
const saturdayLineupController = require('./controllers/saturdaylineup')
const saturdayItineraryController = require('./controllers/saturdayitinerary');
const env = require('dotenv');

const SaturdayArtist = require('./models/artists');
const lineup = require('saturdayartists.js')





// set up mongoose
const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI || `mongodb://localhost:27017/campfloggnaw`;
mongoose.connect(MONGODB_URI, {useNewUrlParser: true});
mongoose.connection.once('open', () => {
  console.log('connected to mongoDB');
});



//set up middleware
app.use('/static', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));


// use lineup routes


app.use('/CampFlogGnaw/Saturday/Lineup', saturdayLineupController);
app.use('/CampFlogGnaw/Saturday/MyItinerary', saturdayItineraryController);




app.get('/', (req, res) => {

  res.redirect('/CampFlogGnaw/Saturday/Lineup')
})

app.get('/seed', (req, res) => {
  SaturdayArtist.insertMany(lineup, (err, data) => {
    console.log(data);
  })
})



// listener
app.listen(PORT, () => {
  console.log('now listening on port', PORT);
})
