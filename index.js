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
          // "View salary totals",
          "Update employee role",
          "Exit"
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
          // case "View salary totals":
          //   viewSalaries();
          //   break;
          case "Update employee role":
            updateEmployee();
            break;
         case 'Exit':
            console.log('Have a good day!')
            process.exit();
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

// function viewSalaries() {

//   let query = 'SELECT role_id, SUM(salary) FROM employee GROUP BY department';
//   db.query(query, function(err, res) {
//     if (err) throw err;
//     console.table(res)
//     mainMenu();
//   });
// }

function addDepartment() {

    inquirer.prompt({
      
        type: "input",
        message: "What is the name of the department you want to add?",
        name: "deptName"

    }).then(answer => {
        db.query("INSERT INTO department (dept_name) VALUES (?)", [answer.deptName] , function(err, res) {
            if (err) throw err;
            db.query('SELECT * FROM department', (err, res) => {
                if (err) throw err;
                console.table(res);
                mainMenu();
            // console.table(res)
            // mainMenu()
            })
        })
    })
}

function addEmployee() {
  db.query('SELECT * FROM employee', (err, employeeRes) => {
      if (err) throw err;
      employeeRes = employeeRes.map((employee) => {
          return {
              name: `${employee.first_name} ${employee.last_name}`,
              value: employee.id
          }
      })
  db.query('SELECT * FROM role', (err, roleRes) => {
      if (err) throw err;
      roleRes = roleRes.map((role) => {
          return {
              name: role.title,
              value: role.id
          };
      })
  inquirer
      .prompt([
          {
              type: 'input',
              name: 'FirstName',
              message: "What is the employee's first name?"
          },
          {
              type: 'input',
              name: 'LastName',
              message: "What is the employee's last name?"
          },
          {
              type: 'list',
              name: 'Role',
              message: "What is the role of the new employee?",
              choices: roleRes
          },
          {
              type: 'list',
              name: 'Manager',
              message: "Who is the employee's manager?",
              choices: employeeRes
          }
      ]).then((answer) => {
              db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [answer.FirstName, answer.LastName, answer.Role, answer.Manager], (err, res) => {
                  if (err) throw err;
                  console.log('Employee added!')
                  mainMenu();
              });
          });
      });
})};

function addRole() {
  db.query('SELECT * FROM department', (err, deptRes) => {
    if (err) throw err;
    deptRes = deptRes.map((department) => {
        return {
            name: `${department.dept_name}`,
            value: department.id
        };
    })
  inquirer
    .prompt([
      {
        type: "input",
        message: "What's the name of the role?",
        name: "roleName"
      },
      {
        type: "input",
        message: "What is the salary for this role?",
        name: "salaryTotal"
      },
      {
        type: "list",
        message: "What department is the role for?",
        name: "dept",
        choices: deptRes
      }
    ])
    .then((answer) => {


      db.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answer.roleName, answer.salaryTotal, answer.dept], function(err, res) {
        if (err) throw err;
        console.log('Role added!')
        viewRoles();
        mainMenu();
      });
    });
  });
}

function updateEmployee() {
  db.query('SELECT * FROM employee', (err, employeeRes) => {
    if (err) throw err;
    employeeRes = employeeRes.map((employee) => {
        return {
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id
        }
    })
db.query('SELECT * FROM role', (err, roleRes) => {
    if (err) throw err;
    roleRes = roleRes.map((role) => {
        return {
            name: role.title,
            value: role.id
        };
    })
  inquirer
    .prompt([
      {
        type: "list",
        message: "Which employee would you like to update?",
        name: "updateEmp",
        choices: employeeRes
      },

      {
        type: "list",
        message: "What do you want to update to?",
        name: "updateRole",
        choices: roleRes
      }
    ])
    .then ((answer) => {
        db.query(`UPDATE employee SET role_id = ${answer.updateRole} WHERE id = ${answer.updateEmp}`)
        console.log('Updated!')
        mainMenu();
      });
    });
})}
