let { mongoose } = require('../db/mongoose')
const uniqueValidator = require('mongoose-unique-validator');
let UserSchema = mongoose.Schema(({
    username: {
        type: String,
        unique: true,
        required: true,
        min: 2,
        max: 20,
        trim: true
    },
    password: {
        type: String,
        required: true,
        min: 2,
        max: 20,
        trim: true
    }
}))
UserSchema.plugin(uniqueValidator);
let User = mongoose.model('users', UserSchema);
module.exports = {
    User
}