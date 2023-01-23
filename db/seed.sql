-- USE your_database;


-- INSERT INTO your_table_for_departments

INSERT INTO department (department_name)
VALUES ('Sales'),
       ('Engineering'),
       ('Accounting'),
       ('Legal');
      
       
-- INSERT INTO your_table_for_roles

INSERT INTO role (title, salary, department_id)
VALUES ('Salesperson', 80000, 1),
       ('Sales Lead', 100000, 1),
       ('Software Engineer', 180000, 2),
       ('Lead Engineer', 200000, 2),
       ('Accountant', 160000, 3),
       ('Accountant Manager', 180000, 3),
       ('Lawyer', 160000, 4);
       ('Legal Team Lead', 180000, 4),
     


-- INSERT INTO your_table_for_employees

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Tom', 'Brady', 2, null),
('Mike', 'Tyson', 1, 1),
('Michael', 'Jordan', 4, null),
('Travis', 'Scott', 3, 3),
('Artemi', 'Panarin', 6, null),
('Aaron', 'Judge', 5, 5),
('Optimus', 'Prime', 7, null),
('Bruce', 'Wayne', 8, 7);
       
  