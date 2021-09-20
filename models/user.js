// Importing mongoose for creating User Schema
const mongoose = require('mongoose');

// Creating new mongoose schema
const Schema = mongoose.Schema;

// configuring User Schema
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email_id: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);