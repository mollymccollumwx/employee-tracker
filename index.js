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

//view all the departments
const viewDepartments = () => {
  const queryString = `SELECT name AS Departments FROM department`;
  connection.query(queryString, (err, data) => {
    if (err) throw err;
    console.table(data);
    init();
  });
};

//view all the roles
const viewRoles = () => {
  const queryString = `SELECT title AS Roles FROM role`;
  connection.query(queryString, (err, data) => {
    if (err) throw err;
    console.table(data);
    init();
  });
};

// update an employee's role
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
            clear();
            init();
          });
        });
    });
  });
};

// adding an employee
const addEmployee = () => {
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
            type: "list",
            message: "What is the new employee's role?",
            name: "role",
            choices: roles,
          },
          {
            type: "list",
            message: "Who is the new employee's manager?",
            name: "manager",
            choices: employees,
          },
        ])
        .then(({ first_name, last_name, role, manager }) => {
          const queryString = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE (?, ?, ?, ?)`;
          connection.query(
            queryString,
            [first_name, last_name, role, manager],
            (err, data) => {
              if (err) throw err;
              clear();
              init();
            }
          );
        });
    });
  });
};

//adding a role
const addRole = () => {
    const queryDepartment = `SELECT * FROM department`;
    connection.query(queryDepartment, (err, data) => {
      if (err) throw err;
      const departments = data.map((department) => {
        return {
          name: department.name,
          value: department.id,
        };
      });
      const queryRole = `SELECT * FROM role`;
      connection.query(queryRole, (err, data) => {
        if (err) throw err;
        inquirer
          .prompt([
            {
              type: "input",
              message: "What is the title of the new role?",
              name: "title",
            },
            {
                type: "input",
                message: "What is the salary of the new role?",
                name: "salary",
              },
            {
              type: "list",
              message: "What department is the new role in?",
              name: "department",
              choices: departments,
            },
          ])
          .then(({ title, salary, department }) => {
            const queryString = `INSERT INTO role (title, salary, department_id) VALUE (?, ?, ?)`;
            connection.query(
              queryString,
              [title, salary, department],
              (err, data) => {
                if (err) throw err;
                clear();
                init();
              }
            );
          });
      });
    });
  };

// adding a department
  const addDepartment = () => {
    const queryDepartment = `SELECT * FROM department`;
    connection.query(queryDepartment, (err, data) => {
      if (err) throw err;
        inquirer
          .prompt([
            {
              type: "input",
              message: "What is the name of the new department?",
              name: "department",
            }, 
          ])
          .then(({ department }) => {
            const queryString = `INSERT INTO department (name) VALUE (?)`;
            connection.query(
              queryString,
              [department],
              (err, data) => {
                if (err) throw err;
                clear();
                init();
              }
            );
          });
      
    });
  };

//starts the prompt and provides switch cases to call functions based on the user selection
const init = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "View All Roles",
          "View All Departments",
          "Update Employee Role",
          "Add Employee",
          "Add Role",
          "Add Department",
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

        case "Add Role":
          addRole();
          break;

        case "Add Department":
          addDepartment();
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
