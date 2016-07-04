'use strict'

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const knex = require('../knex');

const checkAuth = function(req, res, next) {
  if(!req.session.userId) {
    return res.sendStatus(401);
  }
  next();
}
router.post('/users/books/:bookId', checkAuth, (req, res, next) => {
  const userId = req.session.userId;
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

router.get('/users/books/:bookId', checkAuth, (req, res, next) => {
  const userId = req.session.userId;
  const bookId = Number.parseInt(req.params.bookId);

  knex('books')
    .innerJoin('users_books', 'books.id', '=', 'users_books.book_id')
    .where('users_books.book_id', bookId)
    // .where('users_books.', bookId)
    .first()
    .then((books) => {
      if(!books) {
        return res.sendStatus(404);
      }
      res.send(books);
    })
    .catch((err) => {
      next(err)
    });
});

router.get('/users/books', checkAuth, (req, res, next) => {
  const userId = req.session.userId;

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

router.delete('/users/books/:bookId', (req, res, next) => {
  const userId = req.session.userId;
  const bookId = Number.parseInt(req.params.bookId);

  knex('books')
    .select('book_id', 'user_id')
    .from('users_books')
    .where('users_books.user_id', bookId)
    .first()
    .then((books) => {
      return knex('books')
        .del()
        .from('users_books')
        .where('users_books.user_id', bookId)
        .first()
        .then(() => {
          delete books.bookId;
          res.send(books);
        });
    })
    .catch((err) => {
      next(err);
    });
});


module.exports = router;
