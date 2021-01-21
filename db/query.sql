SELECT * FROM employee;

SELECT * FROM department;

SELECT * FROM role;

-- shows all employees with department, role, and manager information
SELECT e.id, CONCAT(e.first_name, " ", e.last_name) as Employee, r.title as Role, d.name AS Department, CONCAT(m.first_name, " ", m.last_name) as Manager
FROM employee e
INNER JOIN role r ON r.id = e.role_id
LEFT JOIN department d ON d.id = r.department_id
LEFT JOIN employee m ON e.manager_id = m.id;

-- shows employee by department
SELECT employee.id, employee.first_name, employee.last_name, role.title 
FROM employee 
LEFT JOIN role on employee.role_id = role.id 
LEFT JOIN department department on role.department_id = department.id 
WHERE department.id = 1;

