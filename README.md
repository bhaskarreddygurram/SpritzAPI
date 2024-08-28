# NodeApp

A Node.js application built with Express.js, featuring authentication, validation, logging, and API documentation.

## Description

NodeApp is a robust Node.js application that leverages various libraries and frameworks to provide a comprehensive backend solution. It includes features such as authentication, request validation, logging, and API documentation.

## Features

- **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.
- **Sequelize**: Promise-based Node.js ORM for MySQL.
- **JWT Authentication**: Secure authentication using JSON Web Tokens.
- **Request Validation**: Validate incoming requests using `express-validator`.
- **Logging**: Log requests and errors using `winston`.
- **API Documentation**: Automatically generated API documentation using Swagger.
- **Environment Variables**: Manage configuration using `dotenv`.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/bhaskarreddygurram/SpritzAPI.git
    ```
2. Navigate to the project directory:
    ```sh
    cd your-repo
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```

## Usage

1. Create a `.env` file in the root directory and add the following environment variables:
    ```env
    PORT=8000
    DB_HOST=your_db_host
    DB_USER=your_db_user
    DB_PASSWORD=your_db_password
    DB_NAME=your_db_name
    JWT_SECRET=your_jwt_secret
    ```

2. Start the server:
    ```sh
    npm start
    ```

3. The server will be running at `http://localhost:8000`.

## Environment Variables

- `PORT`: The port on which the server will run (default is 8000).
- `DB_HOST`: The hostname of your MySQL database.
- `DB_USER`: The username for your MySQL database.
- `DB_PASSWORD`: The password for your MySQL database.
- `DB_NAME`: The name of your MySQL database.
- `JWT_SECRET`: Secret key for signing JWT tokens.

## API Documentation

API documentation is available at `http://localhost:8000/api-docs`.

## Dependencies

- **axios**: Promise-based HTTP client for the browser and Node.js.
- **bcrypt**: Library to help you hash passwords.
- **dotenv**: Loads environment variables from a `.env` file.
- **express**: Fast, unopinionated, minimalist web framework for Node.js.
- **express-validator**: A set of express.js middlewares that wraps validator.js validator and sanitizer functions.
- **jsonwebtoken**: JSON Web Token implementation.
- **mysql2**: MySQL client for Node.js with focus on performance.
- **sequelize**: Promise-based Node.js ORM for MySQL.
- **swagger-jsdoc**: Generates swagger specification from JSDoc comments.
- **swagger-ui-express**: Serves swagger-ui for your swagger spec.
- **winston**: A logger for just about everything.

## Dev Dependencies

- **supertest**: A library for testing Node.js HTTP servers.

## Middleware

- **Request Logger**: Logs incoming requests using `winston`.
- **Error Logger**: Logs errors using `winston`.
- **Error Handler**: Handles errors and sends appropriate responses.

## Database

This project connects to a MySQL database using Sequelize. Ensure your database credentials are correctly set in the `.env` file.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the MIT License.
