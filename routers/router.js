const express = require('express');
const route = express.Router();
const user = require('../model/user');

const bcryptjs = require('bcryptjs');
const passport = require('passport');
const pconfig = require('../controller/passportLocal');
const flash = require('connect-flash');
const csruf = require('csurf');
const path = require('path')

const publicpaths = path.join(__dirname, '../error')
console.log(publicpaths);


route.get("/", (req, res) => {
    res.render('index');


})



route.get("/login", (req, res) => {
    res.render('login', { csrfToken: req.csrfToken(), message: req.flash('loginMessage') });


})
route.get("/register", (req, res) => {
    res.render('register', { csrfToken: req.csrfToken() });


})


// route.post('/register', async (req, res) => {
//     const { name, email, password } = req.body;
//     if (!name || !email || !password) {

//         res.render('register', {
//             err: "all fields reqired"
//         })

//     } else {
//         var userData = await user.findOne({
//             $or: [{ email: email }]
//         });
//         if (userData) {
//             res.render('register', {
//                 err: "user already exist"
//             });

//         }
//         else {
//             bcryptjs.genSalt(12, (err, salt) => {
//                 if (err) throw err;
//                 bcryptjs.hash(password, salt, (err, hash) => {
//                     if (err) throw err;
//             await user({
//                 name: name,
//                 email: email,
//                 password: password
//             }).save();

//         }

//         res.redirect('login');
//     };

// });
route.post('/register', async (req, res) => {
    // get all the values 
    const { name, email, password } = req.body;
    if (!name || !email || !password) {

        res.render('register', {
            err: "all fields reqired", csrfToken: req.csrfToken()
        })

    } else {
        var userData = await user.findOne({
            $or: [{ email: email }]
        });
        if (userData) {
            res.render('register', {
                err: "user already exist", csrfToken: req.csrfToken()
            });

        } else {
            // generate a salt
            bcryptjs.genSalt(12, (err, salt) => {
                if (err) throw err;
                // hash the password
                bcryptjs.hash(password, salt, (err, hash) => {
                    if (err) throw err;
                    // save user in db
                    user({
                        name: name,
                        email: email,
                        password: hash,


                    }).save((err, data) => {
                        if (err) throw err;
                        // login the user
                        // use req.login
                        // redirect , if you don't want to login
                        res.redirect('/login');
                    });
                })
            });
        }
    };
}
);



//handle login request

route.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        failureRedirect: '/login',
        successRedirect: '/',
        failureFlash: true
    })(req, res, next);
});
// route.get("*", (req, res) => {
//     // res.sendFile(__dirname, '../error/404.html');
//     res.render('z')
// })
module.exports = route;