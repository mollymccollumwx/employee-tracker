SELECT * FROM employee;

SELECT * FROM department;

SELECT * FROM role;

-- shows all employees with department, role, and manager information
SELECT e.id, CONCAT(e.first_name, " ", e.last_name) as Employee, r.title as Role, d.name AS Department, CONCAT(m.first_name, " ", m.last_name) as Manager
FROM employee e
INNER JOIN role r ON r.id = e.role_id
LEFT JOIN department d ON d.id = r.department_id
LEFT JOIN employee m ON e.manager_id = m.id;

-- shows employee by deparment (hardcoded for now)
SELECT e.id, CONCAT(e.first_name, " ", e.last_name) as Employee, r.title 
FROM employee e 
LEFT JOIN role r on e.role_id = r.id 
LEFT JOIN department d on r.department_id = d.id 
WHERE d.id = 1;

-- update employee role
UPDATE employee SET role_id = ? WHERE id = ?;

-- view departments
SELECT name AS Departments FROM department;

-- view roles
SELECT title AS Roles FROM role;

-- adding a department
INSERT INTO department (name) VALUE (?);

-- adding a role
INSERT INTO role (title, salary, department_id) VALUE (?, ?, ?);

-- adding a employee
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE (?, ?, ?, ?);


