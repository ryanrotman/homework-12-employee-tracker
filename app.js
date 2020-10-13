// Load Requirements
const mysql = require("mysql");
const userPrompt = require("./lib/initialPrompt");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "84Vq#sZ8>p",
  database: "emp_trackerDB"
});

connection.connect(err => {
  if (err) {
    throw err;
  }
  console.log(`Connected as ID '${connection.threadId}'`);
  userPrompt.begin();
});

module.exports = {connection};