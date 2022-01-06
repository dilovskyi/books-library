const Router = require("express");
const router = new Router();
const AuthorController = require("../controllers/AuthorController");

router.get("/getTopAuthors", AuthorController.getTopAuthors);

module.exports = router;
