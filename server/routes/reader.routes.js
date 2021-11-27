const Router = require("express");
const router = new Router();
const ReaderController = require("../controller/reader.controller");

router.post("/createReader", ReaderController.createReader);
router.get("/allReaders", ReaderController.getAllReaders);
router.get("/getReader/:id", ReaderController.getOneReader);
router.put("/updateReader/:id", ReaderController.updateReader);

module.exports = router;
