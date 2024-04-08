const mongoose = require('mongoose')

const mongoURL = 'mongodb://127.0.0.1:27017/card-generator?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.5';
mongoose.connect(mongoURL)
    .then(console.log("Mongo connected"))

const CardSchema = mongoose.Schema({
    name: {
        type: String,
    },
    desc: {
        type: String,
    },
    interestList: {
        type: Array,
    },
    socialMedia: {
        type: Object,
    },
})

const cardModel = mongoose.model("cards", CardSchema);

module.exports = cardModel;