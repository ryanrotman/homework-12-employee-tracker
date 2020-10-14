// Load Requirements
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const userPrompt = require("./initialPrompt");
const connection = require("../app");
const util = require("util");
connection.query = util.promisify(connection.query);

// Employee Functions

// Get the current list of roles from the database to pass into the addEmployee prompt
function roleList() {
    return connection.query("SELECT title FROM role;");
}

// Get the current list of employees full names to pass into the updateEmployeeRole prompt
function empFullName() {
    connection.query("SELECT CONCAT(first_name, ' ', last_name) FROM employee;");
}

// Add employee
function addEmployee() {
    roleList().then((data) => {
        inquirer.prompt([
            {
                name: "firstName",
                type: "input",
                message: "What is the new employee's first name?"
            },
            {
                name: "lastName",
                type: "input",
                message: "What is the new employee's last name?"
            },
            {
                name: "role",
                type: "list",
                message: "What is the employee's role?",
                choices: data
            }
        ]).then(({ firstName, lastName, role }) => {
            connection.query("INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, (SELECT id FROM role WHERE title = ?;", [firstName, lastName, role], (err, res) => {
                if (err) {
                    throw err;
                }
                console.log(`New employee successfully added! -- ${firstName} ${lastName}: ${role}`)
            })
            userPrompt.begin();
        })
    })
}

// View all employees
function viewAllEmployees() {
    connection.query("SELECT * FROM employee;", (err, res) => {
        if (err) {
            throw err;
        }
        const table = consoleTable.getTable(res);
        console.log(table)
    })
    userPrompt.begin();
}

// Update employee role
function updateEmployeeRole() {
    empFullName().then((empData) => {
        inquirer.prompt([
            {
                name: "employee",
                type: "list",
                message: "To update an employee's role, please select the employee:",
                choices: empData
            }
        ])
    }).then(roleList().then((roleData) => {
        inquirer.prompt([
            {
                name: "newRole",
                type: "list",
                message: "What is the new role of the employee?",
                choices: roleData
            }
        ]).then(({ employee, newRole }) => {
            connection.query("UPDATE employee SET role_id = (SELECT id FROM role WHERE title = ?) WHERE CONCAT(first_name, ' ', last_name) = ?;", [newRole, employee], (err, res) => {
                if (err) {
                    throw err;
                }
                console.log(`${employee}'s role has been updated to ${newRole}.`)
            })
        })
    }))
}

// Update employee manager TODO:
// Query: UPDATE employee SET manager_id = (SELECT * FROM(SELECT id FROM employee WHERE first_name = "NAME OF MANAGER")tblTmp) WHERE id = NUMBER OF EMPLOYEE UPDATING;
// function updateEmployeeManager() {

// }

// View employees by manager TODO:
// function viewEmployeesByManager() {

// }

// Delete Employee TODO:
// function deleteEmployee() {
    
// }

module.exports = {
    add: addEmployee,
    view: viewAllEmployees,
    updateRole: updateEmployeeRole,
    // updateMang: updateEmployeeManager,
    // viewByMang: viewEmployeesByManager,
    // delete: deleteEmployee,
}