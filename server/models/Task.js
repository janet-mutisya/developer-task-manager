const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    taskName: {type:String, require:true},
    description: {type:String, require:true},
    completed: {type:Boolean, default:false},
    owner: {type:mongoose.Schema.Types.ObjectId, ref:'User', require:true}
});

module.exports = mongoose.model('Task', taskSchema);