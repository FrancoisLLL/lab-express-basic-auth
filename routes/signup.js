const router = require("express").Router();
const User = require("../models/User.model")
const bcrypt = require('bcryptjs');

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

/* GET home page */
router.get("/", (req, res, next) => {
    res.render("signup");
});

/* GET home page */
router.post("/", (req, res, next) => {
    console.log(
        req.body
    )
    User.findOne({
            username: req.body.username
        })
        .then(
            data => {
                if (data) {
                    console.log("user exists")
                    res.render("signup", {error : "user exists"})
                } else {
                    User.create({
                            username: req.body.username,
                            password: bcrypt.hashSync(req.body.password, salt)
                        })
                        .then(data => {
                            req.session.currentUser = {
                                _id: data._id,
                            };
                            res.render("main")
                        })
                        .catch(error => console.log(error))
                }
            }
        )
        .catch(error => console.log(error))

});

module.exports = router;