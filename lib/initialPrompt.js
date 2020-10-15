// // Load Requirements
// const inquirer = require("inquirer");
// const connection = require("../app.js")
// const department = require("./department");
// const role = require("./role");
// const employee = require("./employee");

// function initialPrompt() {
//     return inquirer.prompt([
//         {
//             name: "action",
//             type: "rawlist",
//             message: "What would you like to do?",
//             choices: [
//                 "Add department",
//                 "Add role",
//                 "Add employee",
//                 "View all departments",
//                 "View all roles",
//                 "View all employees",
//                 "Update employee role",
//                 // "Update employee manager",
//                 // "View employees by manager",
//                 // "Delete department",
//                 // "Delete role",
//                 // "Delete employee",
//                 // "View the total budget of a department",
//                 "Exit"
//             ]
//         }
//     ]).then(onInitialPromptAnswer);
// }

// function onInitialPromptAnswer({ action }) {
//     switch (action) {
//         case "Add department":
//             department.add();
//             break;

//         case "Add role":
//             role.add();
//             break;

//         case "Add employee":
//             employee.add();
//             break;

//         case "View all departments":
//             department.view();
//             break;

//         case "View all roles":
//             role.view();
//             break;

//         case "View all employees":
//             employee.view();
//             break;

//         case "Update employee role":
//             employee.updateRole();
//             break;

//         // case "Update employee manager":
//         //     employee.updateMang();
//         //     break;

//         // case "View employees by manager":
//         //     employee.viewByMang();
//         //     break;

//         // case "Delete department":
//         //     department.delete();
//         //     break;

//         // case "Delete role":
//         //     role.delete();
//         //     break;

//         // case "Delete employee":
//         //     employee.delete();
//         //     break;

//         // case "View the total budget of a department":
//         //     department.viewBudget();
//         //     break;

//         case "Exit":
//             default:
//                 console.log("Thank you and goodbye.");
//                 connection.end();
//     }
// }

// module.exports = {
//     begin: initialPrompt,
//     answers: onInitialPromptAnswer
// }