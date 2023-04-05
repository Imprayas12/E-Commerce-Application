const mongoose = require('mongoose')
const reviewSchema = new mongoose.Schema({
    ratings: Number,
    comment: String
})
const Review = new mongoose.model('Review',reviewSchema)
module.exports = Review;