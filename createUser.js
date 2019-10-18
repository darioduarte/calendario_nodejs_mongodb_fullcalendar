const mongoose = require('mongoose');
var model = require(__dirname + '/models/model.js');

mongoose.connect('mongodb://localhost:27017/agenda', {useNewUrlParser: true,useUnifiedTopology: true}).then(db => console.log("db conectada")).catch(err => console.log(err));

user = {
  user: 'mauricio@gmail.com',
  pass: '555'
}

let createUser = new model(user);

createUser.save().then(function (a) {
  console.log(a);
}).catch(function (err) {
  console.log(err);
});
