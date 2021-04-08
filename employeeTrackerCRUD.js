const mysql = require('mysql');
const inquirer = require('inquirer');
let table = require('console.table')


const connection = mysql.createConnection({
    host: 'localhost',

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: 'root',

    // Be sure to update with your own MySQL password!
    password: 'rootroot',
    database: 'employee_trackerDB',
});

const start = () => {
    // Prompt user using Inquirer
    // with responses make queries
    inquirer
        .prompt([
            {
                type: "list",
                message: "What would you like to do?",
                choices: ["View All Employees", "View Employees By Department", "View Employees By Role", "View Employees By Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager", "EXIT"],
                name: "userSelection"

            }
        ])
        .then((answer) => {
            switch (answer.userSelection) {
                case "View All Employees":
                    viewEmployees();
                    break;

                case "View Employees By Department":
                    viewEmployeesDepartment();
                    break;

                case "View Employees By Role":
                    viewEmployeesByRole();
                    break;

                case "View Employees By Manager":
                    viewEmployeesManager();
                    break;

                case "Add Employee":
                    addEmployee();
                    break;

                // case "Remove Employee":
                //     removeEmployee();
                //     break;

                // case "Update Employee Role":
                //     updateEmployeeRole();
                //     break;

                // case "Update Employee Manager":
                //     updateEmployeeManager();
                //     break;

                case "EXIT":
                    connection.end();
                    break;
            }
        });
}

const viewEmployees = () => {
    console.log('Selecting all employees...\n');
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        start();
    });
}


const addEmployee = () => {

    inquirer
        .prompt([
            {
                name: "firstName",
                type: "input",
                message: "What is the employee's first name",
            },
            {
                name: "lastName",
                type: "input",
                message: "What is the employee's last name?",
            },
            {
                name: "role",
                type: "list",
                message: "What is the employee's role",
                choices: ["Sales Lead", "Salesperson", "Lead Engineer", "Software Engineer", "Account Manager", "Accountant", "Legal Team Lead"],

            },

            {
                name: "manager",
                type: "list",
                message: "Who is the employee's manager?",
                choices: ["John Smith", "John Snow", "Steve Jobs", "Jeff Bezos", "None"]

            },


        ])
        .then((answer) => {
            // when finished prompting, insert a new item into the db with that info
            connection.query(
                'INSERT INTO employee SET ?',
                {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: answer.role,
                    manager_id: answer.manager,
                },
                (err) => {
                    if (err) throw err;
                    console.log('Employee added!');
                    // re-prompt the user for if they want to make other selections
                    start();
                }
            );
        });
};

const viewEmployeesByRole = () => {
    inquirer.prompt([
        {
            name: "title",
            type: "list",
            message: "View Employees By Role",
            choices: ["Sales Lead", "Salesperson", "Lead Engineer", "Software Engineer", "Account Manager", "Accountant", "Legal Team Lead"],
        }
    ])
        .then((answer) => {

            connection.query(
                'SELECT employee.first_name, employee.last_name FROM employee JOIN role ON employee.role_id=role.id WHERE ?',
                {
                    title: `${answer.title}`,
                },
                (err, results) => {
                    if (err) throw err;
                    console.log(
                        `${answer.title}:`)
                    results.forEach((results) => {
                        console.log(`${results.first_name} ${results.last_name}`);
                    });
                    start();
                })
        })
};

const viewEmployeesDepartment = () => {
    inquirer.prompt([
        {
            name: "department",
            type: "list",
            message: "View Employees By Department",
            choices: ["Sales", "Engineering", "Finance", "Legal"],
        }
    ])
        .then((answer) => {

            connection.query(
                'SELECT * FROM employee JOIN role ON employee.role_id = role.id JOIN department ON department.id = role.department_id WHERE ?',
                {
                    name: `${answer.department}`,
                },
                (err, results) => {
                    if (err) throw err;
                    console.log(
                        `${answer.department}:`)
                    results.forEach((results) => {
                        console.log(`${results.first_name} ${results.last_name}`);
                    });
                    start();
                })
        })
};

const viewEmployeesManager = () => {
    inquirer.prompt([
        {
            name: "manager",
            type: "list",
            message: "View Employees By Manager",
            choices: ["Steve Jobs", "Tim Cook", "Elon Musk", "Jeff Bezos"],
        }
    ])
        .then((answer) => {

            connection.query(
                'SELECT * FROM employee JOIN manager ON employee.manager_id = manager.id WHERE ?',
                {
                    name: `${answer.manager}`

                },
                (err, results) => {
                    if (err) throw err;
                    console.log(
                        `${answer.manager}:`)
                    results.forEach((results) => {
                        console.log(`${results.first_name} ${results.last_name}`);
                    });
                    start();
                })
        })
};



// const removeEmployee = () => {
//     connection.query('SELECT * FROM employee', (err, results) => {
//         if (err) throw err

//         inquirer
//             .prompt([
//                 {
//                     name: 'employee',
//                     type: 'rawlist',
//                     choices() {
//                         const employeeArray = [];
//                         results.forEach(({ first_name, last_name }) => {
//                             employeeArray.push(`${first_name} ${last_name}`)
//                         });
//                         return employeeArray;
//                     },
//                     message: 'Which employee do you wish to remove?',
//                 }

//             ])

//             .then((answer) => {

//                 let chosenEmployee;
//                 results.forEach((employee) => {
//                     if (employee.id === answer.choice) {
//                         chosenEmployee = employee
//                         connection.query(
//                             'Delete FROM employee WHERE ?',
//                             {
//                                 chosenEmployee: answer.choice
//                             },

//                             (error) => {
//                                 if (error) throw err;
//                                 console.log('Employee removed');
//                                 start();
//                             }
//                         );
//                     }
//                 });
//             });
//     });
// }
// Connect to the DB
connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    start();
});

