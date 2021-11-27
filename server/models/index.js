const sequelize = require("../dbConfig");

const Countries = require("./countries");

const Genres = require("./genres");

const Authors = require("./authors");

const Readers = require("./readers");
const ReadersFavorites = require("./readersFavorites");
const ReadersHistories = require("./readersHistories");

const Books = require("./books");
const BooksAuthors = require("./booksAuthors");
const BooksGenres = require("./booksGenres");

// Countries
Countries.hasMany(Readers);
Countries.hasMany(Authors);
Countries.hasMany(Books);

// Authors
Authors.belongsTo(Countries);
Authors.belongsToMany(Books, { through: BooksAuthors });

// Books
Books.belongsTo(Countries);
Books.belongsToMany(Authors, { through: BooksAuthors });
Books.belongsToMany(Genres, { through: BooksGenres });
Genres.belongsToMany(Books, { through: BooksGenres });

Books.hasMany(ReadersFavorites);
Books.hasMany(ReadersHistories);

// Readers
Readers.belongsTo(Countries);
Readers.hasMany(ReadersFavorites);
Readers.hasMany(ReadersHistories);

module.exports = {
  Countries,
  Genres,
  Authors,
  Readers,
  ReadersFavorites,
  ReadersHistories,
  Books,
  BooksAuthors,
  BooksGenres,
};
