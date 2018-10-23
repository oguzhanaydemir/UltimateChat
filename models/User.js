var mongoose = require('mongoose');
var { Schema } = mongoose;

const UserSchema = new Schema({
    googleId: {
        type: String,
        required: true,
        unique: true,

    },
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true
    },
    profilePhotoUrl : String
});

module.exports = mongoose.model('users', UserSchema);