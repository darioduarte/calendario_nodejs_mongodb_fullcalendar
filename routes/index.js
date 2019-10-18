var express = require('express');
var router = express.Router();
var model = require('../models/model.js');
var calendarModel = require('../models/calendarModel.js');

/* GET home page. */
router.post('/login', function(req, res, next) {
    model.findOne({ 'user': req.body.user },function (err, person) {
    if (err) return handleError(err);
    console.log(person);
    if (person.user === req.body.user && person.pass === req.body.pass) {
      res.send("Validado");
    }
  });
});

router.get('/events/all', function(req, res, next) {
  let calendar = calendarModel.find().exec(function (err, dates) {
    if(err)console.log(err);
    res.send(dates);
  });

});

router.post('/events/new', function(req, res, next) {
    let calendar = new calendarModel(req.body);
    calendar.save().then(function (a) {
      console.log(a);
      res.send("El evento se añadio correctamente")
    }).catch(function (err) {
      console.log(err);
    });
});

router.post('/events/update', function(req, res, next) {
  console.log(req.body);
  calendarModel.findByIdAndUpdate(req.body._id, req.body, {new: true}, function(err, model){
    if(err)console.log(err);
    res.send("Se actualizo correctamente")
  })
});

router.post('/events/delete/:_id', function(req, res, next) {
  console.log(req.params,"petición");
  calendarModel.findOneAndRemove(req.params, function (err, data) {
    console.log(data);
  })

});

module.exports = router;
