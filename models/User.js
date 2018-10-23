var mongoose = require('mongoose');
var findOrCreate = require('mongoose-find-or-create');
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

UserSchema.plugin(findOrCreate);

module.exports = mongoose.model('users', UserSchema);