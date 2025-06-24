import { Sequelize, DataTypes } from "sequelize";

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbPassword = process.env.DB_PASSWORD;

const db = new Sequelize(dbName, dbUser, dbPassword, {
  dialect: "mysql",
  host: dbHost,
  port: dbPort,
  logging: console.log,
});

db.authenticate()
  .then(() => {
    console.log("Connected to database has been established successfully!");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

export { db, Sequelize, DataTypes };
