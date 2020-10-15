// // Load Requirements
// const mysql = require("mysql");
// const userPrompt = require("./lib/initialPrompt");
// const util = require("util");

// const connection = mysql.createConnection({
//   host: "localhost",
//   port: 3306,
//   user: "root",
//   password: "84Vq#sZ8>p",
//   database: "emp_trackerDB"
// });

// connection.query = util.promisify(connection.query);

// connection.connect((err) => {
//   if (err) {
//     throw err;
//   }
//   console.log(`Connected to DB with ID '${connection.threadId}'`);
//   userPrompt.begin();
// });

// module.exports = {connection};