require("dotenv").config();

const sequelize = require("./dbConfig");
const models = require("./models/index");
const bcrypt = require("bcrypt");

const cors = require("cors");
const express = require("express");
const routes = require("./routes");

const errorHandler = require("./middleware/errorHandlingMiddleware");

const cookieParser = require("cookie-parser");
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = process.env.PORT || 8090;

// Start db connection
(async function () {
  try {
    await sequelize.sync({ force: true });
    await sequelize.authenticate();
    app.listen(PORT, () => {
      console.log(`start server on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

// app.use(express.encoded({ extended: false }));
app.use(cors());
app.use(express.json());

app.use(
  session({
    secret: "secret",
    saveUninitialized: true,
    resave: true,
  })
);

// app.use(flash);

// parsing the incoming data
//serving public file
// app.use(express.static(__dirname));

app.use("/", routes);
// Error check must be last middleware;
app.use(errorHandler);
