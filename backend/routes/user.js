const express = require("express");
const router = express.Router();

const { getUserById, getUser, updateUser, getAllUsers, getAllQuizzesOfUser } = require("../controllers/user");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");

router.param("userId", getUserById);

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
router.get("/users", getAllUsers);
router.get("/user/quizzes/:userId", isSignedIn, isAuthenticated, getAllQuizzesOfUser);

router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);

module.exports = router;