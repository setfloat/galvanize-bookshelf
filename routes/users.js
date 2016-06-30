'use strict';

const express = require('express');
const router = express.Router();

const knex = require('../knex');
const bcrypt = require('bcrypt');



router.post('/users', (req, res, next) => {
const newUser = req.body;



if(!newUser.email || newUser.email.trim() === '') {
  return res
    .status(400)
    .set('Content-type', 'text/plain')
    .send('You must input an email address')
}

  if (!newUser.password || newUser.password.trim() === '' || newUser.password.trim().length < 15) {
    return res
      .status(400)
      .set('Content-type', 'text/plain')
      .send('Password must not be blank')
  }
  // knex('users')
  //  .select(knex.raw('1=1'))  //ken code  returns true or false if anything is concerned.
  //   .where('email', email)
  //   .first()
  //   .then((exists) => {
  //     if (exists) {
  //       return res
  //         .status(400)
  //         .set('Content-Type', 'text/plain')
  //         .send('Email already exists');
  //     }
  // })


  bcrypt.hash(req.body.password, 12, (hashErr, hashed_password) => {
    if(hashErr) {
      return next(hashErr);
    }
    knex('users')
      if(email === newUser.email){
        return res
          .status(400)
          .set('Content-type', 'text/plain')
          .send('error')
      };
        knex('users')
        .insert({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          hashed_password: hashed_password
        }, '*')
        .then((users) => {
          res.sendStatus(200);
        })
        .catch((err) => {
          next(err);
        });
  });
});

module.exports = router;
