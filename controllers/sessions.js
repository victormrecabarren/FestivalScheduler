const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.get('/', (req, res) => {
  res.render('sessions/new.ejs', {
    wrong: false
  })
});

router.post('/', (req, res) => {
  User.findOne({username: req.body.username}, (err, foundUser) => {
    if (foundUser) {
      if (req.body.password === foundUser.password) {
        req.session.currentUser = foundUser;
        res.redirect('/');
      } else {
        res.render('sessions/new.ejs', {
          wrong: true
        })
      }
  } else {
      res.render('sessions/new.ejs', {
        wrong: true
      })
    }
  })
})

router.delete('/', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
})

module.exports = router
