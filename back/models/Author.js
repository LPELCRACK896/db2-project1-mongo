const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    age: { 
        type: Number, 
        required: true 
    },
    books: [
        { 
            type: Schema.Types.ObjectId,
            ref: 'Book' 
        }
    ],
});

const Author = mongoose.model('Author', AuthorSchema);
module.exports = Author;