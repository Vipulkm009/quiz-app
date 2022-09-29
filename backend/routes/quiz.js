const express = require("express");
const router = express.Router();

const { getQuizById, getQuiz, updateQuiz, createQuiz, getAllQuizzesForUser, addQuestion, removeQuestion, removeQuiz} = require("../controllers/quiz");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

router.param("quizId", getQuizById);
router.param("userId", getUserById);

router.post("/quiz/:userId", isSignedIn, isAuthenticated, createQuiz);

router.get("/quiz/:userId/:quizId", isSignedIn, isAuthenticated, getQuiz);
router.get("/quiz/:userId", isSignedIn, isAuthenticated, getAllQuizzesForUser);

router.put("/quiz/:userId/:quizId", isSignedIn, isAuthenticated, updateQuiz);

router.patch("/quiz/:userId/:quizId", isSignedIn, isAuthenticated, addQuestion);

router.delete("/quiz/:userId/:quizId", isSignedIn, isAuthenticated, removeQuiz);

module.exports = router;