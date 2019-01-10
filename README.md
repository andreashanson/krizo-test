# krizo-test

set environment variables for mongoURI.

//Example
export mongoURI="mongodb://127.0.0.1:27017/kryzo"

//The token after Bearer <jwt_token> is the one you get after login. Save this for the client. It will be valid for 1 hour.

curl -H "authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVjMzYyN2Y3YTBjNTA4MGRkNzM2OGI5YiIsIm5hbWUiOiJBbmRyZWFzIiwicGFzc3dvcmQiOiJkZGQiLCJfX3YiOjB9LCJpYXQiOjE1NDcxNTk1OTMsImV4cCI6MTU0NzE1OTY4M30.MWxX8jI847DIfY8X_IDxJcOmQGwMp43u6LHrphR1qv8" -X POST -d name="test" -d email="test@test.com" -d password="t35t" http://localhost:5000/api/customers