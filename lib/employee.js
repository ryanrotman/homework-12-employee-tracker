// Load Requirements
const inquirer = require("inquirer");
const consoleTable = require("console.table");


// Employee Functions

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
            choices: [
                "Education Director",
                "Education Manager",
                "Education Coordinator",
                "Events Director",
                "Events Manager",
                "Events Coordinator",
                "Marketing Director",
                "Marketing Manager",
                "Marketing Coordinator",
                "Reseach Director",
                "Research Manager",
                "Research Coordinator"
            ]
        }
    ]).then(({ firstName, lastName, role }) => {
        const query = `INSERT INTO employee (first_name, last_name, role_id) VALUES (${firstName}, ${lastName}, (SELECT id FROM role WHERE title = ${role})`;
        connection.query(query, (err, res) => {
            if (err) {
                throw err;
            }
            console.log("Employee successfully added!")
        })
        initialPrompt();
    })
}

// View all employees FIXME:
function viewAllEmployees() {
    const query = `SELECT * FROM employee`;
    connection.query(query, (err, res) => {
        if (err) {
            throw err;
        }
        const table = consoleTable.getTable(res);
        console.log(table)
    })
    initialPrompt();
}

// Update employee role FIXME:
function updateEmployeeRole() {
    inquirer.prompt([
        {
            name: "employee",
            type: "list",
            message: "To update an employee's role, please select the employee:",
            choices: [
                // FIXME: FIGURE OUT HOW TO ADD A FUNCTION HERE TO GET THE LIST OF EMPLOYEES
            ]
        }
    ])
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