// Load Requirements
const inquirer = require("inquirer");
const consoleTable = require("console.table");

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
        initialPrompt();
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
    initialPrompt();
}

// Delete Department TODO:
function deleteDepartment() {

}

// View the total budget by department TODO:
function viewBudgetByDept() {
    
}