// Load Requirements
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const userPrompt = require("./initialPrompt");
const connection = require("../app");
// const util = require("util");
// connection.query = util.promisify(connection.query);

// Department Functions

// Add department
function addDepartment() {
    inquirer.prompt([
        {
            name: "deptName",
            type: "input",
            message: "What is the name of the new department?"
        }
    ]).then(({ deptName }) => {
        connection.query("INSERT INTO department (name) VALUES (?);", [deptName], (err, res) => {
            if (err) {
                throw err;
            }
            console.log(`New department successfully added! -- ${deptName}`)
        })
        userPrompt.begin();
    })
    .catch(function(err) {
        console.log("error: ", err);
    })
}

// View all departments
function viewDept() {
    connection.query("SELECT * FROM department;", (err, res) => {
        if (err) {
            throw err;
        }
        const table = consoleTable.getTable(res);
        console.log(table)
    })
    userPrompt.begin();
}

// Delete Department TODO: bonus feature
// function deleteDepartment() {

// }

// View the total budget by department TODO: bonus feature
// function viewBudgetByDept() {
    
// }

module.exports = {
    add: addDepartment,
    view: viewDept,
    // delete: deleteDepartment,
    // viewBudget: viewBudgetByDept
}