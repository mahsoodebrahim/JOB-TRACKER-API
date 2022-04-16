# JOB-TRACKER-API

## About The Project

It was inspired by my personal job search and, the purpose of was to create and RESTFUL API that allows users to login and manage their job search. There are two collections used for storing all jobs and users, respectively. A user simply needs to provide a name, email, and password to register. Behind the scenes, session/authentication takes place via a JSON Web Token. Once registered, a user can login and create a job by providing the a status (applied, interviewing, or rejected), position, and company. As the user's search continues, they may update their job status.

Other avenues explored during the project include but are not limited to: express error handling, JSON Web Tokens for authentication, hashing sensitive data before storing within the database, MVC software architecture.

[API Link](https://job-tracking-api.herokuapp.com/)

[API Documentation](https://documenter.getpostman.com/view/20359081/Uyr5nJsK)

### Built With

- Node.js
- MongoDB
- Mongoose
- Express.js

## Acknowledgments

- Postman
- Heroku
- dotenv
- bcryptjs
- cors
- express-async-errors
- helmet
- jsonwebtoken
- xss-clean
- nodemon
- express-rate-limit
- http-status-codes
