# Bamazon

Bamazon is a command line node app that serves as a marketplace. Based on which user perspective you choose, you can perform certain actions that interact with the marketplace. 

Possible user perspectives:
* Custome - has the ability to buy products
* Manager - has the ability to view products for sale, view low inventory, add to inventory and add a new product
* Supervisor - has the ability to view product sales by department and add a new department 

*Note: The supervisor perspective is still a work-in-progress--thank you for understanding.

## Tools Utilized
* MySQL Workbench
* dotenv 
* inquirer
* console.table

The marketplace is stored in a MySQL database and has two tables: products and departments. These tables get updated every time the user interacts with it. Dotenv is used so we can safely use our sensitive information to access MySQL. Inquirer allows the user to interact with the console and holds the foundation for the functionality of the client-user interaction. Console.table helps visualize the MySQL data in the console in an easy-to-read way.

## Instructions
1. Clone/fork the repository to your computer
2. Run npm install
3. **Important: You will need your own .env file containing your MySQL connection information for the app to work properly
4. Open your selected terminal
5. Choose which user perspective you'd like to use: Customer, Manager, Supervisor. You can potentially use all 3 if you would like to control all aspects of the Bamazon. 
6. Run the file with node. (Ex: "node bamazonCustomer.js", "node bamazonManager.js", "node bamazonSupervisor.js")
7. Depending on which command you chose, the console will return options related to your user perspective that allow you to interact with the marketplace.

## How It Works
The app uses MySQL to set up the bamazon database and the inquirer npm package to allow the user to interact with the database as a customer, manager or supervisor. Once the user chooses an action in the console, it calls a function that displays the result back to the user and updates the database if it applies.

### Customer Perspective
![Customer](https://user-images.githubusercontent.com/26778117/66970968-34747300-f044-11e9-9d13-42d20e1d74f6.gif)

### Manager Perspective
![Manager](https://user-images.githubusercontent.com/26778117/66970972-376f6380-f044-11e9-85e0-1ba7eaf8ffb8.gif)

### Supervisor Perspective
![Supervisor](https://user-images.githubusercontent.com/26778117/66985438-a7e0a980-f071-11e9-9da8-0c5b18410839.gif)

## Author(s)
[Madeleine Prak](https://github.com/madeleineprak/)