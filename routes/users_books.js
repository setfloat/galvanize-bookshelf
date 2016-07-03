'use strict'

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
router.post('/users/books/:bookId', checkAuth, (req, res, next) => {
  const userId = req.session.user.id;
  const bookId = Number.parseInt(req.params.bookId);


  knex('users_books')
  .insert({
    user_id: userId,
    book_id: bookId
  }, '*')
  .then((results) => {
    res.send(results[0]);
  })
  .catch((err) => {
    next(err);
  });
});

router.get('/users/books', checkAuth, (req, res, next) => {
  const userId = req.session.user.id;

  knex('books')
    .innerJoin('users_books', 'users_books.book_id', 'books.id')
    .where('users_books.user_id', userId)
    .then((books) => {
      res.send(books);
    })
    .catch((err) => {
      next(err)
    });
});


module.exports = router;
