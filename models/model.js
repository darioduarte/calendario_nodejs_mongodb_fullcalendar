const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
  user: {type: String, required: true},
  pass: {type: String, required: true}
});

let model = mongoose.model('user', userSchema);


module.exports = model;
