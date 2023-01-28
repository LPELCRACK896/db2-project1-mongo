const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
     title: {
          type: String,
          required: true
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
      }
});

const Book = mongoose.model('Book', BookSchema);
module.exports = Book;