const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "", // FIXME: try and see if I can change my password
  database: ""
});

connection.connect(err => {
  if (err) {
    throw err;
  }
  console.log(`Connected as ID '${connection.threadId}'`);
  // first function goes here
});