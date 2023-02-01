const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    title: {
        type: String,
        required: true, 
        unique: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 10,
        required: [true, 'Please add a rating between 1 and 10']
      }, 
    text: {
        type: String, 
        required: [true, "Please add some text."]
    },
    createdAt: {
        type: Date, 
        default: Date.now
    },
    user: { 
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    book: { 
        type: mongoose.Schema.ObjectId,
        ref: 'Book',
        required: true
    }
});
//Only one review per user
ReviewSchema.index({book: 1, user: 1}, {unique: true})

const Review = mongoose.model('Review', ReviewSchema)

module.exports = {Review, ReviewSchema}