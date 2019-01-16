var mongoose = require('mongoose');

var userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    token: {
      type: String,
      default: "not set"
    }
	}
);

var User = mongoose.model('User', userSchema);

module.exports = User;
