const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const users = require('./routes/api/users');
const customers = require('./routes/api/customers');
const login = require('./routes/api/login');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))

const uri = require('./configs').URI;

mongoose
	.connect(uri, { useNewUrlParser: true})
	.then(() => console.log("Connected to MongoDB!"))
	.catch(err => console.log(err));

app.use('/api/users', users);
app.use('/api/customers', customers);
app.use('/api/login', login);

app.get('/', (req, res) => {
	res.send("/api/users, /api/customers, /api/login")
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log("Server Started!");
});
