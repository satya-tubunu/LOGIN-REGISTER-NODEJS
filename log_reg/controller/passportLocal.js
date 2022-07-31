
const user = require('../model/user');
const bcryptjs = require('bcryptjs');
var localStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');


console.log("hey");

module.exports = function (passport) {
    console.log("hey");


    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        user.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use(new localStrategy({ usernameField: 'email' }, (email, password, done) => {
        user.findOne({ email: email }, (err, data) => {
            if (err)
                return (err);
            if (!data) {
                return done(null, false, { message: "User Doesn't Exist !" });
            }
            bcryptjs.compare(password, data.password, (err, match) => {
                if (err) {
                    return done(null, false);
                }
                if (!match) {
                    return done(null, false, { message: 'Oops! Wrong password.' });
                }
                if (match) {
                    return done(null, data);
                }
            })
        })
    }));

}
