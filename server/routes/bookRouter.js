const Router = require("express");
const router = new Router();
const BookController = require("../controllers/bookController");

router.get("/get/:id", BookController.getOne);
router.get("/getAll", BookController.getAll);
router.get("/getByPage", BookController.getByPage);
router.get("/getByAuthor", BookController.getByAuthor);
router.get("/getTopAuthors", BookController.getTopAuthors);
router.post("/getBooksReadingStatus", BookController.getBooksReadingStatus);
router.get("/getWaitingForReadBooks", BookController.getWaitingForReadBooks);
router.get("/bookQueue", BookController.bookQueue);

module.exports = router;
