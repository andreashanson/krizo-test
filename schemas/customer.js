var mongoose = require('mongoose');

var customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
	}
);

var Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
