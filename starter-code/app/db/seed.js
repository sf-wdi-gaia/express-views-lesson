var mongoose = require('mongoose');
var conn = mongoose.connect('mongodb://localhost/candies-app-demo');
var Candy = require("../models/Candy");
Candy.remove({}, function(err) {
  if (err) {
    console.log("ERROR:", err);
  }
});

 var candies = [
  {id: 1, name: "Chewing Gum", color: "Pink"},
  {id: 2, name: "Pez", color: "Green"},
  {id: 3, name: "Marshmallow", color: "White"},
  {id: 4, name: "Candy Stick", color: "Blue"},
  {id: 5, name: "Twizzlers", color: "Red or Black"}
];

Candy.create(candies, function(err, docs) {
  if (err) {
    console.log("ERROR:", err);
  } else {
    console.log("Created:", docs);
    mongoose.connection.close();
  }
});