'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');

router.get('/books', (req, res, next) => {
  knex('books')
    .orderBy('id')
    .then((books) => {
      res.send(books);
    })
    .catch((err) => {
      next(err);
    });
});


router.get('/books/:id', (req, res, next) => {
  const id = Number.parseInt(req.params.id);

  if(Number.isNaN(id)) {
    return next();
  }

  knex('books')
    .where('id', id)
    .first()
    .then((book) => {
      if (!book) {
        return next();
      }

      res.send(book);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/books', (req, res, next) => {
  const newBook = req.body;

  if(!newBook.title || newBook.title.trim() === '') {
    return res
      .status(400)
      .set('Content-Type', 'text/plain')
      .send('title must not be blank');
  }

  if(!newBook.genre || newBook.genre.trim() === '') {
    return res
      .status(400)
      .set('Content-Type', 'text/plain')
      .send('genre must not be blank');
  }

// something else

  knex('books')
    .insert(req.body, '*')
    .then((books) => {
      res.send(books[0]);
    })
    .catch((err) => {
      next(err);
    });
});

router.patch('/books/:id', (req, res, next) => {
  knex('books')
    .update(req.body, '*')
    .where('id', req.params.id)
    .then((books) => {
      res.send(books[0]);
    });
});

router.delete('/books/:id', (req, res, next) => {
  knex('books')
    .where('id', req.params.id)
    .first()
    .then((book) => {
      return knex('books')
      .del()
      .where('id', req.params.id)
      .then(() => {
        delete book.id;
        res.send(book);
      });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
