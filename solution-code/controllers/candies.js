var Candy = require('../models/Candy');

// GET ALL
function getAll(req, res){
  var candies = req.body;
  Candy.find(candies, function(err, data){
    if(err){ 
      console.log("there was an error: "+ err); 
    }
    // res.json(data);
    res.render('layout', {candies: data});
  });
}

// POST
function createCandy(req, res){
  var candyname = req.body.name;
  var candycolor = req.body.color;
  var candy = Candy.create({name: candyname, color: candycolor}, function(err){
    if (err) res.json({
      message: 'Could not create candy: ' + err
    });
    res.redirect('/candies');
  });
}

// GET
function getCandy(req, res) {
  var id = req.params.id;
  Candy.findById({_id: id}, function(err, candy) {
    if(err) res.json({message: 'Could not find candy b/c:' + err});
    res.render('./partials/candy/edit', {candy: candy});
    // res.json({candy: candy});
  });
}

function updateCandy(req, res) {
  var id = req.params.id;

  Candy.findById({_id: id}, function(err, candy) {
    if(err) res.json({message: 'Could not find candy b/c: ' + err});

    if(req.body.name) candy.name = req.body.name;
    if(req.body.color) candy.color = req.body.color;

    candy.save(function(err) {
      if(err) res.json({messsage: 'Could not update candy b/c: ' + err});

      res.redirect('/candies');
    });
  });
}

function removeCandy(req, res) {
  var id = req.params.id;

  Candy.remove({_id: id}, function(err) {
    if(err) res.json({message: 'Could not delete candy b/c: ' + err});

    res.redirect('/candies');
  });
}

module.exports = {
  getAll: getAll,
  createCandy: createCandy,
  getCandy: getCandy,
  updateCandy: updateCandy,
  removeCandy: removeCandy
}
