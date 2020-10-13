// Load Requirements
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const userPrompt = require("./initialPrompt");
const connection = require("../app");

// Role Functions

// Get the current list of departments from the database to pass into the addRole prompt
let departmentList = [];
    connection.query(`SELECT name FROM department;`, (err, res) => {
        if (err) {
            throw err;
        }
        departmentList = res
    })

// Add role FIXME:
function addRole() {
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
            choices: departmentList
            // [ 
            //     // FIXME: how will I be able to add new roles that are added to the database?
            //     "Education",
            //     "Events",
            //     "Marketing",
            //     "Research"
            // ]
        }
    ]).then(({ title, salary, department }) => {
        // const query = `INSERT INTO role (title, salary, department_id) VALUES (${title}, ${salary}, (SELECT id FROM deparment WHERE name = ${department}))`;
        connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, (SELECT id FROM department WHERE name = ?));", [title, salary, department], (err, res) => {
            if (err) {
                throw err;
            }
            console.log(`New role successfully added! -- ${title} - ${salary} - ${department}`);
        })
        userPrompt.begin();
    })
}

// View all roles
function viewRole() {
    // const query = `SELECT * FROM role`;
    connection.query("SELECT * FROM role;", (err, res) => {
        if (err) {
            throw err;
        }
        const table = consoleTable.getTable(res);
        console.log(table)
    })
    userPrompt.begin();
}

// Delete role TODO:
function deleteRole() {
    
}

module.exports = {
    add: addRole,
    view: viewRole,
    delete: deleteRole
}