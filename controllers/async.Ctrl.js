//Controller to add all users + notes to front pg
'use strict';

var Note = require('../models/Note.model');
var User = require('../models/User.model');
var async = require('async');

exports.homePage = function(req, res) {
  // Gather all Notes and all Users
  async.parallel([
    function(cb) { //cb for callback
      var query = Note.find({});
      query.sort({
        createdOn: 'desc' //sorted in descending order
      })
      .limit(12) //limit number we can see to 12 at once
      .exec(function(err, notes) { //execute when sorted and limited
        cb(err, notes); //cus of async we need callback
      });
    },

    function(cb) {
      var query = User.find({});
      query.sort({ //sorted alphabetically
        username: 1
      })
      .exec(function(err, users) {
        cb(err, users);
      });
    }
    ],
    function(err, results) {
      if(err) { //err in getting user or notes
        console.log(err);
      } else {
        res.render('index', { //render index file
          notes: results[0], //results is a set of notes or users 
          users: results[1]
        });
      }
    });
};


