const inquirer = require("inquirer");
const mysql = require("mysql");
const { endianness } = require("os");
const { inherits } = require("util");

const connection = mysql.createConnection({
    host: "localhost",
  
    port: 3306,
  
    user: "root",
  
    password: "charlie22",
    database: "employee_db"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    viewEmployees();
  });

const init = () => {

}

const viewEmployees = () => {
    const queryString = `SELECT * FROM employee`;
    connection.query(queryString, (err, data) => {
        if (err) throw err;
        console.table(data);
    })
}
//ends connection to server
const exit = () => {
    connection.end();
}

