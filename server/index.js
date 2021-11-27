require("dotenv").config();

const db = require("./dbConfig");
const bcrypt = require("bcrypt");

const cors = require("cors");
const express = require("express");
const readerRouters = require("./routes/reader.routes");

const cookieParser = require("cookie-parser");
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = 8080 || process.env.PORT;

// app.use(express.encoded({ extended: false }));
app.use(cors());
app.use(express.json());

app.use(
  session({
    secret: "secret",
    saveUninitialized: true,
  })
);

// app.use(flash);

// parsing the incoming data
//serving public file
app.use(express.static(__dirname));

app.use(cookieParser());

// app.use("/api", readerRouters);

app.post("/api/createReader", async (req, res) => {
  const { login, gender, username, email, password, confirmPassword } =
    req.body;

  req.session.login = email;
  console.log(req.session);

  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const newPerson = await db.query(
    `INSERT INTO readers (login, gender, username, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [login, gender, username, email, hashedPassword]
  );
  res.json(newPerson.rows[0]);
});

app.get("/api/getReader/:id", async (req, res) => {
  console.log(req.session);

  const id = req.params.id;
  const user = await db.query(`SELECT * FROM readers WHERE id = $1`, [id]);
  res.json(user.rows[0]);
});

app.listen(PORT, () => {
  console.log(`start server on port ${PORT}`);
});
