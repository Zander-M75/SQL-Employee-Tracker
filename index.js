


// Import inquirer

const inquirer = require("inquirer");

//  import asciiart-logo

const logo = require("asciiart-logo");



// import  database module
const db = require("./db");

// import SQL connection module
const connection = require("./db/connection");

// Import console table for logging information on screen in table format
require("console.table");

// import mysql2 module and crate connection
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",

  user: "root",
  password: "Password123$",
  database: "company_db"
});

connection.connect(function (err) {
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
      choices: ["View all employees", "Add employee", "Update employee's role", "View all departments", "Add department", "View all roles", "Add role", "Quit"]

    }

  ]).then(function (val) {
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
  db.findAllEmployees()
    .then(([rows]) => {
      let employees = rows;
      console.log("\n");
      console.table(employees);
    })
    .then(() => loadMainPrompts());
}

function viewRoles() {
  db.findAllRoles()
    .then(([rows]) => {
      let roles = rows;
      console.log("\n");
      console.table(roles);
    })

    .then(() => loadMainPrompts());
}

function viewDepartments() {
  db.findAllDepartments()

    .then(([rows]) => {
      let departments = rows;
      console.log("\n");
      console.table(departments);
    })

    .then(() => loadMainPrompts());
}

function addDepartment() {
  inquirer.prompt([
    { type: "input", name: "name", message: "What is the name of the department?" }
  ]).then(function (val) {
    db.createDepartment(val.name)
      .then(() => console.log(`Added ${val.name} to the database`))
      .then(() => loadMainPrompts());
  });
}

function addRole() {
  inquirer.prompt([
    { type: "input", name: "title", message: "What is the name of the role?" },
    { type: "input", name: "salary", message: "What is the salary of the role?" },
    { type: "input", name: "department_id", message: "What is the department id of the role?" }
  ]).then(function (val) {
    db.createRole(val.title, val.salary, val.department_id)
      .then(() => console.log(`Added ${val.title} to the database`))
      .then(() => loadMainPrompts());
  });
}

function addEmployee() {
  inquirer.prompt([
    { type: "input", name: "first_name", message: "What is the employee's first name?" },
    { type: "input", name: "last_name", message: "What is the employee's last name?" },
    { type: "input", name: "role_id", message: "What is the employee's role id?" },
    { type: "input", name: "manager_id", message: "What is the employee's manager id?" }
  ]).then(function (val) {
    db.createEmployee(val.first_name, val.last_name, val.role_id, val.manager_id)
      .then(() => console.log(`Added ${val.first_name} ${val.last_name} to the database`))
      .then(() => loadMainPrompts());
  });
}

function updateEmployeeRole() {
  db.findAllEmployees()
    .then(([rows]) => {
      let employees = rows;
      const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
      }));

      const { employeeId } = inquirer.prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Which employee's role do you want to update?",
          choices: employeeChoices
        }
      ]).then(function (val) {
        const employeeId = val.employeeId;
        db.findAllRoles()

          .then(([rows]) => {
            let roles = rows;
            const roleChoices = roles.map(({ id, title }) => ({
              name: title,
              value: id
            }));

            const { roleId } = inquirer.prompt([
              {
                type: "list",
                name: "roleId",
                message: "Which role do you want to assign the selected employee?",
                choices: roleChoices
              }
            ]).then(function (val) {
              db.updateEmployeeRole(employeeId, val.roleId);
            });
          });
      });
    });

}

function quit() {
  console.log("Goodbye!");
  process.exit();
}

// Call the function to start the application

loadMainPrompts();



// Call startup function

// function: start up
//    optional: display logo text using asciiart-logo
//    call function to the main prompt for questions


// function - main prompt for questions
// - Prompt with the list of choices
// - In .then callback, check user's response with the switch-case statement.
//    call the appropriate function depending on what the user chose
//      - in case of view employees, call the view employees function
//      - in case of add employee, call the add employee function
//      - in case of update employee's role, call the update employee role function
//      - in case of view departments, call the view departments function
//      - in case of add department, call the add department function
//      - in case of view roles, call the view roles function
//      - in case of add role, call the add role function
//      - in default, call function to quit
//
// OPTIONAL:
//      - in case of update employee's manager, call the update employee manager function
//      - in case of view employees by manager, call the view employees by manager function
//      - in case of view employees by department, call the view employees by department function
//      - in case of view utilized budget by department, call the function to view utilized budget by department
//      - in case of remove department, call the remove department function
//      - in case of remove role, call the remove role function
//      - in case of remve employee, call the remove employee function
//      - in default, call function to quit

// function - View all employees
  // 1. call find all employees method on database object
  //    in .then callback, display returned data with console table method
  // 2. call function to load main prompt for questions
  //

// function - View all roles
// 1. call find all roles method on database object
//    in .then callback, dispalay returned data with console table
// 2. call function to load main prompt for questons
//

// function - View all deparments
//  1. call find all departments method on database object
//      in .then call back, display returned data with console table
//  2. call function to load main prompt for questions
//

// Add a department
//  1. prompt user for the name of the department
//      in .then callback, call create department method on database object, passing the returned data as input argument
//  2. call function to load main prompt for questions
//

// functon - Add a role
//  **prompt for user to enter the role, the salary, and what department the role belongs to
//  1. call find all departments method on database connection to get array of existing department records
//      in .then call back, create array of objects with names and ids from returned data with .map() method
//  2. prompt user for title, salary, and department choosing from the list of departmernts created above
//      in .then callback, call funcon to create role on database connection, passing returned data from prompt as input argument
//  3. call function to load main prompt for questions
//

// function - Add a new employee
//  1. prompt for first_name and last_name
//      in .then callback, store the first namd and the last name to variables,
//  2. call function to find all roles on database connection to get all existing roles
//      in .then callback, create array of role objects with id and title from returned array of role data with .map()
//  3. prompt user for the role for the employee choosing from a list (array) of role objecs
//      in .then callback, store the role id to a variable,
//  4. call function to find all employees on database connection
//      in .then callback, create array of managers with id, first name, last name from the returned data with .map()
//  5. prompt user for the manager from a list from the array of managers
//      in .then callback, create an employee object with variables for first name, last name, role id, manager id
//  6. call function to create employee on database connection, passing the employee object as input argument
//      in .then callback, call function to load main prompt for questions

// function - Update an employee's role
//  1. call function to find all employees on database connection
//      - in .then callback, take first name, last name, and id from the returned database data and create an array
//        of new employee objects with .map().
//      - new objects have two properties, name and value
//        name consists of first name and last name from the returned database data
//        value has id from the returned database data
//  2. prompt the list of choices from the new array of employee objects
//      - in .then callback, store employee id to a variable from the returned user choice
//  3. call function to find all roles on database connection
//      - in .then callback, create a new array of new role objects using .map on the returned database role data
//      - for the new role objects, assign title from returned database data to the name property and assign id to the value property
//  4. prompt user with the list of choices from the new array of new role objects
//      - in .then callback, assign returned user choice to a role id variable
//  5. call function to update employee role, passing employee id variable and role id variable as input arguments
//  6. call fucntion to load main prompt of questions


// function - Exit the application

// ========================
//  OPTIONAL
// ========================

// fuction - View all employees that belong to a department

// function - View all employees that report to a specific manager

// function - Update an employee's manager

// function - View all departments and show their total utilized department budget

// function - Delete an employee

// function - Delete a department

// function - Delete a role

