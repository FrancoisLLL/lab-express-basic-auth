const router = require("express").Router();
const User = require("../models/User.model")
const bcrypt = require('bcryptjs');

/* GET home page */
router.get("/", (req, res, next) => {
    res.render("signin");
});
router.get("/userCreated", (req, res, next) => {
    res.render("signin", {
        userCreated: true
    });
});
router.get("/userExists", (req, res, next) => {
    res.render("signin", {
        userExist: true
    });
});


/* GET home page */
router.post("/", (req, res, next) => {
    User.findOne({
            username: req.body.username
        })
        .then(data => {
            if (!data) {
                console.log("bad credentials");
                res.render("signin.hbs", {error : "Bad credentials"})
            } else {
                console.log("data", req.body.password, data.password);
                if (bcrypt.compareSync(req.body.password, data.password)) {
                    console.log('Password OK')
                    req.session.currentUser = {
                        _id: data._id,
                    };
                    console.log("CurrentUser: ", req.session.currentUser)
                    res.render("main", {
                        user: data.username
                    });

                } else {
                    console.log("bad credentials");
                    res.render("signin.hbs", {error : "Bad credentials"})
                }
            }
        })
        .catch(error => {
            console.log(error);
            res.redirect("signin")
        })
});

module.exports = router;