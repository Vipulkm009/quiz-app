const Quiz = require("../models/quiz");
const User = require("../models/user");

exports.getQuizById = (req, res, next, id) => {
    Quiz.findById(id)
    .exec((err, quiz) => {
        if(err) {
            return res.status(400).json({
                error: "No Quiz found."
            });
        }
        req.quiz = quiz;
        next();
    });
};

exports.getQuiz = (req, res) => {
    return res.json(req.quiz);
};

exports.getAllQuizzesForUser = (req, res) => {
    User.findById(req.profile._id).populate("myQuizzes").exec((err, user) => {
        if(err) {
            return res.status(400).json({
                error: "No Quiz found."
            });
        }
        res.json(user.myQuizzes);
    });
};

exports.createQuiz = (req, res) => {
    const quiz = new Quiz(req.body);
    quiz.save((err, quiz) => {
        if(err) {
            console.log(err);
            return res.status(400).json({
                error: "Some Error Occured while saving quiz."
            });
        }
        req.profile.myQuizzes.push(quiz._id);
        User.findByIdAndUpdate(
            {_id : req.profile._id},
            {$set : req.profile},
            {new : true, useFindAndModify: false},
            (err ,user) => {
                if(err) {
                    return res.status(400).json({
                        error: "NOT Authenticated to make changes."
                    })
                }
                res.json({quiz});
        }
    );
    });
    // console.log(req.profile.myQuizzes);
    
    // console.log(req.profile.myQuizzes);
};

exports.updateQuiz = (req, res) => {
    Quiz.findByIdAndUpdate(
        {_id: req.quiz._id},
        {$set: req.body},
        {new: true, useFindAndModify: false},
        (err, quiz) => {
            if(err) {
                return res.status(400).json({
                    error: "Some Error Occured while updating quiz."
                });
            }
            res.json({quiz});
        }
    );
};

exports.addQuestion = (req, res) => {
    Quiz.findById(req.quiz._id)
    .exec((err, quiz) => {
        if(err) {
            return res.status(400).json({
                error: "No Quiz found."
            });
        }
        quiz.questions.push(req.body);
        Quiz.findByIdAndUpdate(
            {_id: req.quiz._id},
            {$set: quiz},
            {new: true, useFindAndModify: false},
            (erro, _quiz) => {
                if(erro) {
                    return res.status(400).json({
                        error: "Some Error Occured while updating quiz."
                    });
                }
                res.json({_quiz});
            }
        );
        req.quiz = quiz;
    });
};

exports.removeQuestion = (req, res) => {
    const quiz = req.quiz;
    quiz.remove((err, quiz) => {
        if(err) {
            return res.status(400).json({
                error: "Some error occured while deleting quiz"
            });
        }
        res.json({
            message: `${quiz.title} removed successfully`
        });
    });
};

exports.removeQuiz = (req, res) => {
    const quiz = req.quiz;
    quiz.remove((err, quiz) => {
        if(err) {
            return res.status(400).json({
                error: "Some error occured while deleting quiz"
            });
        }
        res.json({
            message: `${quiz.title} removed successfully`
        });
    });
};