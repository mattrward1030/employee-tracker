DROP DATABASE IF EXISTS employee_trackerDB;

CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE department(
id INT NOT NULL AUTO_INCREMENT,
name VARCHAR(30) NOT NULL,
PRIMARY KEY(id)
);

CREATE TABLE role(
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(30) NOT NULL,
salary DECIMAL(10, 3),
department_id INT,
PRIMARY KEY(id)
);

CREATE TABLE employee(
id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT NOT NULL,
manager_id INT NULL,
PRIMARY KEY(id)
);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Matt", "Ward", 1, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Morgan", "Ward", 2, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Carson", "Ward", 3, 2);
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Alexis", "Chen", 4, 2);
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Richard", "Hendrix", 5, 3);
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Molly", "Armstrong", 6, 3);
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Julia", "Rhymes", 7, 4);
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Vanessa", "Williams", 8, 4);

INSERT INTO role (title, salary, department_id)
VALUES("Sales Lead", 100000, 1);
INSERT INTO role (title, salary, department_id)
VALUES("Salesperson", 80000, 2);
INSERT INTO role (title, salary, department_id)
VALUES("Lead Engineer", 200000, 3);
INSERT INTO role (title, salary, department_id)
VALUES("Software Engineer", 155000, 4);
INSERT INTO role (title, salary, department_id)
VALUES("Account Manager", 110000, 5);
INSERT INTO role (title, salary, department_id)
VALUES("Accountant", 70000, 6);
INSERT INTO role (title, salary, department_id)
VALUES("Legal Team Lead", 175000, 7);

INSERT INTO department (name)
VALUES("Sales");
INSERT INTO department (name)
VALUES("Engineering");
INSERT INTO department (name)
VALUES("Finance");
INSERT INTO department (name)
VALUES("Legal");
