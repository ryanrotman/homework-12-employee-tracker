// Load Requirements
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const userPrompt = require("./initialPrompt");
const connection = require("../app");
const util = require("util");
connection.query = util.promisify(connection.query);

// Role Functions

// Get the current list of departments from the database to pass into the addRole prompt
function departmentList() {
    return connection.query("SELECT name FROM departments;");
}

// Add role
function addRole() {
    departmentList().then((data) => {
        inquirer.prompt([
            {
                name: "title",
                type: "input",
                message: "What is the new role?"
            },
            {
                name: "salary",
                type: "input",
                message: "What is the salary for the new role? (DO NOT include commas)"
            },
            {
                name: "department",
                type: "list",
                message: "In what department is this role?",
                choices: data
            }
        ]).then(({ title, salary, department }) => {
            connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, (SELECT id FROM department WHERE name = ?));", [title, salary, department], (err, res) => {
                if (err) {
                    throw err;
                }
                console.log(`New role successfully added! -- ${title} - ${salary} - ${department}`);
            })
            userPrompt.begin();
        })
    })
}

// View all roles
function viewRole() {
    connection.query("SELECT * FROM role;", (err, res) => {
        if (err) {
            throw err;
        }
        const table = consoleTable.getTable(res);
        console.log(table)
    })
    userPrompt.begin();
}

// Delete role TODO: bonus feature
// function deleteRole() {
    
// }

module.exports = {
    add: addRole,
    view: viewRole,
    // delete: deleteRole
}