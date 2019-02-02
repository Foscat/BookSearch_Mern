const router = require("express").Router();
const bookRoutes = require("./schoolBooks");

// Book routes
router.use("/books", bookRoutes);

module.exports = router;
