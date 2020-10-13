// Load Requirements
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const userPrompt = require("./initialPrompt");
const connection = require("../app");

// Department Functions

// Add department FIXME:
function addDepartment() {
    inquirer.prompt([
        {
            name: "deptName",
            type: "input",
            message: "What is the name of the new department?"
        }
    ]).then(({ deptName }) => {
        const query = `INSERT INTO department (name) VALUES (${deptName})`;
        connection.query(query, (err, res) => {
            if (err) {
                throw err;
            }
            console.log("Department successfully added!")
        })
        userPrompt.begin();
    })
}

// View all departments FIXME:
function viewDept() {
    const query = `SELECT * FROM department`;
    connection.query(query, (err, res) => {
        if (err) {
            throw err;
        }
        const table = consoleTable.getTable(res);
        console.log(table)
    })
    userPrompt.begin();
}

// Delete Department TODO:
function deleteDepartment() {

}

// View the total budget by department TODO:
function viewBudgetByDept() {
    
}

module.exports = {
    add: addDepartment,
    view: viewDept,
    delete: deleteDepartment,
    viewBudget: viewBudgetByDept
}