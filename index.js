const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");

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
  //ascii art console.log
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
}

//starts the prompt and provides switch cases to call functions based on user input
const init = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        choices: ["View All Employees", "View All Employees By Department", "Quit Employee Tracker"],
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
