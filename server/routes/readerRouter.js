const Router = require("express");
const router = new Router();
const ReaderController = require("../controllers/readerController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/registration", ReaderController.registration);
router.post("/login", ReaderController.login);
router.get("/checkAuth", authMiddleware, ReaderController.checkAuth);

module.exports = router;
