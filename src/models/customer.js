const moongose = require('mongoose');
const Schema = moongose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,

    },
    password: {
        type: String,
        required: true,

    }
});

module.exports = moongose.model('Customer', schema);