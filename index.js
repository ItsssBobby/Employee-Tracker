// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');
require('console.table');
// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'Bobbymac123',
    database: 'employee_db'
  },
);

db.connect(function(err) {
    if (err) throw err;
    console.log("connected to the employee db")
    mainMenu();
  });
  
  //Main menu prompt
  function mainMenu() {
    inquirer
      .prompt({
        type: "list",
        choices: [
          "Add department",
          "Add role",
          "Add employee",
          "View departments",
          "View roles",
          "View employees",
          "Update employee role",
          "Quit"
        ],
        message: "What would you like to do?",
        name: "option"
      })
      .then(function(result) {
        console.log("You entered: " + result.option);
  
        switch (result.option) {
          case "Add department":
            addDepartment();
            break;
          case "Add role":
            addRole();
            break;
          case "Add employee":
            addEmployee();
            break;
          case "View departments":
            viewDepartment();
            break;
          case "View roles":
            viewRoles();
            break;
          case "View employees":
            viewEmployees();
            break;
          case "Update employee role":
            updateEmployee();
            break;
          default:
            quit();
        }
      });
  }

  function viewDepartment() {
    // select from the db
    let query = "SELECT * FROM department";
    db.query(query, function(err, res) {
      if (err) throw err;
      console.table(res);
      mainMenu();
    });
  }
  
  function viewRoles() {
    // select from the db
    let query = "SELECT * FROM role";
    db.query(query, function(err, res) {
      if (err) throw err;
      console.table(res);
      mainMenu();
    });
  }
  
  function viewEmployees() {
    // select from the db
    let query = "SELECT * FROM employee";
    db.query(query, function(err, res) {
      if (err) throw err;
      console.table(res);
      mainMenu();
    });
  }