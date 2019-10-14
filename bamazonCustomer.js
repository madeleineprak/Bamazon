require("dotenv").config();
var keys = require("./keys");
var mysql = require("mysql");
var inquirer = require("inquirer");

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
    // connection.end();
});

function start() {
    displayProducts();
}

function displayProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("ITEM ID: " + res[i].item_id + " | PRODUCT: " + res[i].product_name + " | DEPARTMENT: " + res[i].department_name + " | PRICE: $" + res[i].price + " | QUANTITY: " + res[i].stock_quantity);
        }
        console.log("=============================");
        // connection.end();
    });
}

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
            .then(function(answer) {
                // console.log("Checking for.. " + answer.id);
                for (var i = 0; i < res.length; i++) {
                    // console.log(res[i].item_id === parseInt(answer.id));
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
                                    console.log("Thanks for your purchase! Your total was $" + answer.units * res[i].price + ".");
                                }
                            );
                        } else {
                            console.log("Sorry, insufficient quantity! Try again later.");
                        }
                    }
                }
            });
            // connection.end();
    });
}