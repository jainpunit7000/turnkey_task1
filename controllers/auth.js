// Importing dependencies for Auth controller
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const emailValidator = require("../helpers/validateEmail") ;
const contactValidator = require("../helpers/validateContact") ;
const secrets = require("../config/secrets") ;

// Controller to handle user Login
exports.postLogin = (req, res, next) => {
    // extractring data from req body
    const email = req.body.email;
    const password = req.body.password;
    if( !emailValidator(email) ){
        res.status(400).json({"message": "Enter a valid email" });
    }
    User.findOne({ email_id: email })
        .then(user => {
            if (!user) {
                return res.status(400).json({"message": "No user with this Email exists" });
            }
            bcrypt.compare(password, user.password)
                .then(passwordMatches => {
                    if (passwordMatches) {
                        // Create a jwt with user email
                        const token = jwt.sign({
                            "email": user.email_id
                        },
                        secrets.JWTsecret,
                        { expiresIn: "1h" });

                        return res.status(200).json({
                            "message": "Logged in successfully",
                            "token": token
                        });
                    }
                    res.status(401).json({ "message": "Invalid Authentication, Wrong Password" });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({ "message": "Internal Server Error" });
                });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ "message": "Internal Server Error" });
        });
};

// Controller to handle user SignUp
exports.postSignUp = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const cPassword = req.body.cPassword;
    const contact = req.body.contact;

    if (name === "") {
        return res.status(400).json({ "message": "Enter a valid name" });
    }
    if (password.length < 8) {
        return res.status(400).json({ "message": "Password must be at least 8 char long" });
    }
    if (cPassword.length < 8) {
        return res.status(400).json({ "message": "cPassword must be at least 8 char long" });
    }
    if (password !== cPassword) {
        return res.status(400).json({ "message": "Make sure that your Passwords match" });
    }

    if (!emailValidator(email)) {
        return res.status(400).json({ "message": "Enter a valid email" });
    }

    if (!contactValidator(contact)) {
        return res.status(400).json({ "message": "Enter a valid Contact Number" });
    }


    // checking if a user with same email already exists
    User.findOne({ email_id: email })
        .then(user => {
            if (user) {
                return res.status(406).json({ "message": "A user with same email already exists" });
            }
            return bcrypt
                .hash(password, 12)
                .then(hashedPassword => {
                    const newUser = new User({
                        name: name,
                        email_id: email,
                        password: hashedPassword,
                        contact: contact
                    });
                    return newUser.save()
                })
                .then(result => {
                    res.status(201).json({ "message": "New user created Successfully" });
                });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ "message": "Internal Server Error" });
        });
};