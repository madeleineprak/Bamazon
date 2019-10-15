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
    menuOptions();
});

function menuOptions() {
    inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product",
        "exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "View Products for Sale":
        viewProductsForSale();
        break;

      case "View Low Inventory":
        viewLowInventory();
        break;

      case "Add to Inventory":
        addToInventory();
        break;

      case "Add New Product":
        addNewProduct();
        break;

      case "exit":
        connection.end();
        break;
      }
    });

    function viewProductsForSale() {
        connection.query("SELECT * FROM products", function(err, res) {
            if (err) throw err;
            console.log("SHOP");
            console.log("============================");
            for (var i = 0; i < res.length; i++) {
                console.log("ID: " + res[i].item_id);
                console.log("PRODUCT: " + res[i].product_name);
                console.log("DEPARTMENT: " + res[i].department_name);
                console.log("PRICE: $" + res[i].price);
                console.log("QUANTITY: " + res[i].stock_quantity);
                console.log("============================");
                // console.log("ITEM ID: " + res[i].item_id + " | PRODUCT: " + res[i].product_name + " | DEPARTMENT: " + res[i].department_name + " | PRICE: $" + res[i].price + " | QUANTITY: " + res[i].stock_quantity);
            }
        });
    }

    function viewLowInventory() {

    }

    function addToInventory() {
        
    }

    function addNewProduct() {

    }
}