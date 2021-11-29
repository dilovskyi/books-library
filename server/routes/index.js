const Router = require("express");
const router = new Router();

const readerRouter = require("./readerRouter");

router.use("/reader", readerRouter);

module.exports = router;
