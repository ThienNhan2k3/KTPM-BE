require("dotenv").config();

const config = {
    "development": {
      "username": process.env.DEV_DB_USERNAME || "postgres",
      "password": process.env.DEV_DB_PASSWORD || null,
      "database": process.env.DEV_DB_DATABASE || "database_development",
      "host": process.env.DEV_DB_HOST || "127.0.0.1",
      "dialect": process.env.DEV_DB_TYPE || "postgres"
    },
    "test": {
      "username": process.env.TEST_DB_USERNAME || "postgres",
      "password": process.env.TEST_DB_PASSWORD || null,
      "database": process.env.TEST_DB_DATABASE || "database_test",
      "host": process.env.TEST_DB_HOST || "127.0.0.1",
      "dialect": process.env.TEST_DB_TYPE || "postgres"
    },
    "production": {
        "username": process.env.PRO_DB_USERNAME || "postgres",
        "password": process.env.PRO_DB_PASSWORD || null,
        "database": process.env.PRO_DB_DATABASE || "database_production",
        "host": process.env.PRO_DB_HOST || "127.0.0.1",
        "dialect": process.env.PRO_DB_TYPE || "postgres"
    }
}


module.exports = config;
  