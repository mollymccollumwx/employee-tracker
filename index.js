const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");
const clear = require("clear");

const connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "charlie22",
  database: "employee_db",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  console.log(`
  ____ ____ ____ ____ ____ ____ ____ ____ 
  ||E |||m |||p |||l |||o |||y |||e |||e ||
  ||__|||__|||__|||__|||__|||__|||__|||__||
  |/__\|/__\|/__\|/__\|/__\|/__\|/__\|/__\|
   ____ ____ ____ ____ ____ ____ ____      
  ||T |||r |||a |||c |||k |||e |||r ||     
  ||__|||__|||__|||__|||__|||__|||__||     
  |/__\|/__\|/__\|/__\|/__\|/__\|/__\|     
  
  `);
  init();
});

// REQUIRED

// Add departments, roles, employees

// View departments, roles, employees

// Update employee roles

// BONUS

// * Update employee managers

// * View employees by manager

// * Delete departments, roles, and employees

// * View the total utilized budget of a department -- ie the combined salaries of all employees in that department

//view a table of all employees and their information
const viewEmployees = () => {
  const queryString = `SELECT e.id, CONCAT(e.first_name, " ", e.last_name) as Employee, r.title as Role, d.name AS Department, CONCAT(m.first_name, " ", m.last_name) as Manager
  FROM employee e
  INNER JOIN role r ON r.id = e.role_id
  LEFT JOIN department d ON d.id = r.department_id
  LEFT JOIN employee m ON e.manager_id = m.id;`;
  connection.query(queryString, (err, data) => {
    if (err) throw err;
    console.table(data);
    init();
  });
};

const viewEmployeesByDepartment = () => {
  const queryString = `SELECT e.id, CONCAT(e.first_name, " ", e.last_name) as Employee, r.title 
    FROM employee e 
    LEFT JOIN role r on e.role_id = r.id 
    LEFT JOIN department d on r.department_id = d.id 
    WHERE d.id = 1;`;
  connection.query(queryString, (err, data) => {
    if (err) throw err;
    console.table(data);
    init();
  });
};

//view all the department
const viewDepartments = () => {
    const queryString = `SELECT name FROM department`;
    connection.query(queryString, (err, data) => {
        if (err) throw err;
        console.table(data);
        init();
    })
}

const updateEmployeeRole = () => {
  const queryEmployee = `SELECT * FROM employee`;
  connection.query(queryEmployee, (err, data) => {
    if (err) throw err;
    const employees = data.map((employee) => {
      return {
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id,
      };
    });
    const queryRole = `SELECT * FROM role`;
    connection.query(queryRole, (err, data) => {
      if (err) throw err;
      const roles = data.map((role) => {
        return {
          name: role.title,
          value: role.id,
        };
      });
      inquirer
        .prompt([
          {
            type: "list",
            message: "Which employee do you want to update?",
            name: "employee",
            choices: employees,
          },
          {
            type: "list",
            message: "What do you want the employee's role to be?",
            name: "role",
            choices: roles,
          },
        ])
        .then(({ employee, role }) => {
          const queryString = `UPDATE employee SET role_id = ? WHERE id = ?`;
          connection.query(queryString, [role, employee], (err, data) => {
            if (err) throw err;
            init();
          });
        });
    });
  });
};

const addEmployee = () => {
    inquirer.prompt([
        {
            type: "input", 
            message: "What is the new employee's first name?",
            name: "first_name",
        }, 
        {
            type: "input", 
            message: "What is the new employee's last name?",
            name: "last_name",  
        },
        {
            
        }
    ])
    console.log("Employee has been added!");
}


//starts the prompt and provides switch cases to call functions based on the user selection
const init = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "View All Employees By Department",
          "View All Roles",
          "View All Departments",
          "Update Employee Role",
          "Add Employee",
          "Quit Employee Tracker",
        ],
        name: "userChoice",
      },
    ])
    .then(({ userChoice }) => {
      switch (userChoice) {
        case "View All Employees":
          viewEmployees();
          break;

        case "View All Employees By Department":
          viewEmployeesByDepartment();
          break;

        case "View All Roles":
          viewRoles();
          break;

        case "View All Departments":
          viewDepartments();
          break;

        case "Update Employee Role":
          updateEmployeeRole();
          break;

        case "Add Employee":
          addEmployee();
          break;

        default:
          end();
      }
    });
};

//ends connection to server
const end = () => {
  console.log("Thanks for using Employee Tracker!");
  connection.end();
};
