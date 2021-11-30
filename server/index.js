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

// Start db connection
(async function () {
  try {
    await sequelize.sync({ force: true });
    await sequelize.authenticate();
    app.listen(PORT, async () => {
      console.log(`start server on port ${PORT}`);

      //TODO:
      // console.log(countriesGenerator(10));
      for (let i = 0; i < 10; i++) {
        const author = await Authors.create(authorsGenerator(1));
        const book = await Books.create(booksGenerator(1));
        BooksAuthors.create({ authorId: author.id, bookId: book.id });
      }
      // authorsGenerator(10).forEach((item) => Authors.create(item));
      // booksGenerator(10).forEach((item) => Books.create(item));
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
