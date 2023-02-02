DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

  

CREATE TABLE department (
 id INT PRIMARY KEY AUTO_INCREMENT,
 department_name VARCHAR(30),
);


  

CREATE TABLE role (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL(10,2),
  department_id INT,
  CONSTRAINT dep_fk FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

  
 
CREATE TABLE employee (
  id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  CONSTRAINT role_fk FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
  manager_id INT,
  CONSTRAINT manager_fk FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);
  

