const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Customer = require('../../schemas/customer');


router.get('/', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) return res.status(400).json({message: "Error", error: err});
    Customer.find({}, (err, customers) => {
  	  if (err) return res.status(400).json({message: "Error", error: err});
  	  res.json(customers)
    });
  });
});


router.get('/:id', verifyToken, (req, res) => {
  const id = req.params.id;
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) return res.status(400).json({message: "Error", error: err});
    Customer.find({_id: id}, (err, customer) => {
      if (err) return res.status(400).json({message: "Error", error: err});
      res.json(customer);
    });
  });
});


router.post('/', verifyToken, (req, res, next) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) return res.status(403).json({message: "Error", error: err});
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
  const token = req.headers["token"];
  if (typeof token !== 'undefined') {
    req.token = token;
    next();
  }
  else {
    res.status(403).json({message: "Forbidden. Undefined Header."});
  }
}

module.exports = router;
