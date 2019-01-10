const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Customer = require('../../schemas/customer');


router.get('/', (req, res) => {
  Customer.find({}, (customers, err) => {
  	if (err) return res.status(400).json({message: "Error", error: err});
  	res.json(customers)
  });
});


router.get('/:id', (req, res) => {
  const id = req.params.id;
  Customer.find({_id: id}, (err, customer) => {
      if (err) return res.status(400).json({message: "Error", error: err});
      res.json(customer);
  });
});


router.post('/', verifyToken, (req, res, next) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) return res.status(403).json({message: "Forbidden"});
    const data = {
      name: req.body.name,
      password: req.body.password,
      email: req.body.email
    }

    Customer.create(data, (err, customer) => {
      if (err) return res.status(400).json({message: "Error", error: err});
      res.json({customer: customer, authData: authData});
    });
  });
});

function verifyToken(req, res, next) {

  const bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  }
  else {
    res.status(403).json({message: "Forbidden. Undefined Header."});
  }

}

module.exports = router;
