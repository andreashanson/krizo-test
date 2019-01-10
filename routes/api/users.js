const express = require('express');
const router = express.Router();
const User = require('../../schemas/user');


// List all users
router.get('/', (req, res) => {
  User.find({}, (err, users) => {
  	if (err) return res.status(400).json({message: "Error", error: err});    
    res.json(users)
  });
});


// List one user
router.get('/:id', (req, res) => {
  const id = req.params.id;
  User.find({_id: id}, (err, user) => {
      if (err) return res.status(400).json({message: "Error", error: err});
      res.json(user);
  });
});

// Register new user
router.post('/', (req, res, next) => {
  const data = {
    name: req.body.name,
    password: req.body.password
  }

  User.create(data, (err, user) => {
    if (err) return res.status(400).json({message: "Error", error: err});
    res.json(user);
  });
});


module.exports = router;
