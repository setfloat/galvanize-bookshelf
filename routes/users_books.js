migrations:

'use strict'
exports.up = funcition(knex0 {
  return knex.schema.createTable('users_books', (table) => {
    tablie.increments()
    'book_id')
    not nullreffernces
    in table('books')
    ondeletecascade
    index

    table.integer'user_id'

  })
})

-----------------

Seeds: users

delete users.

then
  return users and insert
      all the info from user and then hashed password

      then return
          the raw knex sql command for (var i = 0; i <
            .length; i++) {

            for users_id_seq
          }

----------------------

Seeds: users_books


  needs to be in the next "batch" after the users batch

  knex('users_books')

    book_id
    and
    user_id

    users_books_id_seq



  const knex
  const bcrypt
  const checkAuth = that function for checking auth we extracted from the lower bits.
}
  next
}


router.get 'users/books', check auth, callback {


  knex 'books'

  innerJoin('users_books', 'users_books.book_id', 'books.id')
  .where('users_books.user_id', req.session.userId)
  .then((books) => {
    res.send(books);
  })
  .catch((err) => {
    next(err);
  })
}

router.get('/users/books/:bookId', ceckAuth, (callback) => {
  const bookId = Number.parsInt(req.params.bookId);

  knex books  innerJoin('users_books', 'users_books.book_id', 'books.id'_
.where({
  'books.id':bookId,
  'users_books.user_id': req.session.userId
})
.first()
.then((book) =>{
  if (!book) {
    return next;
  }res.send(book);
}))
})


post('/users/books/:bookId', checkAuth, (callback) =>{
  const bookId = Number.parseInt(req.params.obookId)
})


  knex('books')
  .where('id', bookId)
  first()
  .then((book) +<{

  })

  return knex('users_books'_
.insertbook_id
user_id

.then((results) -> {
  res.send(results[0])
}))



.delete('/users/books/:bookId'), checkAuth callback
  {
    const bookId
    if number.isnan(bookId)) return enxt
  }

  knex('users_books')
    .where({
      book)id: bookId,
      user_id: req. session.userId
    })
    .first
    .then((user_book) {
      if not user_book rturn err
    })

    return knex('users_books')
    .del
    .where`
    book)id: bookId
    user)id req.session.userId

    .thendelete user_book.id
    res.send(user)book
