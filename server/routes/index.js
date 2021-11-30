const Router = require("express");
const router = new Router();

const readerRouter = require("./readerRouter");
const bookRouter = require("./bookRouter");

router.use("/reader", readerRouter);
router.use("/book", bookRouter);

module.exports = router;
