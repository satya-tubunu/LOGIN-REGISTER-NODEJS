const { urlencoded } = require('express');
const express = require('express');
const mongoose = require('mongoose')
const mg = require('./database/mg')
const csruf = require('csurf');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const passport = require('passport');
const pconfig = require('./controller/passportLocal');
const flash = require('connect-flash');




const app = express();
//using passport config withou this it shows unkonown local statergy
pconfig(passport);



app.use(express.urlencoded({ extended: false }))
//view engine
app.set("view engine", "ejs");

app.use(cookieParser('key'));
app.use(expressSession({
    secret: 'key',
    maxAge: 24 * 60 * 60 * 1000,
    resave: true
}));

app.use(csruf());
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use(function (req, res, next) {
    res.locals.success_messages = req.flash('success_messages');
    res.locals.error_messages = req.flash('error_messages');
    res.locals.error = req.flash('error');
    next();
});
//load router
app.use('/', require('./routers/router'));



//use css and js file in website
app.use('/public', express.static('public'));



//connecting database



























app.get('*', (req, res) => {
    res.render('404');
})
//server port
const PORT = 2020;
app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
})