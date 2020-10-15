// Load Requirements
const mysql = require("mysql");
const util = require("util");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

let roleList = [];
let employeeList = [];
let managerList = [];
let departmentList = [];

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "84Vq#sZ8>p",
  database: "emp_trackerDB"
});

connection.query = util.promisify(connection.query);

connection.connect(err => {
  if (err) {
    throw err;
  }
  console.log(`Connected as ID '${connection.threadId}'`);
  welcomeLogo();
  initialPrompt();
});

function welcomeLogo() {
    console.log(`
      +-----------------------------------------------------+
      |    ______                 _                         |
      |   |  ____|               | |                        | 
      |   | |__   _ __ ___  _ __ | | ___  _   _  ___  ___   |
      |   |  __| | '_  _  || '_ || |/ _ || | | |/ _ |/ _ |  |
      |   | |____| | | | | | |_) | | (_) | |_| |  __/  __/  |
      |   |______|_|_|_|_|_| .__/|_||___/ |__, ||___||___|  |
      |          |__   __| | |       | |   __/ |            |
      |             | |_ __|_|__  ___| | _|___/_ __         | 
      |             | | '__/ _  |/ __| |/ / _ | '__|        |
      |             | | | | (_| | (__|   <  __/ |           |
      |             |_|_|  |__,_||___|_||_|___|_|           |
      |                                                     |
      +-----------------------------------------------------+                    
  `);
}

// Initial Prompt to user to select what feature they would like to do
function initialPrompt() {
    return inquirer.prompt([
        {
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "Add department",
                "Add role",
                "Add employee",
                "View all departments",
                "View all roles",
                "View all employees",
                "Update employee role",
                // "Update employee manager",
                // "View employees by manager",
                // "Delete department",
                // "Delete role",
                // "Delete employee",
                // "View the total budget of a department",
                "Exit"
            ]
        }
    ]).then(onInitialPromptAnswer);
}

// Answers/Actions based on User selection above
function onInitialPromptAnswer({ action }) {
    switch (action) {
        case "Add department":
            addDepartment();
            break;

        case "Add role":
            addRole();
            break;

        case "Add employee":
            addEmployee();
            break;

        case "View all departments":
            viewDept();
            break;

        case "View all roles":
            viewRole();
            break;

        case "View all employees":
            viewAllEmployees();
            break;

        case "Update employee role":
            updateEmployeeRole();
            break;

        // case "Update employee manager":
        //     employee.updateMang();
        //     break;

        // case "View employees by manager":
        //     employee.viewByMang();
        //     break;

        // case "Delete department":
        //     department.delete();
        //     break;

        // case "Delete role":
        //     role.delete();
        //     break;

        // case "Delete employee":
        //     employee.delete();
        //     break;

        // case "View the total budget of a department":
        //     department.viewBudget();
        //     break;

        case "Exit":
            default:
                console.log("Thank you and goodbye.");
                connection.end();
    }
}

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
        initialPrompt();
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
        const table = consoleTable.getTable("\nAll Departments:", res);
        console.log(table)
    })
    initialPrompt();
}

// Delete Department TODO: bonus feature
// function deleteDepartment() {

// }

// View the total budget by department TODO: bonus feature
// function viewBudgetByDept() {
    
// }

// Role Functions

// Get the current list of departments from the database to pass into the addRole prompt
function getDepartments() {
    return new Promise ((resolve, rejects) => {
        connection.query("SELECT name FROM department;", (err, res) => {
            if (err) {
                throw err;
            }
            for (let i = 0; i < res.length; i++) {
                departmentList.push(res[i].name);
            }
            resolve(departmentList);
        });
    });
}

// Add role
async function addRole() {
    await getDepartments();
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
        }
    ]).then(({ title, salary, department }) => {
        connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, (SELECT id FROM department WHERE name = ?));", [title, salary, department], (err, res) => {
            if (err) {
                throw err;
            }
            console.log(`New role successfully added! -- ${title} - ${salary} - ${department}`);
        })
        initialPrompt();
    })
}

// View all roles
function viewRole() {
    connection.query("SELECT role.id, role.title, role.salary, department.name FROM role INNER JOIN department ON role.department_id = department.id ORDER BY role.id;", (err, res) => {
        if (err) {
            throw err;
        }
        const table = consoleTable.getTable("\nAll Roles:", res);
        console.log(table);
    })
    initialPrompt();
}

// Delete role TODO: bonus feature
// function deleteRole() {
    
// }

// Employee Functions

// Get the current list of roles from the database to pass into the addEmployee prompt
function getRoles() {
    return new Promise((resolve, rejects) => {
        connection.query("SELECT title FROM role;", (err, res) => {
            if (err) {
                throw err;
            }
            for (let i = 0; i < res.length; i++) {
                roleList.push(res[i].title);
            }
            resolve(roleList);
        });
    });
}

// Get the current list of employees full names to pass into the updateEmployeeRole prompt
function getEmployeeNames() {
    return new Promise((resolve, rejects) => {
        connection.query("SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employee;", (err, res) => {
            if (err) {
                throw err;
            }
            for (let i = 0; i < res.length; i++) {
                employeeList.push(res[i].name);
            }
            resolve(employeeList);
        });
    });
}

// Get the current list of managers to pass into the addEmployee prompt for future development (TODO: below)
function getManagers() {
    return new Promise((resolve, rejects) => {
        connection.query("SELECT CONCAT(e1.first_name, ' ', e1.last_name) AS name FROM employee e1 INNER JOIN employee e2 ON e2.manager_id = e1.id;", (err, res) => {
            if (err) {
                throw err;
            }
            for (let i = 0; i < res.length; i++) {
                managerList.push(res[i].name);
            }
            resolve(managerList);
        })
    })
}

// Add employee
async function addEmployee() {
    await getRoles();
    await getManagers();
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
        },
        // { TODO: THIS FIELD IN THE TABLE CAN BE NULL, SO HOW DO I ALSO INCLUDE A NULL CHOICE?
        //     name: "manager",
        //     type: "list",
        //     message: "Who is this employee's manager?",
        //     choices: managerList
        // }
    ]).then(({ firstName, lastName, role }) => {
        connection.query("INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, (SELECT id FROM role WHERE title = ?));", [firstName, lastName, role], (err, res) => {
            if (err) {
                throw err;
            }
            console.log(`New employee successfully added! -- ${firstName} ${lastName}: ${role}`)
        })
        initialPrompt();
    })
}

// View all employees
function viewAllEmployees() {
    connection.query("SELECT e.id, CONCAT(e.first_name, ' ', e.last_name) AS name, r.title, d.name AS department, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee e INNER JOIN role r ON e.role_id = r.id INNER JOIN department d ON r.department_id = d.id LEFT JOIN employee m ON m.id = e.manager_id;", (err, res) => {
        if (err) {
            throw err;
        }
        const table = consoleTable.getTable("\nAll Employees:", res);
        console.log(table);
    })
    initialPrompt();
}

// Update employee role
async function updateEmployeeRole() {
    await getEmployeeNames();
    await getRoles();
    inquirer.prompt([
        {
            name: "employee",
            type: "list",
            message: "To update an employee's role, please select the employee:",
            choices: employeeList
        },
        {
            name: "newRole",
            type: "list",
            message: "What is the new role of the employee?",
            choices: roleList
        }
    ]).then(({ employee, newRole }) => {
        connection.query("UPDATE employee SET role_id = (SELECT id FROM role WHERE title = ?) WHERE CONCAT(first_name, ' ', last_name) = ?;", [newRole, employee], (err, res) => {
            if (err) {
                throw err;
            }
            console.log(`${employee}'s role has been updated to ${newRole}.`)
        })
        initialPrompt();
    })
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