const Question = require("../models/question");
const Quiz = require("../models/quiz");
const User = require("../models/user");

exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if(err || !user) {
            res.status(400).json({
                error: "USER NOT FOUND."
            });
        }
        req.profile = user;
        next();
    });
};

exports.getUser = (req, res) => {
    req.profile.salt = undefined;
    req.profile.encryptedPassword = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    return res.json(req.profile);
};

exports.getAllUsers = (req, res) => {
    User.find().exec((err, users) => {
        if(err || !users) {
            res.status(400).json({
                error: "NO USERS FOUND."
            });
        }
        res.json(users);
    });
};

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
        {_id : req.profile._id},
        {$set : req.body},
        {new : true, useFindAndModify: false},
        (err ,user) => {
            if(err) {
                return res.status(400).json({
                    error: "NOT Authenticated to make changes."
                })
            }
            user.salt = undefined;
            user.encryptedPassword = undefined;
            user.createdAt = undefined;
            user.updatedAt = undefined;
            res.json(user);
        }
    );
};

exports.getAllQuizzesOfUser = (req, res) => {
    Quiz.find({user: req.profile._id})
    .populate("user", "_id name")
    .exec((err, quizzes) => {
        if(err) {
            return res.status(400).json({
                error: "No Quizzes "
            });
        }
        return res.json(quizzes);
    });
};