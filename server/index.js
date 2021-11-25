const express = require("express");
const userRouters = require("./routes/reader.routes");
var cors = require("cors");

const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", userRouters);

app.listen(PORT, () => {
  console.log("start server");
});
