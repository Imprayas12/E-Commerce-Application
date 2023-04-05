const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/user');
router.get('/register',(req, res) => {
    res.render('auth/signup')
})

router.get('/login',async (req, res) => {
    res.render('auth/login')
})

router.post('/login',passport.authenticate('local', {
    failureRedirect:'/login',
    failureFlash: 'login error',
}),(req, res) => {
    req.flash('success','You have logged in successfully');
    res.send('logged in successfully')
})

router.post('/register',async (req, res) => {
    const {username,password,email} = req.body;
    const user = new User({
        username:username,
        email: email
    });
    const newUser = await User.register(user,password)
    req.flash('success','You have registered successfully')
    res.redirect('/login')
})
module.exports = router;


