// set up express server
const express = require('express');
const app = express();
const port = 3000;
const methodOverride = require('method-override');
const lineupController = require('./controllers/lineup')

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
app.use('/CampFlogGnaw', lineupController)

// listener
app.listen(port, () => {
  console.log('now listening on port', port);
})
