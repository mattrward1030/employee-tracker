// const managerChoice = () => {
//     connection.query('SELECT * FROM manager', (err, results) => {
//         console.log(results);
//         inquirer
//             .prompt([
//                 {
//                     name: "manager",
//                     type: "rawlist",
//                     message: "Who is the employee's manager",
//                     choices() {
//                         const managerArray = [];
//                         results.forEach(({ name }) => {
//                             managerArray.push(name)
//                         })
//                         return managerArray;
//                     }
//                 },


//             ])
//             .then((answer) => {
//                 console.log(answer);
//                 // when finished prompting, insert a new item into the db with that info
//                 let chosenManager;
//                 results.forEach((manager) => {
//                     if (answer.manager === manager.name) {
//                         chosenManager = manager.id;
//                         return chosenManager;
//                     }
//                 });
//                 connection.query(
//                     'INSERT INTO employee SET ?',
//                     {
//                         manager_id: chosenManager,
//                     },
//                     (err) => {
//                         if (err) throw err;
//                         console.log('Employee added!');
//                         // re-prompt the user for if they want to make other selections

//                     }
//                 );
//             });
//     });
// };





const addRole = () => {
    connection.query('SELECT * FROM role', (err, results) => {
        console.log(results);
        inquirer
            .prompt([

                {
                    name: "role",
                    type: "rawlist",
                    message: "What is the employee's role",
                    choices() {
                        const roleArray = [];
                        results.forEach(({ title }) => {
                            roleArray.push(title)
                        })
                        return roleArray;
                    }
                },


            ])
            .then((answer) => {
                console.log(answer);
                // when finished prompting, insert a new item into the db with that info
                let chosenRole;
                results.forEach((role) => {
                    if (answer.role === role.title) {
                        chosenRole = role.id;
                        return chosenRole;
                    }
                });
                connection.query(
                    'INSERT INTO employee SET ?',
                    {

                        role_id: chosenRole,

                    },
                    (err) => {
                        if (err) throw err;
                        console.log('Employee added!');
                        // re-prompt the user for if they want to make other selections

                    }
                );
            });
    });
};

const addEmployee = () => {
    connection.query('SELECT * FROM role', (err, results) => {
        console.log(results);
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
                    type: "rawlist",
                    message: "What is the employee's role",
                    choices() {
                        const roleArray = [];
                        results.forEach(({ title }) => {
                            roleArray.push(title)
                        })
                        return roleArray;
                    }
                },

                // {
                //     name: "manager",
                //     type: "list",
                //     message: "Who is the employee's manager?",
                //     choices: ["Steve Jobs", "Tim Cook", "Elon Musk", "Jeff Bezos"]

                // },


            ])
            .then((answer) => {
                console.log(answer);
                // when finished prompting, insert a new item into the db with that info
                let chosenRole;
                results.forEach((role) => {
                    if (answer.role === role.title) {
                        chosenRole = role.id;
                        return chosenRole;
                    }
                });
                connection.query(
                    'INSERT INTO employee SET ?',
                    {
                        first_name: answer.firstName,
                        last_name: answer.lastName,
                        role_id: chosenRole,
                        // manager_id: chosenManager,
                    },
                    (err) => {
                        if (err) throw err;
                        console.log('Employee added!');
                        // re-prompt the user for if they want to make other selections
                        start();
                    }
                );
            });
    });
};
