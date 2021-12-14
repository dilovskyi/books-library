require("dotenv").config();
const sequelize = require("../dbConfig");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ApiError = require("../error/ApiError");
const Readers = require("../models/readers");
const ReaderHistory = require("../models/readers_histories");

const generateJwt = (id, login, username, email) => {
  return jwt.sign({ id, login, username, email }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class ReaderController {
  async registration(req, res, next) {
    const { login, username, email, password, confirmPassword } = req.body;

    if (!email || !password) {
      return next(ApiError.badRequest("Invalid password or email"));
    }

    const candidateLogin = await Readers.findOne({ where: { login } });
    const candidateMail = await Readers.findOne({ where: { email } });

    if (candidateLogin) {
      return next(ApiError.badRequest("Login already in use"));
    } else if (candidateMail) {
      return next(ApiError.badRequest("Email already in use"));
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSaltSync(saltRounds);
    const hashedPassword = await bcrypt.hashSync(password, salt);

    const reader = await Readers.create({
      login,
      username,
      email,
      password: hashedPassword,
    });

    const token = generateJwt(reader.id, login, username, email);

    res.json({ token });
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const reader = await Readers.findOne({ where: { email } });

    if (!reader) {
      return next(ApiError.badRequest("User is not exist"));
    }

    const comparePassword = bcrypt.compareSync(password, reader.password);
    if (!comparePassword) {
      return next(ApiError.badRequest("Incorrect password"));
    }

    const token = generateJwt(
      reader.id,
      reader.login,
      reader.username,
      reader.email
    );
    res.json({ token });
  }

  async checkAuth(req, res) {
    const token = generateJwt(
      req.reader.id,
      req.reader.login,
      req.reader.username,
      req.reader.email
    );
    res.json({ token });
  }

  async readerHistory(req, res) {
    const readerId = req.query.reader;

    let query = `SELECT readers_histories.readingStatus, readers_histories.createdAt, readers_histories.updatedAt, readers_histories.bookId, readers_histories.readerId, books.title FROM readers_histories JOIN books ON books.id = readers_histories.bookId`;

    const allBooks = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });

    const currentUserBooks = allBooks.filter(
      (item) => +item.readerId === +readerId
    );

    res.json(currentUserBooks);
  }

  async reserveBook(req, res, next) {
    const { readerId, bookId } = req.body;

    const allBooks = await sequelize.query(
      "SELECT * FROM readers_histories WHERE bookId = :bookId",
      {
        type: sequelize.QueryTypes.SELECT,
        replacements: { bookId },
      }
    );

    const isBookInRead = allBooks.find(
      (item) => item.readingStatus === "inRead"
    );

    if (isBookInRead) {
      return next(ApiError.badRequest("Book already in use"));
    }

    const book = await ReaderHistory.create({
      readerId,
      bookId,
      readingStatus: "inRead",
    });

    res.json(book);
  }

  async subscribeOnBook(req, res) {
    const { readerId, bookId } = req.body;

    const book = await ReaderHistory.create({
      readerId,
      bookId,
      readingStatus: "waitingForRead",
    });

    res.json(book);
  }
}

module.exports = new ReaderController();
