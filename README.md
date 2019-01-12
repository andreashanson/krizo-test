# krizo-test

# Start a mongo database with docker. Make sure you have docker installed.
docker container run -t -p 27017:27017 mongo

# Install mongo if you don't wan't to use docker.
sudo apt install mongodb-server-core
create folders /data/db

# Start a mongo database. Make sure you have mongo installed.
type mongod

# Set environment variables for mongoURI.
export mongoURI="mongodb://127.0.0.1:27017/kryzo"

# Register a new users
curl -X POST -d name="<name>" -d password="<password>" http://localhost:5000/api/users

# Login to get a temporary token that is valid for 1 hour.
curl -X POST -d name="<name>" -d password="<password>" http://localhost:5000/api/login

#Add a new customer <name> <password> <email> Use token you get after login.
curl -H "token: <token>" -X POST -d name="test" -d email="test@test.com" -d password="t35t" http://localhost:5000/api/customers

#List all customers
curl -H "token: <token>" http://localhost:5000/api/customers

#List customer by id
curl -H "token: <token>" http://localhost:5000/api/customers/<customer_id>
