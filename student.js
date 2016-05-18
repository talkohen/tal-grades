var mongoose = require ('mongoose');
var schema = mongoose.Schema;


var studentSchema = new schema ({
    id : {type: Number, required:true, unique:true},
    name : String,
    grade: Number,
    year: Number,
}, {collection: 'student'});

var Student = mongoose.model ('Student', studentSchema);

module.exports = Student;
