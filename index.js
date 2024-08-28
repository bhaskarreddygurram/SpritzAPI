import express, { json } from 'express';
const app = express();
import dotenv from "dotenv";
import { connectDb } from "./config/mysqlDB.js";
import Routes from "./routes/index.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { requestLogger, errorLogger } from './middleware/loggerMiddleware.js'; // Import the logger middleware
const port = process.env.PORT || 8000; // Use Heroku's PORT environment variable
import { swaggerUi, swaggerSpec } from './config/swaggerConfig.js'; // Import Swagger configuration

// Middleware to parse JSON
app.use(json());

dotenv.config(); //to enable the .env file

//Connect Database
connectDb();

// Use the request logger middleware
app.use(requestLogger);

// Serve Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//Routes
app.use("/api/v1", Routes);

// Use the error logger middleware
app.use(errorLogger);

// Error handler middleware
app.use(errorHandler);

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
