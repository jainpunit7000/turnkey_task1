// Importing dependencies for userData controller
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets") ;

exports.getUserData = (req, res, next) => {
    try {
        const token = req.get("Authorization").split(" ")[1];
        var tokenData = jwt.verify(token, secrets.JWTsecret);
    }
    catch(err) {
        console.log(err);
        return res.status(401).json({ "message": "invalid token" });
    };
    const email = tokenData.email;
    User.findOne({ email_id: email })
        .then( user => {
            return res.status(200).json({
                "message": "Succesfully fetched user data",
                userData: {
                    name: user.name,
                    email_id: user.email_id,
                    contact: user.contact
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ "message": "Internal Server Error" });
        });
};
