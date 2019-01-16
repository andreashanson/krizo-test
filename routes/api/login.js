const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const User = require('../../schemas/user');
const router = express.Router();

router.post('/', (req, res) => {
	User.findOne({name: req.body.name}, (err, user) => {
		if (err) return res.status(400).json({message: "Error", error: err});
		if (user && user.password === req.body.password) {
			jwt.sign({user: user}, "secretkey", {expiresIn: '1h'}, (err, token) => {
				if (err) return res.status(403).json({error: err});
				fs.writeFile('token.txt', token, (err) => {
					if (err) return res.status(400).json({message: "Error", error: err});
				});
	    		res.json({message: "Token file updated!"});
			});
		}
		else {
			return res.status(403).json({message: "Wrong password"});
		}
	})
});

module.exports = router;
