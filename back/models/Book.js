const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slugify = require('slugify');

const BookSchema = new Schema({
      title: {
          type: String,
          required: true, 
          unique: true
      },
      slug: {
        type: String, unique:true
    },
      author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Author',
          required: true
      },
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
      createdAt: {type: Date, default: Date.now}
});

BookSchema.pre('validate', function(next){
    this.slug = slugify(this.title, {lower: true})
    next()
})

const Book = mongoose.model('Book', BookSchema);
module.exports = Book;