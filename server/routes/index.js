const Router = require("express");
const router = new Router();

const readerRouter = require("./readerRouter");

router.use("/readers", readerRouter);

module.exports = router;
