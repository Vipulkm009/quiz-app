const express = require('express');
const { check } = require('express-validator');
const router = express.Router()

const { signOut, signUp, signIn, isSignedIn } = require("../controllers/auth");


router.post("/signup", [
    check("name").isLength({ min : 3}).withMessage('name should be atleast 3 char'),
    check("email").isEmail().withMessage('email is required.'),
    check("password").isLength({ min : 1}).withMessage('password is required'),
], signUp);


router.post("/signin", [
    check("email").isEmail().withMessage('email is required.'),
    check("password").isLength({ min : 3}).withMessage('password should be more than 3 char'),
], signIn);


router.get("/signout", signOut);

module.exports = router;