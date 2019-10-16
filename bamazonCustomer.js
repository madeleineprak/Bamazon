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

connection.connect(function(err) {
    if (err) throw err;
    displayProducts();
    placeOrder();
});

// Displays products for sale
function displayProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.table(res);
        }
    });
}

// Allows customer to buy one of the products by taking in product id and number of units 
function placeOrder() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: "id",
                    type: "input",
                    message: "What is the ID of the product you would like to buy?"
                },
                {
                    name: "units",
                    type: "input",
                    message: "How many units would you like to buy?"
                }
            ])
            // Updates database if enough units
            .then(function(answer) {
                for (var i = 0; i < res.length; i++) {
                    if (res[i].item_id === parseInt(answer.id)) {
                        if (res[i].stock_quantity >= answer.units) {
                            connection.query(
                                "UPDATE products SET ? WHERE ?", 
                                [
                                    {
                                        stock_quantity: (res[i].stock_quantity - answer.units)
                                    },
                                    {
                                        item_id: parseInt(answer.id)
                                    }
                                ],
                                function(err) {
                                    if (err) throw err;
                                }
                            );
                            connection.end();
                            console.log("Thanks for your purchase! Your total was $" + answer.units * res[i].price + ".");
                        } else {
                            console.log("Sorry, insufficient quantity! Try again later.");
                        }
                    }
                }
            });
    });
}