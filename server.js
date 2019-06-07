// set up express server
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const methodOverride = require('method-override');
const saturdayLineupController = require('./controllers/saturdaylineup')
const saturdayItineraryController = require('./controllers/saturdayitinerary');
const env = require('dotenv');

const SaturdayArtist = require('./models/artists');

const hodgy = {
  artist: "Hodgy",
  camp: false,
  flog: true,
  checked: false,
  trueStartTime: new Date(2018, 11, 24, 12, 30),
  trueEndTime: new Date(2018, 11, 24, 13),
  startTime: "12:30",
  endTime: "01:00",
  img: "/static/images/hodgy.jpg",
  album: "Jesus Is A Samurai (2018)",
  albumCover: "https://images-na.ssl-images-amazon.com/images/I/51jJXUmu1qL._SR600%2C315_PIWhiteStrip%2CBottomLeft%2C0%2C35_SCLZZZZZZZ_.jpg",
  bio: `He is best known for being a founding member of the hip hop collective Odd Future, as well as being a member of MellowHype with rapper-producer Left Brain, and MellowHigh with rapper-producer Left Brain and rapper Domo Genesis. Long is currently signed to Columbia Records and Odd Future Records.`,
  finale : false,
  opening : false,
  comments : "",
  rating : 0
}




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
  SaturdayArtist.create(hodgy, (err, data) => {
    console.log(data);
    res.send('seeded hodgy')
  })
})



// listener
app.listen(PORT, () => {
  console.log('now listening on port', PORT);
})
