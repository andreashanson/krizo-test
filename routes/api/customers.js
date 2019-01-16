const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');
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


router.post('/', verifyToken, doesCustomerExist, (req, res, next) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) return res.status(403).json({message: "Error", error: err});
    const data = {
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email
    }

    Customer.create(data, (err, customer) => {
      if (err) return res.status(400).json({message: "Error", error: err});
      res.json({customer: customer, authData: authData});
    });
  });
});


function doesCustomerExist(req, res, next) {
  const name = req.body.name;
  console.log(name);
  Customer.find({name: name}, (err, customer) => {
    if (customer.length == 0) {
      next();
    }
    else if (customer.length > 0) {
      return res.status(400).json({message: "Customer does already exist."});      
    }
  });
}


function verifyToken(req, res, next) {
  try {
    const data = fs.readFileSync('token.txt', 'utf8')
    req.token = data;
    next();
  }
  catch (err) {
    return res.status(400).json({message: "Error", error: err});
  }
}

module.exports = router;
