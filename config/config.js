require("dotenv").config();

const config = {
    "development": {
      "username": process.env.DEV_DB_USERNAME || "postgres",
      "password": process.env.DEV_DB_PASSWORD || "123",
      "database": process.env.DEV_DB_DATABASE || "KTPM",
      "host": process.env.DEV_DB_HOST || "127.0.0.1",
      "dialect": process.env.DEV_DB_TYPE || "postgres",
      "dialectOptions": {
        "ssl": {}
      }
    },
    "test": {
      "username": process.env.TEST_DB_USERNAME || "postgres",
      "password": process.env.TEST_DB_PASSWORD || "123",
      "database": process.env.TEST_DB_DATABASE || "KTPM",
      "host": process.env.TEST_DB_HOST || "127.0.0.1",
      "dialect": process.env.TEST_DB_TYPE || "postgres"
    },
    "production": {
        "username": process.env.PRO_DB_USERNAME || "postgres",
        "password": process.env.PRO_DB_PASSWORD || "123",
        "database": process.env.PRO_DB_DATABASE || "KTPM",
        "host": process.env.PRO_DB_HOST || "127.0.0.1",
        "dialect": process.env.PRO_DB_TYPE || "postgres"
    }
}


module.exports = config;
  