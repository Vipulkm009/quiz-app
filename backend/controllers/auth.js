const User = require("../models/user");
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { expressjwt } = require("express-jwt");

exports.signUp = (req, res) => {

    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }

    const user = new User(req.body);
    user.save((err, user) => {
        if(err) {
            return res.status(400).json({
                err: "NOT able to save user in DB",
                error: err.message
            });
        }
        res.json({
            name: user.name,
            email: user.email,
            id: user._id
        });
    });
};

exports.signIn = (req, res) => {
    const {email, password} = req.body;

    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }

    User.findOne({email}, (err, user) => {
        if(err || !user) {
            return res.status(400).json({
                error: "USER email does not exists"
            });
        }

        if(!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email and password did not match"
            });
        }

        //create token
        const token = jwt.sign({_id : user._id}, process.env.SECRET)
        //put token in cookie
        res.cookie("token", token, {expire: Date() + 9999});
        
        //send response to front end
        const {_id, fullName, email, occupation, myQuizzes} = user;

        return res.json({token, user: {_id, fullName, email, occupation, myQuizzes}});
    })
};

exports.signOut = (req, res) => {
    res.clearCookie("token");
    res.json({
        message: "User signOut successfully.",
    });
};


// protected routes
exports.isSignedIn = expressjwt({
    secret: process.env.SECRET,
    algorithms: ["HS256"],
    userProperty: "auth",
});


// custom middlewares
exports.isAuthenticated = (req, res, next) => {
    console.log(req.auth);
    console.log(req.profile);
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!checker){
        return res.status(403).json({
            error: "ACCESS DENIED"
        });
    }
    next();
};

exports.isAdmin = (req, res, next) => {
    if(req.profile.role === 0) {
        return res.status(403).json({
            error: "You are not ADMIN, ACCESS DENIED",
        });
    }
    next();
};