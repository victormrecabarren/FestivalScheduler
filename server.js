// set up dependencies
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const methodOverride = require('method-override');
const saturdayLineupController = require('./controllers/saturdaylineup')
const saturdayItineraryController = require('./controllers/saturdayitinerary');
const sessionsController = require('./controllers/sessions.js')
const usersController = require('./controllers/users.js');
const adminController = require('./controllers/admin.js')
const env = require('dotenv');
const session = require('express-session');






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
app.use(session({
    secret: "DanAbramovProjectFestival2Scheduler",
    resave: false,
    saveUninitialized: false
}));


// use lineup routes
app.use('/CampFlogGnaw/Saturday/Lineup', saturdayLineupController);
app.use('/CampFlogGnaw/Saturday/MyItinerary', saturdayItineraryController);

// sessions and users routes
app.use('/CampFlogGnaw/sessions', sessionsController);
app.use('/CampFlogGnaw/users', usersController)

// admin routes
app.use('/CampFlogGnaw/admin', adminController);





app.get('/', (req, res) => {
  res.redirect('/CampFlogGnaw/Saturday/Lineup')
});






// listener
app.listen(PORT, () => {
  console.log('now listening on port', PORT);
})
