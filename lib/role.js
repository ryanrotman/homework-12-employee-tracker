// Load Requirements
const inquirer = require("inquirer");
const consoleTable = require("console.table");

// Role Functions

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
            choices: [ // FIXME: how will I be able to add new roles that are added to the database?
                "Education",
                "Events",
                "Marketing",
                "Research"
            ]
        }
    ]).then(({ title, salary, department }) => {
        const query = `INSERT INTO role (title, salary, department_id) VALUES (${title}, ${salary}, (SELECT id FROM deparment WHERE name = ${department}))`;
        connection.query(query, (err, res) => {
            if (err) {
                throw err;
            }
            console.log("Role successfully added!");
        })
        initialPrompt();
    })
}

// View all roles FIXME:
function viewRole() {
    const query = `SELECT * FROM role`;
    connection.query(query, (err, res) => {
        if (err) {
            throw err;
        }
        const table = consoleTable.getTable(res);
        console.log(table)
    })
    initialPrompt();
}

// Delete role TODO:
function deleteRole() {
    
}

module.exports = {
    add: addRole,
    view: viewRole,
    delete: deleteRole
}