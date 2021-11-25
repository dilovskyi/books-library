const Router = require("express");
const router = new Router();
const userController = require("../controller/reader.controller");

router.post("/createReader", userController.createReader);
router.get("/allReaders", userController.getAllReaders);
router.get("/oneReader/:id", userController.getOneReader);
router.put("/updateReader/:id", userController.updateReader);

module.exports = router;
