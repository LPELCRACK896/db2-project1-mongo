const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slugify = require('slugify');

const embededAuthor = new Schema({
    name: { 
        type: String, 
        required: [true, "Please add name to embeded author"] 
    },
    age: { 
        type: Number, 
        required: [true, "Must add the authors age"] 
    }, 
    auth_id: {type: String, required: [true, "Must add auth_id"]}
})
const BookSchema = new Schema({
    title: {
        type: String,
        required: [true, "Must add book title"], 
        unique: true
    },
    slug: {
        type: String, 
        unique:true
    },
    author: embededAuthor,
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
        default: 3
    }, 
    desc: {
        type: String, 
        required: [true, "Must add the description of the book"]
    },
    category: {
        type: String, 
        required: [true, "Must include the category of the book"], 
        enum: ["Aventura", "Ciencia ficcion", "Fantasia", "Gotica", "Novela negra", "Romance", "Biografia", "Distopia"]
    },
    createdAt: {
        type: Date, 
        default: Date.now
    },
    timesRated: {type: Number, default: 1},
    publisher: { 
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, "Must indicate user publisher"]

    }, 
    reviewerRate: {
        type: Number,
        min: [1, 'Rating must be at least 1'],
        max: [10, 'Rating must can not be more than 10']
    }
});

BookSchema.pre('validate', function(next){
    this.slug = slugify(this.title, {lower: true})
    next()
})


const Book = mongoose.model('Book', BookSchema);
module.exports = { Book, BookSchema };