const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Recipe-app');

module.exports = {
    mongoose
};