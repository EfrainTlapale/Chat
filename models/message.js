var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  body: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Message', messageSchema);