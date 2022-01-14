const sequelize = require("../dbConfig");

class AuthorController {
  async getTopAuthorsId(req, res) {
    const from = +req.query.from || 0;
    const limit = +req.query.limit + from || 3;

    const authors = await sequelize
      .query(
        `SELECT books_authors.authorId FROM authors JOIN books_authors ON authors.id = books_authors.authorId GROUP BY username ORDER BY count(*) DESC`,
        {
          type: sequelize.QueryTypes.SELECT,
          plain: false,
          nest: true,
        }
      )
      .then(function (author) {
        return author;
      });

    const limitedArray = authors.slice(from, limit);
    res.json({ totalLimit: authors.length, authors: limitedArray });
  }

  async getTopAuthorsName(req, res) {
    const authorIdArr = req.body;

    const authors = await sequelize.query(
      `SELECT authors.id, authors.username FROM authors WHERE id IN (${authorIdArr.join(
        ","
      )})`,
      {
        type: sequelize.QueryTypes.SELECT,
      }
    );

    res.json(authors);
  }

  async getTopAuthorsBooksTotal(req, res) {
    const authorIdArr = req.body;

    const authors = await sequelize.query(
      `SELECT books.authors.bookId FROM books.authors WHERE id = `,
      {
        type: sequelize.QueryTypes.SELECT,
      }
    );

    res.json(authors);
  }

  async getAuthor(req, res) {
    const authorId = req.query.authorId;

    const author = await sequelize.query(
      `SELECT authors.id, authors.username FROM authors WHERE id = ${authorId}`,
      {
        type: sequelize.QueryTypes.SELECT,
      }
    );

    res.json(author[0]);
  }
}

module.exports = new AuthorController();
