const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const userSchema = new mongoose.Schema({
    email: {
        type: String
    }
})
userSchema.plugin(passportLocalMongoose)
module.exports = mongoose.models.user || mongoose.model('user',userSchema);