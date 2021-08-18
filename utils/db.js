const dotenv = require("dotenv");
const { Sequelize } = require("sequelize");

// Get ENV
dotenv.config();
const { DB_USER, DB_HOST, DB_PORT, DB_NAME, DB_PASSWORD } = process.env;

// Connect to DB
const db = new Sequelize(
  `mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  {
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    // logging: process.env.NODE_ENV === "production",
  }
);

db.Sequelize = Sequelize;

module.exports = db;
