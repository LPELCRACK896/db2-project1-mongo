const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { BookSchema } = require('./Book')
const AuthorSchema = new Schema({
    name: { 
        type: String, 
        required: [true, "Please add name to the author"] 
    },
    age: { 
        type: Number, 
        required: [true, "Must add age of the author"] 
    },
    books: [BookSchema],
});

const Author = mongoose.model('Author', AuthorSchema);
module.exports = { Author, AuthorSchema };