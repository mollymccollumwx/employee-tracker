DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE employee (
	id INTEGER AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER,
    PRIMARY KEY (id)
);

CREATE TABLE department (
	id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
	id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    department_id INTEGER NOT NULL
); 

SELECT * FROM employee;

SELECT * FROM department;

SELECT * FROM role;

INSERT INTO department(name)
VALUES ("Sales"), ("Engineering"), ("Finance"), ("Legal");

INSERT INTO role(title, salary, department_id)
VALUES ("Lead Engineer", 150000, 2), 
		("Software Engineer", 120000, 2), 
		("Sales Lead", 100000, 1),
		("Salesperson", 80000, 1), 
		("Accountant", 125000, 3),
        ("Accountant Manager", 150000, 3),
        ("Legal Team Lead", 250000, 4),
        ("Lawyer", 190000, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Ryan", "Howard", 1, null),
		("Kelly", "Kapoor", 2, 1),
        ("Michael", "Scott", 3, null),
        ("Jim", "Halpert", 4, 3),
        ("Kevin", "Malone", 5, 6),
        ("Angela", "Martin", 6, null),
        ("Creed", "Bratton", 7, null),
        ("Toby", "Flenderson", 8, 7);