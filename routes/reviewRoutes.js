const express = require("express");
const router = express.Router();
const Review = require("../Models/Review");
const Product = require("../Models/Product")


router.post("/products/:productid/review", async (req, res) => {

    const { productid } = req.params;
    const { rating, comment } = req.body;
    const product = await Product.findById(productid);
    let review = await Review.create({ rating, comment });
    await product.review.push(review);
    await product.save();
    res.redirect(`/products/${productid}`)
})

module.exports = router;
