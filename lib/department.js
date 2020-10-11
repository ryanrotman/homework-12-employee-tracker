// Load dependencies

const { createConnection } = require("net");


// Department Functions

// Add department FIXME:
function addDepartment() {
    inquirer.prompt([
        {
            name: "deptName",
            type: "input",
            message: "What is the name of the new department?"
        }
    ]).then(({ deptName }) => {
        const query = `INSERT INTO department (name) VALUES (${deptName})`;
        connection.query(query, (err, res) => {
            if (err) {
                throw err;
            }
            console.log("Department successfully added!")
        })
        initialPrompt();
    })
}

// View employees by department FIXME:
function viewEmployeesByDept() {

}

// Delete Department TODO:
function deleteDepartment() {

}

// View the total budget by department TODO:
function viewBudgetByDept() {
    
}