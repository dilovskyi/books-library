require("dotenv").config();

const cors = require("cors");
const express = require("express");
const userRouters = require("./routes/reader.routes");

const app = express();
const PORT = 8080 || process.env.PORT;

// app.use(express.encoded({ extended: false }));
app.use(cors());
app.use(express.json());

app.use("/api", userRouters);

app.listen(PORT, () => {
  console.log(`start server on port ${PORT}`);
});
