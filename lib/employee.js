// Load Requirements
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const userPrompt = require("./initialPrompt");
const connection = require("../app");
const role = require("./role");

// Employee Functions

// Get the current list of roles from the database to pass into the addEmployee prompt
let roleList = [];
    connection.query("SELECT title FROM role;", (err, res) => {
        if (err) {
            throw err;
        }
        roleList = res
    })

// Get the current list of employees full names to pass into the updateEmployeeRole prompt
let empFullName = [];
    connection.query("SELECT CONCAT(first_name, ' ', last_name) FROM employee;", (err, res) => {
        if (err) {
            throw err;
        }
        empFullName = res
    })

// Add employee FIXME:
function addEmployee() {
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
            choices: roleList
            // [
            //     "Education Director",
            //     "Education Manager",
            //     "Education Coordinator",
            //     "Events Director",
            //     "Events Manager",
            //     "Events Coordinator",
            //     "Marketing Director",
            //     "Marketing Manager",
            //     "Marketing Coordinator",
            //     "Reseach Director",
            //     "Research Manager",
            //     "Research Coordinator"
            // ]
        }
    ]).then(({ firstName, lastName, role }) => {
        // const query = `INSERT INTO employee (first_name, last_name, role_id) VALUES (${firstName}, ${lastName}, (SELECT id FROM role WHERE title = ${role}))`;
        connection.query("INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, (SELECT id FROM role WHERE title = ?;", [firstName, lastName, role], (err, res) => {
            if (err) {
                throw err;
            }
            console.log("Employee successfully added!")
        })
        userPrompt.begin();
    })
}

// View all employees
function viewAllEmployees() {
    // const query = `SELECT * FROM employee`;
    connection.query("SELECT * FROM employee;", (err, res) => {
        if (err) {
            throw err;
        }
        const table = consoleTable.getTable(res);
        console.log(table)
    })
    userPrompt.begin();
}

// Update employee role FIXME:
function updateEmployeeRole() {
    inquirer.prompt([
        {
            name: "employee",
            type: "list",
            message: "To update an employee's role, please select the employee:",
            choices: empFullName
            // [
            //     // FIXME: FIGURE OUT HOW TO ADD A FUNCTION HERE TO GET THE LIST OF EMPLOYEES
            // ]
        },
        {
            name: "newRole",
            type: "list",
            message: "What is the new role of the employee?",
            choices: roleList
            // [
            //     // FIXME: CREATE QUERY TO GET THE CURRENT LIST OF ROLES IN THE DATABASE
            // ]
        }
    ]).then(({ employee, newRole }) => { // FIXME: FIGURE OUT THE REST OF THE QUERY
        connection.query("UPDATE employee SET role_id = (SELECT id FROM role WHERE title = ?) WHERE ;")
    })
}

// Update employee manager TODO:
// Query: UPDATE employee SET manager_id = (SELECT * FROM(SELECT id FROM employee WHERE first_name = "NAME OF MANAGER")tblTmp) WHERE id = NUMBER OF EMPLOYEE UPDATING;
function updateEmployeeManager() {

}

// View employees by manager TODO:
function viewEmployeesByManager() {

}

// Delete Employee TODO:
function deleteEmployee() {
    
}

module.exports = {
    add: addEmployee,
    view: viewAllEmployees,
    updateRole: updateEmployeeRole,
    updateMang: updateEmployeeManager,
    viewByMang: viewEmployeesByManager,
    delete: deleteEmployee,
}