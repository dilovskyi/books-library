require("dotenv").config();

const sequelize = require("./dbConfig");

const cors = require("cors");
const express = require("express");
const routes = require("./routes");

const errorHandler = require("./middleware/errorHandlingMiddleware");

const authorsGenerator = require("./helpers/authorsGenerator");
const { Authors } = require("./models");

const booksGenerator = require("./helpers/booksGenerator");
const { Books } = require("./models");

const { BooksAuthors } = require("./models");

const countryGenerator = require("./helpers/countryGenerator");

const app = express();
const PORT = process.env.PORT || 8090;

const addFakeDataInDataBase = async () => {
  async function getRandomAuthorId(authorsCount) {
    const randomAuthor = await sequelize
      .query("SELECT * FROM `authors` WHERE id = :id", {
        replacements: { id: Math.ceil(Math.random() * authorsCount) },
        type: sequelize.QueryTypes.SELECT,
      })
      .then(function (randomAuthor) {
        return randomAuthor;
      });
    return randomAuthor[0].id;
  }

  new Promise((resolve, reject) => {
    // Сreate fake authors
    const authorsArr = authorsGenerator(5);
    authorsArr.forEach((item) => {
      Authors.create(item);
    });
    resolve(authorsArr.length);
  }).then(async (authorsCount) => {
    // Generate books and books_authors
    booksGenerator(100).forEach(async (item) => {
      const book = await Books.create(item);
      await BooksAuthors.create({
        bookId: book.id,
        authorId: await getRandomAuthorId(authorsCount),
      });
    });
  });
};

// Start db connection
(async function () {
  try {
    await sequelize.sync({ force: true });
    // await sequelize.sync();
    await sequelize.authenticate();
    app.listen(PORT, () => {
      addFakeDataInDataBase();
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

// app.use(express.encoded({ extended: false }));
app.use(cors());
app.use(express.json());

// app.use(flash);

// parsing the incoming data
//serving public file
// app.use(express.static(__dirname));

app.use("/", routes);
// Error check must be last middleware;
app.use(errorHandler);
