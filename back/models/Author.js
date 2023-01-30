const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {BookSchema} = require('./Book')
const AuthorSchema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    age: { 
        type: Number, 
        required: true 
    },
    books: [BookSchema],
});

const Author = mongoose.model('Author', AuthorSchema);
module.exports = { Author, AuthorSchema };