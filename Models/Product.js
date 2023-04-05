const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    name:{
        type: String
    },
    price:{
        type: Number,
    },
    desc: {
        type: String
    },
    img:String,
    review: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
})

// const Product = mongoose.model('Product',schema);
module.exports = mongoose.models.Product || mongoose.model('Product',schema);

// mongoose.models.Customer || mongoose.model('Customer', customerSchema);
