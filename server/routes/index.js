const Router = require("express");
const router = new Router();

const readerRouter = require("./readerRouter");
const bookRouter = require("./bookRouter");
const authorRouter = require("./authorRouter");

router.use("/reader", readerRouter);
router.use("/book", bookRouter);
router.use("/author", authorRouter);

module.exports = router;
