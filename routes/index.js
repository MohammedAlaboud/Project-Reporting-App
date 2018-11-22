var express = require('express');
var router = express.Router();
var notesCtrl = require('../controllers/notes.Ctrl');
var asyncCtrl = require('../controllers/async.Ctrl');


router.get('/', asyncCtrl.homePage); //using this from async instead
router.post('/', notesCtrl.noteByMember);

// router.get('/', function(req, res) {
//   res.render('index'); //already defines views in views folder, render index will make express look into views to determine what pg to render
// }); 

router.get('/newnote', notesCtrl.allUsersNotes);
router.post('/newnote', notesCtrl.createNote);

module.exports = router; //we need to export router so it can be accessed by app.js 