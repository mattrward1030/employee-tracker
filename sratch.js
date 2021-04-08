const addEmployee = () => {
    connection.query('SELECT * FROM manager', (err, results) => {
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
                // {
                //     name: "role",
                //     type: "rawlist",
                //     message: "What is the employee's role",
                //     choices() {
                //         const roleArray = [];
                //         results.forEach(({ title }) => {
                //             roleArray.push(title)
                //         })
                //         return roleArray;
                //     }
                // },

                {
                    name: "manager",
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
                        first_name: answer.firstName,
                        last_name: answer.lastName,
                        // role_id: chosenRole,
                        manager_id: chosenManager,
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