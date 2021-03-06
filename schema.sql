DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

-- Create products database
CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(13, 2) default 0,
    stock_quantity INT default 0,
    PRIMARY KEY (item_id)
);

-- Adds products
INSERT INTO products 
	(product_name, department_name, price, stock_quantity)
VALUES
	("Makeup Brushes", "Beauty", 10, 100),
    ("Eyeshadow Palette", "Beauty", 40, 100),
    ("Winter Jacket", "Clothing & Shoes", 75, 100),
    ("Cozy Scarf", "Clothing & Shoes", 20, 100),
    ("Boots", "Clothing & Shoes", 20, 100),
    ("Xbox Controller", "Electronics", 60, 100),
    ("iPhone 11", "Electronics", 1800, 100),
    ("Apple Watch", "Electronics", 200, 100),
    ("Cream Couch", "Home & Kitchen", 600, 100),
    ("Big Blanket", "Home & Kitchen", 50, 100),
    ("Purple Pan", "Home & Kitchen", 30, 100),
    ("Tall Table", "Home & Kitchen", 250, 100);


-- Create departments database 
CREATE TABLE departments (
	department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(100) NOT NULL,
    over_head_costs DECIMAL(13, 2) default 0,
    PRIMARY KEY (department_id)
);

-- Adds product sales to products database
ALTER TABLE products
ADD COLUMN product_sales DECIMAL(13,2) default 0 AFTER stock_quantity;