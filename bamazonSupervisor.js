// Application for Bamazon Manager
require("dotenv").config();
var keys = require("./keys");
var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require("console.table");

// Connects to MySQL database
var connection = mysql.createConnection({
    host: keys.sql.host,
    port: keys.sql.port,
    user: keys.sql.user,
    password: keys.sql.pass,
    database: keys.sql.name
});

connection.connect(function (err) {
    if (err) throw err;
    menuOptions();
});

// Displays the main menu options and runs the respective function
function menuOptions() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View Product Sales by Department",
                "Create New Department",
                "exit"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View Product Sales by Department":
                    viewProductSales();
                    break;

                case "Create New Department":
                    createNewDepartment();
                    break;

                case "exit":
                    connection.end();
                    break;
            }
        });
}

// Displays summarized table of product sales by department
function viewProductSales() {

}

// Allows supervisor to create another department
function createNewDepartment() {
    connection.query("SELECT * FROM departments", function (err, res) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: "name",
                    type: "input",
                    message: "What is the name of the department you would like to add?"
                },
                {
                    name: "costs",
                    type: "input",
                    message: "How much are the over head costs for it?"
                }
            ])
            // Adds new department to database
            .then(function(answer) {
                connection.query(
                    "INSERT INTO departments SET ?",
                    {
                        department_name: answer.name,
                        over_head_costs: parseFloat(answer.costs) || 0
                    },
                    function(err) {
                        if (err) throw err;
                        console.log("The " + answer.name + " department has been added.")
                        askNext();
                    }
                )
            })
    })
}

// Once the supervisor is done with their first action, this allows them to choose another from the menu or exit
function askNext() {
    inquirer
        .prompt({
            name: "confirm",
            type: "confirm",
            message: "Would you like to do something else?"
        })
        .then(function (answer) {
            if (answer.confirm) {
                menuOptions();
            } else {
                connection.end();
            }
        })
}