const fetch = require('node-fetch');
const qs = require('qs');
const server_url = 'http://127.0.0.1:5000';

const registerUser = (name, password) => {
	const data = {name, password};
	fetchPOST(server_url, "/api/users", data);
}

const loginUser = (name, password) => {
	const data = {name, password}
	fetchPOST(server_url, "/api/login", data)
}

const getCustomers = () => {
	fetchGET(server_url, "/api/customers");
}

const addCustomer = (name, phone, email) => {
	const data = {name, phone, email}
	fetchPOST(server_url, "/api/customers", data);
}

const searchCustomer = (search) => {
	fetchGET(server_url, "/api/customers/search/" + search);
}

function fetchGET(url, endpoint) {
	fetch(url+endpoint)
	.then(res => res.json()) 
	.then((json) => {
		if (json.error) console.log(json.error);
		else console.log(json);
	});
}

function fetchPOST(url, endpoint, data) {
	const body = qs.stringify(data);
	fetch(url+endpoint, {
		method: "POST",
		body: body,
		headers: {
		    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
		}
	})
	.then(res => res.json())
	.then(json => console.log(json))
	.catch(error => console.log('Error:', error));
}

module.exports = {
	registerUser,
	loginUser,
	getCustomers,
	addCustomer,
	searchCustomer
}
