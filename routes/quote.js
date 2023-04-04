const router = require('express').Router();

const Quote = require('../models/Quote');

// home
router.get("/", (req, res) => {

    // check user is login then show route to redirect to dashboard

    if (req.isAuthenticated()) {
        res.redirect('/dashboard')
    }
    else {
        res.render("index")
    }

})

// register page
router.get("/register", (req, res) => {

    // check user is login then show route to redirect to dashboard

    if (req.isAuthenticated()) {
        res.redirect('/dashboard')
    }
    else {
        res.render("register")
    }

})

// login
router.get("/login", (req, res) => {

    // check user is login then show route to redirect to dashboard

    if (req.isAuthenticated()) {
        res.redirect('/dashboard')
    }
    else {
        res.render("login")
    }

})


// fetch from database table : quote
router.get("/dashboard", async (req, res) => {
    const passedVariable = req.query.show == null ? false : true;
    try{
        const allQuotes = await Quote.find();
        res.render("dashboard", { allQuotes, isAuth: req.isAuthenticated(), showToast: passedVariable })
    }
    catch(err) {
        res.send(err);
    }
})

// GET submit
router.get("/create", (req, res) => {
    if(req.isAuthenticated()) {
        res.render('create')
    }
    else{
        res.redirect('/register')
    }
})

//POST submit a quote
router.post("/create", async (req, res) => {
    try{
        const quote = new Quote({
            quote: req.body.quote,
            bgColor: req.body.bgcolor.substring(1), // color send hex  format(#eeee)
            username: req.user.username
        })

        //save 
        const saveQuote = await quote.save()

        // redirect to dashbord if success
        !saveQuote && res.redirect('/create')
        res.redirect('/dashboard?show=true');
    }
    catch(err) {
        res.send(err);
    }
})

// like 
router.post("/quotes/like", async (req, res) => {
    try{
        const post = await Quote.findById(req.body.likeBtn);
        const updateLikes = await post.updateOne({likes: post.likes + 1});

        res.redirect("/dashboard");
    }
    catch(err) {
        res.send(err);
    }
})


//export

module.exports = router;



