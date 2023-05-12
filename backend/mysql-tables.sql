-- DROP TABLE guest;
-- USE registryrebels;
DROP DATABASE IF EXISTS RegistryRebels;

CREATE DATABASE RegistryRebels DEFAULT CHARACTER SET = 'utf8mb4';

USE RegistryRebels;

DROP TABLE IF EXISTS guestSelectedProduct;
DROP TABLE IF EXISTS guest;
DROP TABLE IF EXISTS selectedProduct;
DROP TABLE IF EXISTS list;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS product;
DROP TABLE IF EXISTS category;

-- Categories

CREATE TABLE
    category (
        category_Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        categoryName VARCHAR (50)
    );

-- Alla produkter

CREATE TABLE
    product (
        product_Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        productName VARCHAR(50),
        productPrice INT,
        productImg VARCHAR(500),
        productURL VARCHAR(500),
        productCategory_Id INT,
        FOREIGN KEY (productCategory_Id) REFERENCES category(category_Id),
        UNIQUE (productName)
    );

-- Lista för gäster med kommentar

CREATE TABLE
    guest (
        guest_Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        guestName VARCHAR(50),
        guestGreeting VARCHAR(250)
    );

CREATE TABLE
    user (
        user_Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        userName VARCHAR (50),
        userEmail VARCHAR (50),
        userPassword VARCHAR(50)
    );

-- Tabell för flera olika listor, exempelvis en för bröllop, en för födelsedag osv

CREATE TABLE
    list (
        list_Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        listName VARCHAR(50),
        listImage VARCHAR(500),
        listDate VARCHAR(50),
        listU_Id INT,
        FOREIGN KEY (listU_Id) REFERENCES user (user_Id)
    );

-- Tabell för vilka produkter user har valt till sin specifika lista

CREATE TABLE
    selectedProduct (
        selectedProduct_Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        selectedProductPriority INT,
        selectedProductFavorite BOOLEAN,
        selectedProductPurchased INT,
        selectedProductAmount INT,
        selectedProductP_Id INT,
        selectedProductList_Id INT,
        FOREIGN KEY (selectedProductP_Id) REFERENCES product (product_Id),
        FOREIGN KEY (selectedProductList_Id) REFERENCES list (list_Id)
    );

-- Tabell för vilka produkter guest har "valt"

CREATE TABLE
    guestSelectedProduct (
        guestSelectedProduct_Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        guestSelectedProductS_Id INT,
        guestSelectedProductG_Id INT,
        productPurchased INT,
        FOREIGN KEY (guestSelectedProduct_Id) REFERENCES selectedProduct(selectedProduct_Id),
        FOREIGN KEY (guestSelectedProductG_Id) REFERENCES guest(guest_Id)
    );
