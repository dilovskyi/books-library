const Router = require("express");
const router = new Router();
const BookController = require("../controllers/bookController");

router.get("/get/:id", BookController.getOne);
router.get("/getAll", BookController.getAll);

module.exports = router;
