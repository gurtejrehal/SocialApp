const express = require('express')

const router = express.Router()
const passport = require('passport');

const User = require('../models/User');

// create passport local model
passport.use(User.createStrategy());

// serialize
passport.serializeUser(function (user, done) {
    done(null, user.id);
})

// deserialize
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    })
})

// regsiter user in db
router.post("/auth/register", async (req, res) => {
    try {
        const registerUser = await User
        .register({ username: req.body.username }, req.body.password);

        if(registerUser){
            passport.authenticate("local")(req, res, function(){
                res.redirect("/dashboard");
            })
        }
        else{
            res.redirect("/register");
        }
    }
    catch (err) {
        res.send(err);
    }
})

// Login 
router.post("/auth/login", (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    // using passport login
    req.login(user, (err) => {
        if(err){
            console.log(err)
        }
        else{
            passport.authenticate("local")(req, res, function(){
                res.redirect("/dashboard")
            })
        }
    })
})

//logout user
router.get("/auth/logout", (req, res) => {
    // using passport to logout
    req.logout(function(err) {
        if (err) { return next(err); }
    res.redirect('/');
    })
})


//export
module.exports = router;



