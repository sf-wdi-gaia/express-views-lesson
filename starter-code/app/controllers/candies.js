var Candy = require('../models/Candy');

// GET
function getAll(req, res){
  Candy.find({}, function(err, candies){
    if(err) res.json({message: 'Candies not found: ' + err});
    // res.json({message: candies});
    res.render('layout', {candies: candies});
  });
}

// POST
function createCandy(req, res){
  // console.log(req.body);
  Candy.create({name: req.body.name, color: req.body.color}, function(err, candy){
    if(err) res.json({message: 'Could not create candy, ' + err});
    res.json({candy: candy});
    // res.redirect('/candy');
  })
}

// GET
function getCandy(req, res) {
  var id = req.params.id;

  Candy.findById({_id: id}, function(error, candy) {
    if(error) res.json({message: 'Could not find candy b/c:' + error});

    res.json({candy: candy});
  });
}

function updateCandy(req, res) {
  var id = req.params.id;

  Candy.findById({_id: id}, function(error, candy) {
    if(error) res.json({message: 'Could not find candy b/c:' + error});

    if(req.body.name) candy.name = req.body.name;
    if(req.body.color) candy.color = req.body.color;

    candy.save(function(error) {
      if(error) res.json({messsage: 'Could not update candy b/c:' + error});

      res.json({message: 'Candy successfully updated'});
    });
  });
}

function removeCandy(req, res) {
  var id = req.params.id;

  Candy.remove({_id: id}, function(error) {
    if(error) res.json({message: 'Could not delete candy b/c:' + error});

    res.json({message: 'Candy successfully deleted'});
  });
}

module.exports = {
  getAll: getAll,
  createCandy: createCandy,
  getCandy: getCandy,
  updateCandy: updateCandy,
  removeCandy: removeCandy
}
