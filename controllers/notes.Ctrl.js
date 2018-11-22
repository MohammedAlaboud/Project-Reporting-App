 'use strict';

var Note = require('../models/Note.model');
var User = require('../models/User.model');

exports.allUsersNotes = function(req, res) {
  // Find all users
  User.find({})
    .sort({ //sorted alphabetically
      username: 1
    })
    .exec(function(err, users) { //asynchronous execution takes functions that returns error obj as well as result of whatever we try to do
      if(err) {
        console.log('error getting users');
      } else {
        return res.render('newnote', {
          title: 'New Note',
          users: users //required for swig from newnote.html
        });
      }
    });
}

exports.createNote = function(req, res) {
  // Creating a new Note
  var newNote = new Note();
  newNote.memberName = req.body.memberName;
  newNote.project = req.body.project;
  newNote.workYesterday = req.body.workYesterday;
  newNote.workToday = req.body.workToday;
  newNote.impediment = req.body.impediment; //all properties from view

  newNote.save(function(err) { //if there's an error display error in view
    if(err) {
      var errMsg = 'Sorry, there was an error saving ' + err;
      res.render('newnote', { //render in newnote pg
        title: 'Note - new note (error)',
        message: errMsg
      });
    } else {
      console.log('Meeting note has been saved '); //if there's no errors
      res.redirect(301, '/'); //redirect user to front p
    }
  });
};

//Filter by Name
exports.noteByMember = function(req, res) {
  var query = Note.find({});
  var filter = req.body.memberName;

  if(filter.length === 0) { //if set is empty 
    console.log('no notes found');
  } else {
    query.where({ //return notes for member specified
      memberName: filter
    })
    .sort({
      createdOn: 'desc'
    })
    .exec(function(err, results) { //don't forgrt to execute 
      res.render('index', { //render results in index page (make changes)
        notes: results
      });
    });
  }
}; 