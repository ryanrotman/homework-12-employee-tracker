// // Load Requirements
// const inquirer = require("inquirer");
// const consoleTable = require("console.table");
// const userPrompt = require("./initialPrompt");
// const connection = require("../app");

// let roleList = [];
// let employeeList = [];
// // let managerList = [];

// // Employee Functions

// // Get the current list of roles from the database to pass into the addEmployee prompt
// function getRoles() {
//     return new Promise((resolve, rejects) => {
//         connection.query("SELECT title FROM role;", (err, res) => {
//             if (err) {
//                 throw err;
//             }
//             for (let i = 0; i < res.length; i++) {
//                 roleList.push(res[i].title);
//             }
//             resolve(roleList);
//         });
//     });
// }

// // Get the current list of employees full names to pass into the updateEmployeeRole prompt
// function getEmployeeNames() {
//     return new Promise((resolve, rejects) => {
//         connection.query("SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employee;", (err, res) => {
//             if (err) {
//                 throw err;
//             }
//             for (let i = 0; i < res.length; i++) {
//                 employeeList.push(res[i].name);
//             }
//             resolve(employeeList);
//         });
//     });
// }

// // Get the current list of managers to pass into the addEmployee prompt for future development (TODO: below)
// // function getManagers() {
// //     return new Promise((resolve, rejects) => {
// //         connection.query("SELECT CONCAT(e1.first_name, ' ', e1.last_name) AS name FROM employee e1 INNER JOIN employee e2 ON e2.manager_id = e1.id;", (err, res) => {
// //             if (err) {
// //                 throw err;
// //             }
// //             for (let i = 0; i < res.length; i++) {
// //                 managerList.push(res[i].name);
// //             }
// //             resolve(managerList);
// //         })
// //     })
// // }

// // Add employee
// async function addEmployee() {
//     await getRoles();
//     // await getManagers();
//     inquirer.prompt([
//         {
//             name: "firstName",
//             type: "input",
//             message: "What is the new employee's first name?"
//         },
//         {
//             name: "lastName",
//             type: "input",
//             message: "What is the new employee's last name?"
//         },
//         {
//             name: "role",
//             type: "list",
//             message: "What is the employee's role?",
//             choices: roleList
//         },
//         // { TODO: THIS FIELD IN THE TABLE CAN BE NULL, SO HOW DO I ALSO INCLUDE A NULL CHOICE?
//         //     name: "manager",
//         //     type: "list",
//         //     message: "Who is this employee's manager?",
//         //     choices: managerList
//         // }
//     ]).then(({ firstName, lastName, role }) => {
//         connection.query("INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, (SELECT id FROM role WHERE title = ?));", [firstName, lastName, role], (err, res) => {
//             if (err) {
//                 throw err;
//             }
//             console.log(`New employee successfully added! -- ${firstName} ${lastName}: ${role}`)
//         })
//         userPrompt.begin();
//     })
// }

// // View all employees
// function viewAllEmployees() {
//     connection.query("SELECT e.id, CONCAT(e.first_name, ' ', e.last_name) AS name, r.title, d.name AS department, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee e INNER JOIN role r ON e.role_id = r.id INNER JOIN department d ON r.department_id = d.id LEFT JOIN employee m ON m.id = e.manager_id;", (err, res) => {
//         if (err) {
//             throw err;
//         }
//         const table = consoleTable.getTable("\nAll Employees:", res);
//         console.log(table);
//     })
//     userPrompt.begin();
// }

// // Update employee role
// async function updateEmployeeRole() {
//     await getEmployeeNames();
//     await getRoles();
//     inquirer.prompt([
//         {
//             name: "employee",
//             type: "list",
//             message: "To update an employee's role, please select the employee:",
//             choices: employeeList
//         },
//         {
//             name: "newRole",
//             type: "list",
//             message: "What is the new role of the employee?",
//             choices: roleList
//         }
//     ]).then(({ employee, newRole }) => {
//         connection.query("UPDATE employee SET role_id = (SELECT id FROM role WHERE title = ?) WHERE CONCAT(first_name, ' ', last_name) = ?;", [newRole, employee], (err, res) => {
//             if (err) {
//                 throw err;
//             }
//             console.log(`${employee}'s role has been updated to ${newRole}.`)
//         })
//         userPrompt.begin();
//     })
// }

// // Update employee manager TODO:
// // Query: UPDATE employee SET manager_id = (SELECT * FROM(SELECT id FROM employee WHERE first_name = "NAME OF MANAGER")tblTmp) WHERE id = NUMBER OF EMPLOYEE UPDATING;
// // function updateEmployeeManager() {

// // }

// // View employees by manager TODO:
// // function viewEmployeesByManager() {

// // }

// // Delete Employee TODO:
// // function deleteEmployee() {
    
// // }

// module.exports = {
//     add: addEmployee,
//     view: viewAllEmployees,
//     updateRole: updateEmployeeRole,
//     // updateMang: updateEmployeeManager,
//     // viewByMang: viewEmployeesByManager,
//     // delete: deleteEmployee,
// }