const mongoose = require('mongoose')

const mongoUrl = "mongodb://127.0.0.1:27017/TODO-App?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.5"

mongoose.connect(mongoUrl).then(() => console.log("mongo connected"))

const TodoSchema = mongoose.Schema({
    title : String,
    desc : String,
    isCompleted : Boolean
})

const todoModel = mongoose.model('todos', TodoSchema);

module.exports = todoModel;