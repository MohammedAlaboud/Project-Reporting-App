var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//make sure a user is clicked on
var memberNameValidator = [ //it is inside an array []
  function(val) {
    return (val.length > 0 && val != '(Select Name)');
  },
  //custom error text
  'Select a valid member name. '
];

var noteSchema = new Schema({
  memberName: {
    type: String,
    validate: memberNameValidator //validator particular to mongoose
  },
  project: {
    type: String,
    required: true
  },
  workYesterday: {
    type: String,
    required: true
  },
  workToday: {
    type: String,
    required: true
  },
  impediment: {
    type: String,
    required: true,
    default: 'none'
  },
  createdOn: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Note', noteSchema);