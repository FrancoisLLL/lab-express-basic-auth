const router = require("express").Router();

const requireAuth = require("../middlewares/auth.js")
/* GET home page */
router.get("/", requireAuth, (req, res, next) => {
  res.render("main");
});

module.exports = router;
