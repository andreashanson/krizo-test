const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../../schemas/user');
const router = express.Router();


router.post('/', (req, res) => {

	User.findOne({name: req.body.name}, (err, user) => {
		if (user.password === req.body.password) {
				jwt.sign({user: user}, "secretkey", {expiresIn: '1h'}, (err, token) => {
    			res.json({token: token})
			});
		}
		else {
			res.status(403).json({message: "Forbidden"});
		}
	})
});

module.exports = router;