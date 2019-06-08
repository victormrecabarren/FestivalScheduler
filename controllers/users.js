const express = require('express');
const router = express.Router();


// user model
const User = require('../models/user');

router.get('/', (req, res) => {
  res.render('users/new.ejs', {
    exists: false
  })
});

router.post('/', (req, res) => {
  User.findOne({username:req.body.username}, (err, existingUser) => {
    if (existingUser) {
      res.render('users/new.ejs', {
        exists: true
      })
    }
    else {
      User.create(req.body, (err, createdUser) => {
        req.session.currentUser = createdUser;
        res.redirect('/')
      })

    }
  })

})

module.exports = router
