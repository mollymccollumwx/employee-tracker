const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");

const connection = mysql.createConnection({
    host: "localhost",
  
    port: 3306,
  
    user: "root",
  
    password: "charlie22",
    database: "employee_db"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    //ascii art console.log
    init();
  });



const viewEmployees = () => {
    const queryString = `SELECT * FROM employee`;
    connection.query(queryString, (err, data) => {
        if (err) throw err;
        console.table(data);
        init();
    })
}

const init = () => {
    inquirer.prompt([
        {
        type: "list",
        message: "What would you like to do?",
        choices: ["View All Employees", "Quit Employee Tracker"],
        name: "userChoice"
        }
        
    ]).then(({ userChoice }) => {
        switch(userChoice) {
            case "View All Employees":
            viewEmployees();
            break;

            default:
            end();
        }
        
    })

}

//ends connection to server
const end = () => {
    console.log("Thanks for using Employee Tracker!");
    connection.end();
}

