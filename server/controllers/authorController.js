const sequelize = require("../dbConfig");

class AuthorController {
  async getTopAuthors(req, res) {
    const authorsCount = req.query.count || 4;

    const author = await sequelize
      .query(
        `SELECT count(*) as booksTotal, authors.username, books_authors.authorId FROM authors JOIN books_authors ON authors.id = books_authors.authorId GROUP BY username ORDER BY booksTotal DESC LIMIT 0, ${authorsCount}`,
        {
          type: sequelize.QueryTypes.SELECT,
          plain: false,
          nest: true,
        }
      )
      .then(function (author) {
        return author;
      });

    res.json(author);
  }
}

module.exports = new AuthorController();
