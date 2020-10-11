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

// View employees by department FIXME:
function viewEmployeesByDept() {

}

// View employees by role FIXME:
function viewEmployeesByRole() {

}

// View all employees FIXME:
function viewAllEmployees() {

}

// Update employee role FIXME:
function updateEmployeeRole() {

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