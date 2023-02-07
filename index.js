const inquirer = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db/connection");
require("console.table");
const mysql = require("mysql2");

db.connect((err) => {
  if (err) throw err;
  startUp();
});

function startUp() {
  console.log(logo({
    name: "Employee Manager",
    font: "Doom",
    lineChars: 10,
    padding: 2,
    margin: 3,
    borderColor: "grey",
    logoColor: "bold-green",
    textColor: "green",
  }).render());

  loadMainPrompts();
}

function loadMainPrompts() {
  inquirer.prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        "View all employees",
        "Add employee",
        "Update employee's role",
        "View all departments",
        "Add department",
        "View all roles",
        "Add role",
        "Quit",
      ],
    },
  ]).then((val) => {
    switch (val.choice) {
      case "View all employees":
        viewEmployees();
        break;
      case "Add employee":
        addEmployee();
        break;
      case "Update employee's role":
        updateEmployeeRole();
        break;
      case "View all departments":
        viewDepartments();
        break;
      case "Add department":
        addDepartment();
        break;
      case "View all roles":
        viewRoles();
        break;
      case "Add role":
        addRole();
        break;
      default:
        quit();
    }
  });
}

function viewEmployees() {
  db.query(`SELECT * FROM employee`, (err, res) => {
    if (err) throw err;
    console.table(res);
    loadMainPrompts();
  });
}

function viewRoles() {
  db.query(`SELECT * FROM role`, (err, res) => {
    if (err) throw err;
    console.table(res);
    loadMainPrompts();
  });
}

function viewDepartments() {
  db.query(`SELECT * FROM department`, (err, res) => {
    if (err) throw err;
    console.table(res);
    loadMainPrompts();
  });
}

function addDepartment() {
  inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is the name of the department?",
    },
  ]).then((val) => {
    db.query(
      `INSERT INTO department (name) VALUES ('${val.name}')`,
      (err, res) => {
        if (err) throw err;
        console.log(`Added ${val.name} to the database`);
        loadMainPrompts();
      }
    );
  });
}
function addRole() {
  inquirer.prompt([
    { type: "input", name: "title", message: "What is the name of the role?" },
    { type: "input", name: "salary", message: "What is the salary of the role?" },
    { type: "input", name: "department_id", message: "What is the department id of the role?" }
  ]).then((val) => {
    const sql = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`;
    const params = [val.title, val.salary, val.department_id];

    db.query(sql, params, (err, result) => {
      if (err) throw err;
      console.log(`Added ${val.title} to the database`);
      loadMainPrompts();
    });
  });
}


function addEmployee() {
  inquirer.prompt([
    { type: "input", name: "first_name", message: "What is the employee's first name?" },
    { type: "input", name: "last_name", message: "What is the employee's last name?" },
    { type: "input", name: "role_id", message: "What is the employee's role id?" },
    { type: "input", name: "manager_id", message: "What is the employee's manager id?" }
  ]).then(function (val) {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
    const params = [val.first_name, val.last_name, val.role_id, val.manager_id];

    db.query(sql, params, (err, result) => {
      if (err) throw err;
      console.log(`Added ${val.first_name} ${val.last_name} to the database`)
      loadMainPrompts();
    });
  });
}

function updateEmployeeRole() {
  db.query(`SELECT * FROM employee`, (err, res) => {
    if (err) throw err;

    const employees = res.map((employee) => ({
      name: `${employee.first_name} ${employee.last_name}`,
      value: employee.id,
    }));

    inquirer.prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee's role would you like to update?",
        choices: employees,
      },
    ]).then((employeeAnswer) => {
      db.query(`SELECT * FROM role`, (err, res) => {
        if (err) throw err;

        const roles = res.map((role) => ({
          name: role.title,
          value: role.id,
        }));

        inquirer.prompt([
          {
            type: "list",
            name: "roleId",
            message: "Which role would you like to assign the selected employee?",
            choices: roles,
          },
        ]).then((roleAnswer) => {
          db.query(
            `UPDATE employee SET role_id = ${roleAnswer.roleId} WHERE id = ${employeeAnswer.employeeId}`,
            (err, res) => {
              if (err) throw err;
              console.log("Employee role updated successfully!");
              loadMainPrompts();
            }
          );
        });
      });
    });
  });
}







function quit() {
  console.log("Goodbye!");
  process.exit();
};




















// // Import inquirer

// const inquirer = require("inquirer");

// //  import asciiart-logo

// const logo = require("asciiart-logo");



// // import  database module
// const db = require("./db/connection");

// // import SQL connection module
// // const connection = require("./db/connection");

// // Import console table for logging information on screen in table format
// require("console.table");

// // import mysql2 module and crate connection
// const mysql = require("mysql2");
// const { query } = require("./db/connection");

// // const connection = mysql.createConnection({
// //   host: "localhost",

// //   user: "root",
// //   password: "Password123$",
// //   database: "company_db"
// // });

// db.connect(function (err) {
//   if (err) throw err;
//   startUp();
// });

// function startUp() {
//   console.log(logo({
//     name: "Employee Manager",
//     font: "Doom",
//     lineChars: 10,
//     padding: 2,
//     margin: 3,
//     borderColor: "grey",
//     logoColor: "bold-green",
//     textColor: "green",
//   }).render());

//   loadMainPrompts();
// }

// function loadMainPrompts() {
//   inquirer.prompt([
//     {

//       type: "list",
//       name: "choice",
//       message: "What would you like to do?",
//       choices: ["View all employees", "Add employee", "Update employee's role", "View all departments", "Add department", "View all roles", "Add role", "Quit"]

//     }

//   ]).then(function (val) {
//     switch (val.choice) {
//       case "View all employees":
//         viewEmployees();
//         break;
//       case "Add employee":
//         addEmployee();
//         break;
//       case "Update employee's role":
//         updateEmployeeRole();
//         break;
//       case "View all departments":
//         viewDepartments();
//         break;
//       case "Add department":
//         addDepartment();
//         break;
//       case "View all roles":
//         viewRoles();
//         break;
//       case "Add role":
//         addRole();
//         break;
//       default:
//         quit();
//     }
//   });

// }

// function viewEmployees() {
//   db.query(`SELECT * FROM employee`, (err, res) => {
//     if (err) throw err;
//     console.table(res);
//     loadMainPrompts();
//   })
//   // .then(([rows]) => {
//   //   let employees = rows;
//   //   console.log("\n");
//   //   console.table(employees);
//   // })
//   // .then(() => loadMainPrompts());
// }

// function viewRoles() {
//   db.query(`SELECT * FROM roles`,)
//     .then(([rows]) => {
//       let roles = rows;
//       console.log("\n");
//       console.table(roles);
//     })

//     .then(() => loadMainPrompts());
// }

// function viewDepartments() {
//   db.query(`SELECT * FROM department`,)

//     .then(([rows]) => {
//       let departments = rows;
//       console.log("\n");
//       console.table(departments);
//     })

//     .then(() => loadMainPrompts());
// }

// function addDepartment() {
//   inquirer.prompt([
//     { type: "input", name: "name", message: "What is the name of the department?" }
//   ]).then(function (val) {
//     db.query(val.name)
//       .then(() => console.log(`Added ${val.name} to the database`))
//       .then(() => loadMainPrompts());
//   });
// }

// function addRole() {
//   inquirer.prompt([
//     { type: "input", name: "title", message: "What is the name of the role?" },
//     { type: "input", name: "salary", message: "What is the salary of the role?" },
//     { type: "input", name: "department_id", message: "What is the department id of the role?" }
//   ]).then(function (val) {
//     db.query(val.title, val.salary, val.department_id)
//       .then(() => console.log(`Added ${val.title} to the database`))
//       .then(() => loadMainPrompts());
//   });
// }

// function addEmployee() {
//   inquirer.prompt([
//     { type: "input", name: "first_name", message: "What is the employee's first name?" },
//     { type: "input", name: "last_name", message: "What is the employee's last name?" },
//     { type: "input", name: "role_id", message: "What is the employee's role id?" },
//     { type: "input", name: "manager_id", message: "What is the employee's manager id?" }
//   ]).then(function (val) {
//     const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
//     const params = [val.first_name, val.last_name, val.role_id, val.manager_id];

//     db.query(sql, params, (err, result) => {
//       if (err) throw err;
//       console.log(`Added ${val.first_name} ${val.last_name} to the database`)
//       loadMainPrompts();
//     });
//   });
// }





// function updateEmployeeRole() {
//   inquirer.prompt([
//     {
//       type: "list",
//       name: "employeeId",
//       message: "Which employee's role do you want to update?",
//       choices: employeeChoices
//     },
//     {
//       type: "list",
//       name: "roleId",
//       message: "Which role do you want to assign the selected employee?",
//       choices: roleChoices
//     }

//   ]).then(function (val) {
//     const employeeId = val.employeeId;
//     const roleId = val.roleId;

//     const sql = `UPDATE employee SET role_id = ? WHERE id = ?`
//     const params = [roleId, employeeId];
//     db.query(sql, params)
//     if (err) throw err;
//     console.log(`Updated employee's role`)
//   });
// }


// // .then(([rows]) => {
// //   let employees = rows;
// //   const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
// //     name: `${first_name} ${last_name}`,
// //     value: id
// //   }));

// const { employeeId } = inquirer.prompt([
//   {
//     type: "list",
//     name: "employeeId",
//     message: "Which employee's role do you want to update?",
//     choices: employeeChoices
//   }
// ]).then(function (val) {
//   const employeeId = val.employeeId;
//   db.findAllRoles()

//     .then(([rows]) => {
//       let roles = rows;
//       const roleChoices = roles.map(({ id, title }) => ({
//         name: title,
//         value: id
//       }));

//       const { roleId } = inquirer.prompt([
//         {
//           type: "list",
//           name: "roleId",
//           message: "Which role do you want to assign the selected employee?",
//           choices: roleChoices
//         }
//       ]).then(function (val) {
//         db.updateEmployeeRole(employeeId, val.roleId);
//       });
//     });
// });

// function quit() {
//   console.log("Goodbye!");
//   process.exit();
// };


