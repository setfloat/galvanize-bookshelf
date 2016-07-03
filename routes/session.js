'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt');

router.post('/session', (req, res, next) => {
  knex('users')
    .where('email', req.body.email)
    .first()
    .then((user) => {
      if (!user) {
        return res.sendStatus(401);
      }
      const hashed_password = user.hashed_password;

      bcrypt.compare(req.body.password, hashed_password, (err, isMatch) => {
        if(err) {
          return next(err);
        };
        if (!isMatch) {
          return res.sendStatus(401);
        };
        req.session.userId = user.id;

        res.cookie('loggedIn', true);
        res.sendStatus(200);
      });
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/session', (req, res, next) => {
  req.session = null;
  res.clearCookie('loggedIn');
  res.sendStatus(200);
});

module.exports = router;
//
// add to the database using session
//
//   use knex to call the specific user.
//     narrow it down
//
//   check the users input for three things
//     check if we have a user that has an email that matches the user input.
//
//     define the 'user.hashed_password' (the hashed password we have stored in the database for that user email which the user provided as an input) as an accessible name. aka. const hashed_password
//
//     run bcrypt.compare(inputedpasswordfromuser, hashed_password, arrow (err, isMatch) => {
//       if (err) {
//         return next(err);
//       };
//       //password is incorrect
//       check if they entered password (which has been hashed by bcrypt) matches the hashed password we have in our database.  if not a match, send an error that doesnt provide info to the requesting person about our database.
//
//       set the user to the value of 'req.session.user' indidcating that they have received the user session
//     })
//
//







//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// 'use strict';
//
// const express = require('express');
// const router = express.Router();
//
// const knex = require('../knex');
// const bcrypt = require('bcrypt');
//
//
// router.post('/session', (req, res, next) => {
//   knex('users')
//     .where('email', req.body.email)
//     .then((user) => {
//       if(user) {
//         return res.sendStatus(401);
//       }
//
//       const hashed_password = user.hashed_password;
//
//       bcrypt.compare(req.body.password, hashed_password, (err, isMatch) => {
//         if (err) {
//           return next(err);
//         };
//         if(!isMatch) {
//           return res.sendStatus(401);
//         }
//
//         req.session.user = user;
//
//         res.cookie('loggedIn', true);
//         res.sendStatus(200);
//       });
//     })
//     .catch((err) => {
//       next(err);
//     });
// });
// router.delete('/session', (req, res, next) => {
//   req.session = null;
//   res.clearCookie('loggedIn');
//   res.sendStatus(200);
// });
//
// module.exports = router;
