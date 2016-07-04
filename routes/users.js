'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const knex = require('../knex');

const checkAuth = function(req, res, next) {
  if(!req.session.user) {
    return res.sendStatus(401);
  }
  next();
}

router.post('/users', (req, res, next) => {

const newUser = req.body;

if(!newUser.email || newUser.email.trim() === '') {
  return res
    .status(400)
    .set('Content-type', 'text/plain')
    .send('Email must not be blank')
}

if (!newUser.password || newUser.password.trim() === '') {
    return res
      .status(400)
      .set('Content-type', 'text/plain')
      .send('Password must not be blank')
}



  bcrypt.hash(req.body.password, 12, (hashErr, hashed_password) => {
    if(hashErr) {
      return next(hashErr);
    };

    // knex('users')
    //       if(email === newUser.email){
    //         return res
    //           .status(400)
    //           .set('Content-type', 'text/plain')
    //           .send('error')
    //         };

      knex('users')
        .select(knex.raw('1=1'))
        .where('email', newUser.email)
        .first()
        .then((exists) => {
          if (exists) {
            return res
              .status(400)
              .set('Content-Type', 'text/plain')
              .send('Email already exists');
          }

    knex('users')
      .insert({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        hashed_password: hashed_password
      }, '*')
      .then((users) => {
          res.sendStatus(200);
          console.log(req.body.email);
      })
      .catch((err) => {
          next(err);
      })
  })
})
});


module.exports = router;
