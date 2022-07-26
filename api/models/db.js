const mysql = require("mysql2");
const config = require("../config/db_Info.config.js");

// create a connection to the database
const connection = mysql
  .createConnection({
    host: config.db_Info.HOST,
    user: config.db_Info.USER,
    password: config.db_Info.PASSWORD,
    database: config.db_Info.DB,
  })

  .on("error", (err) => {
    console.log("Failed to create connection with the database! - ", err);
  });

// start the connection to the database
connection.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("Successfully connected to the database!");
  }
});

module.exports = connection;
