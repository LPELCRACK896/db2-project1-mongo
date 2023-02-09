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
ReviewSchema.index({  user: 1, book: 1 }, { unique: true });

// Static method to get avg rating and save
ReviewSchema.statics.getAverageRating = async function(bookId) {
    const obj = await this.aggregate([
      {
        $match: { book: bookId }
      },
      {
        $group: {
          _id: '$book',
          averageRating: { $avg: '$rating' }
        }
      }
    ]);
  
   try {
      if (obj[0]) {
        await this.model("Book").findByIdAndUpdate(bookId, {
            reviewerRate: obj[0].averageRating.toFixed(1),
        });
      } else {
        await this.model("Book").findByIdAndUpdate(bookId, {
            reviewerRate: undefined,
        });
      }
    }  catch (err) {
      console.error(err);
    }
  };

// Call getAverageCost after save
ReviewSchema.post('save', async function() {
    await this.constructor.getAverageRating(this.book);
});
  
  // Call getAverageCost before remove
ReviewSchema.post('remove', async function() {
    await this.constructor.getAverageRating(this.book);
});


const Review = mongoose.model('Review', ReviewSchema)

module.exports = {Review, ReviewSchema}