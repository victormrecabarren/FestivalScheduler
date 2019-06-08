const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');



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
      req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
      User.create(req.body, (err, createdUser) => {
        req.session.currentUser = createdUser;
        res.redirect('/')
      })

    }
  })

})

module.exports = router
