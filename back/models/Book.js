const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slugify = require('slugify');

const embededAuthor = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    age: { 
        type: Number, 
        required: true 
    }, 
    auth_id: {type: String, required: true}
})
const BookSchema = new Schema({
    title: {
        type: String,
        required: true, 
        unique: true
    },
    slug: {
        type: String, 
        unique:true
    },
    author: embededAuthor,
    publisher: {
        type: String,
        required: false
    },
    pages: {
        type: Number,
        required: false
    },
    year: {
        type: Number,
        required: false
    }, 
    isbn: {
        type: String, 
        required: false
    }, 
    rate: {
        type: Number,
        default: 0
    }, 
    desc: {
        type: String, 
        required: true
    },
    category: {
        type: String, 
        required: true, 
        enum: ["Aventura", "Ciencia ficcion", "Fantasia", "Gotica", "Novela negra", "Romance", "Biografia", "Distopia"]
    },
    createdAt: {
        type: Date, 
        default: Date.now
    },
    timesRated: {type: Number, default: 0}
});

BookSchema.pre('validate', function(next){
    this.slug = slugify(this.title, {lower: true})
    next()
})


const Book = mongoose.model('Book', BookSchema);
module.exports = {Book, BookSchema};