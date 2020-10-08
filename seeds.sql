DROP DATABASE IF EXISTS emp_trackerDB;

CREATE DATABASE emp_trackerDB;

USE emp_trackerDB;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);

INSERT INTO department
    (name)
VALUES
    ("Education"),
    ("Events"),
    ("Marketing"),
    ("Research")

INSERT INTO role
    (title, salary, department_id)
VALUES
    ("Education Director", 80,000.00, (SELECT id FROM department WHERE name = "Education")),
    ("Events Director", 80,000.00, (SELECT id FROM department WHERE name = "Events")),
    ("Marketing Director", 80,000.00, (SELECT id FROM department WHERE name = "Marketing")),
    ("Research Director", 80,000.00, (SELECT id FROM department WHERE name = "Research")),
    ("Education Manager", 70,000.00, (SELECT id FROM department WHERE name = "Education")),
    ("Events Manager", 70,000.00, (SELECT id FROM department WHERE name = "Events")),
    ("Marketing Manager", 70,000.00, (SELECT id FROM department WHERE name = "Marketing")),
    ("Research Manager", 70,000.00, (SELECT id FROM department WHERE name = "Research")),
    ("Education Coordinator", 50,000.00, (SELECT id FROM department WHERE name = "Education")),
    ("Events Coordinator", 50,000.00, (SELECT id FROM department WHERE name = "Events")),
    ("Marketing Coordinator", 50,000.00, (SELECT id FROM department WHERE name = "Marketing")),
    ("Research Coordinator", 50,000.00, (SELECT id FROM department WHERE name = "Research")),

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Dorit", "Lessard", (SELECT id FROM role WHERE title = "Education Director")),
    ("Ben", "Helt", (SELECT id FROM role WHERE title = "Education Manager"), (SELECT id FROM employee WHERE first_name = "Dorit")),
    ("Peter", "Giuliano", (SELECT id FROM role WHERE title = "Research Director"))