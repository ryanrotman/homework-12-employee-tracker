// Load Requirements
const inquirer = require("inquirer");
const connection = require("../app.js")

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
                "Update employee manager",
                "View employees by manager",
                "Delete department",
                "Delete role",
                "Delete employee",
                "View the total budget of a department",
                "Exit"
            ]
        }
    ]).then(onInitialPromptAnswer);
}

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

        case "Update employee manager":
            updateEmployeeManager();
            break;

        case "View employees by manager":
            viewEmployeesByManager();
            break;

        case "Delete department":
            deleteDepartment();
            break;

        case "Delete role":
            deleteRole();
            break;

        case "Delete employee":
            deleteEmployee();
            break;

        case "View the total budget of a department":
            viewBudgetByDept();
            break;

        case "Exit":
            default:
                console.log("Thank you and goodbye.");
                connection.end();
    }
}

module.exports = promptUser;