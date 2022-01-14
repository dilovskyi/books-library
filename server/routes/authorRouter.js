const Router = require("express");
const router = new Router();
const AuthorController = require("../controllers/AuthorController");

// router.get("/getTopAuthorsId", AuthorController.getTopAuthorsId);
router.post("/getTopAuthorsName", AuthorController.getTopAuthorsName);
router.get("/getAuthor", AuthorController.getAuthor);

module.exports = router;
