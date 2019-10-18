var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/student',{useNewUrlParser:true})

var conn = mongoose.Connection;

var studentSchema = new mongoose.Schema({
    name:String,
    email:String,
    class:String,
    gender:String,
    contact:Number,
});

var studentModel = mongoose.model('student',studentSchema);

module.exports=studentModel;