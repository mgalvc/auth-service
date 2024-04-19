# Authentication Service

This is a basic REST API to perform authentication based on email and password.

## Why REST?

GraphQL is a great tool for the development of applications consumed by different consumers that might request data from many sources with different schemas and formatting requirements. Whenever you want to serve data in a dynamic single endpoint, enforcing data types and keeping it consistent for all consumers, it's the right choice.

On this application we are dealing with a very simple schema - email and password - and endpoints focused on performing operations rather than combining and returning data. For this reason REST is the better choice, keeping it simple and straightforward.

Reference: https://aws.amazon.com/compare/the-difference-between-graphql-and-rest/?nc1=h_ls

## How to execute

Run the following commands:

```
npm install
cp .env.example .env
```

This application runs on top of MongoDB, so set `MONGO_URI` with your connection string. Feel free to also change the `PORT` which the server will be running on and the `JWT_SECRET` that will be used to sign tokens.

With all that in place, just run `npm run dev` and it will start a development server with `nodemon`.

## Application structure

The application is structured on these different layers so that it can be easier maintained and extended:

### Infrastructure:

`db.js` is solely responsible for opening a connection to the database. Any specifics of this operations should be placed here.

`server.js` is the "glue" that will combine all pieces together and run the application. Any setup should happen on this file.

### Data

`model.js` is the data layer where we define the MongoDB schemas, with that being it's only responsibility.

### Application

`routes.js` is the application layer that holds the endpoints and business logic. A great improvement on this layer would be removing the direct imports to the models and use a repository instead. That removes a lot of the coupling between the data and application layers.

## Example CURLs

Login:
```
curl --request POST \
  --url http://localhost:3000/api/auth/login \
  --header 'Content-Type: application/json' \
  --data '{
	"email": "matheus@email.com",
	"password": "abcd"
}'
```

Create a reset password session:
```
curl --request POST \
  --url http://localhost:3000/api/auth/forgot-password \
  --header 'Content-Type: application/json' \
  --data '{
	"email": "matheus@email.com"
}'
```

Reset password:
```
curl --request POST \
  --url http://localhost:3000/api/auth/reset-password \
  --header 'Content-Type: application/json' \
  --data '{
	"sessionId": "66226c62957416676983bff0",
	"password": "123"
}'
```

## Testing

Definitely required, yet to be implemented.