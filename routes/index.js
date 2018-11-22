//index.js: contains all routes of application 
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index'); //already defines views in views folder, render index will make express look into views to determine what pg to render
}); 

module.exports = router; //we need to export router so it can be accessed by app.js 