if(process.env.NODE_ENV != "production") {
    const dotnev = require('dotenv').config({ path : "./config.env"})
} 
const express = require("express");
const path = require("path")
const engine = require("ejs-mate")
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const User = require('./Models/user')
// All Product Routes
const productRouter = require("./routes/productRoutes");
//Review Routes
const reviewRouter = require("./routes/reviewRoutes")
//Auth router
const authRouter = require('./routes/authRoutes')
const flash = require('connect-flash')
var cookieParser = require('cookie-parser')
const session = require('express-session')
const bodyParser = require('body-parser');
const passport = require('passport')
const LocalStrategy = require('passport-local')
const {isLoggedIn} = require('./middleware');
app.set('view engine','ejs')
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
const DB_URL = process.env.DB_URL || "mongodb://127.0.0.1:27017/shopping-cart"
const PORT = process.env.PORT || 5000;
const SESSION_SECRET = process.env.SESSION_SECRET || 'This is a secret session'
const flashSession = {
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly:true,
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000
    }
}

app.use(session(flashSession));
app.use(flash());
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error')
    next();
})
app.use(passport.authenticate('session'))

// Middlewares

app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}));
app.engine("ejs", engine)
app.set("view engine","ejs");
app.set("views", path.join(__dirname, "views" ))
//Connect to DB
mongoose.connect(DB_URL,{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> console.log(" DB CONNECTED!"))
.catch((err)=> console.log(err));

app.get("/", (req,res)=>{
    res.render("index")
})

// Routers
app.use(productRouter);  // using router
app.use(reviewRouter);
app.use(authRouter)

app.listen(PORT, () => {
    console.log(`server running at port ${PORT}`)
})