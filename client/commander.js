const commander = require('commander');
const registerUser = require('./functions').registerUser;
const loginUser = require('./functions').loginUser;
const getCustomers = require('./functions').getCustomers;
const addCustomer = require('./functions').addCustomer;


commander
	.command('register <name> <password>')
	.alias('r')
	.description('Register a user')
	.action((name, password) => {
		registerUser(name, password);
	});

commander
	.command('login <name> <password>')
	.alias('l')
	.description('Login')
	.action((name, password) => {
		loginUser(name, password);
	});

commander
	.command('list')
	.alias('L')
	.description('List all customers')
	.action(() => {
		getCustomers();
	});

commander
	.command('add <name> <phone> <email>')
	.action((name, phone, email) => {
		addCustomer(name, phone, email);
	});

commander.parse(process.argv);	