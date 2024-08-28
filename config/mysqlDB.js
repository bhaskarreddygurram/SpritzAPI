import Sequelize from "sequelize";
import dotenv from "dotenv";
import mysql from "mysql2";
//import { logger } from "../middleware/logger.js";
dotenv.config(); //to enable the .env file

const {
  DB_HOST,
  DB_PORT,
  SQL_DATABASE,
  SQL_DATABASE_USERNAME,
  SQL_DATABASE_PASSWORD,
} = process.env;

const sequelize = new Sequelize(
  SQL_DATABASE,
  SQL_DATABASE_USERNAME,
  SQL_DATABASE_PASSWORD,
  {
    host: DB_HOST,
    port: DB_PORT,
    dialect: "mysql",
    dialectModule: mysql,
    //logging: true,
    dialectOptions: {
      //useUTC: false //for reading from database
  },
    timezone: "+02:00", // Set the European timezone offset here
    define: {
      //timestamps: false,
      freezeTableName: true
    },
  }
);
console.log("mysql connection params", SQL_DATABASE, SQL_DATABASE_USERNAME, SQL_DATABASE_PASSWORD, DB_PORT, DB_HOST );
export const connectDb = async () => {
  try {
    await sequelize.authenticate();

    // Set the timezone for the connection
    await sequelize.query("SET time_zone = '+02:00';");

    // Retrieve the current date and time
    const currentDateTime = new Date().toLocaleString("en-US", {
      timeZone: "Europe/Paris",
    });
    console.log("Current Date and Time:", currentDateTime);

    // Set the European timezone after establishing the connection
    //const timeZoneQuery = `SET time_zone = 'Europe/Paris';`;
    //await sequelize.query(timeZoneQuery); //It saying -> Unknown or incorrect time zone: 'Europe/Paris'

    console.log("Hurray, You Are Connected to MySQL Database");
  } catch (error) {
    /*console.log(
      "Error while establish connection with MySql Database " + error
    );*/
    process.exit(1);
  }
};

export default sequelize;
