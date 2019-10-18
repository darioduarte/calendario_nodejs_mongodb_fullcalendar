const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var calendarSchema = new Schema({
  title:{type:String, required:true},
  start:{type:Date, required:true},
  end:{type:Date},
  allDay:{type:Boolean,default:false}
})

let calendarModel = mongoose.model('calendar', calendarSchema);

module.exports = calendarModel;
