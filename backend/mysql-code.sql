CREATE DATABASE RegistryRebels DEFAULT CHARACTER SET = 'utf8mb4';

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

-- Tabell för vilka produkter user har valt till sin specifika lista

CREATE TABLE
    productList (
        productList_Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        products_Id INT,
        productPriority INT,
        productFavorite BOOLEAN,
        productPurchased INT,
        productAmount INT,
        FOREIGN KEY (products_Id) REFERENCES product (product_Id)
    );

-- Lista för gäster med kommentar

CREATE TABLE
    guest (
        guest_Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        guestName VARCHAR(50),
        guestGreeting VARCHAR(250)
    );

-- Tabell för vilka produkter guest har "valt"

CREATE TABLE
    productListGuest (
        productListGuest_Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        productListGuestP_Id INT,
        productListGuestG_Id INT,
        FOREIGN KEY (productListGuestP_Id) REFERENCES productList(productList_Id),
        FOREIGN KEY (productListGuestG_Id) REFERENCES guest(guest_Id)
    );

CREATE TABLE
    user (
        user_Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        userName VARCHAR (50),
        userEmail VARCHAR (50),
        userPassword VARCHAR(50),
        userProductList_Id INT
    );

-- Tabell för flera olika listor, exempelvis en för bröllop, en för födelsedag osv

CREATE TABLE
    userProductList (
        userProductList_Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        userProductListP_Id INT,
        userProductListU_Id INT,
        FOREIGN KEY (userProductListP_Id) REFERENCES product (product_Id),
        FOREIGN KEY (userProductListU_Id) REFERENCES user (user_Id)
    );

INSERT INTO
    category (categoryName)
VALUES ('All Gifts'), ('Coffee'), ('Kitchen'), ('Games');

INSERT INTO
    product (
        productName,
        productPrice,
        productImg,
        productURL,
        productCategory_Id
    )
VALUES (
        'Cards Against Humanity',
        379,
        'https://www.spelexperten.com/bilder/artiklar/SBDK2026.jpg?m=1637241131',
        'https://www.spelexperten.com/sallskapsspel/festspel/cards-against-humanity-1.html',
        1
    ), (
        'MIG 0-100 Vit',
        295,
        'https://www.spelexperten.com/bilder/artiklar/700444.jpg?m=1637241131',
        'https://www.spelexperten.com/sallskapsspel/festspel/mig-0-100-vit.html',
        2
    ), (
        'Unstable Unicorns (Swe)',
        249,
        'https://www.spelexperten.com/bilder/artiklar/TEEUU01SCAN.jpg?m=1653896630',
        'https://www.spelexperten.com/sallskapsspel/festspel/unstable-unicorns-swe.html',
        3
    ), (
        'Duellen',
        99,
        'https://www.spelexperten.com/bilder/artiklar/zoom/9789188987242_1.jpg?m=1637219326',
        'https://www.spelexperten.com/sallskapsspel/festspel/duellen-2.html',
        4
    ), (
        'Med Andra Ord - Harry Potter',
        275,
        'https://www.spelexperten.com/bilder/artiklar/zoom/1-38020-422_1.jpg?m=1638342585',
        'https://www.spelexperten.com/sallskapsspel/familjespel/med-andra-ord-harry-potter.html',
        1
    ), (
        'OBH Nordica Versatile Riskokare + Ångkokare Svart',
        914,
        'https://kitchentime.cdn.storm.io/96bdb35d-d8dc-40f7-b043-7f43fbbe2c31.jpg?preset=66&f=webp',
        'https://www.kitchentime.se/p/versatile-riskokare-angkokare',
        2
    ), (
        'Vivid Senses Chardonnay Vitvinsglas 53 cl 2-pack',
        249,
        'https://cervera.cdn.storm.io/c2f2c4b3-53dd-457a-94…e=Pad&quality=75&format=webp&width=384&height=384',
        'https://www.cervera.se/produkt/zwiesel-homeb-vivid-senses-chardonnay-vitvinsglas-53-cl-2p',
        3
    ), (
        'Carbonator Pro',
        3000,
        'https://www.aarke.com/media/catalog/product/cache/…256decccb90/c/a/carbonator_pro_matte_black_45.png',
        'https://www.aarke.com/se/carbonator-pro#93=5433',
        4
    ), (
        'Chemex Classic kaffebryggare - 10 koppar',
        669,
        'https://www.cremashop.se/media/cache/gallery_image…ntent/products/chemex/classic-coffeemaker/886.jpg',
        'https://www.cremashop.se/sv/products/chemex/classic-coffeemaker/886',
        1
    );

INSERT INTO
    productList(
        productList_Id,
        products_Id,
        productPriority,
        productFavorite,
        productPurchased,
        productAmount
    )
VALUES (1, 3, 1, false, 2, 4), (2, 2, 2, true, 0, 1);

INSERT INTO
    guest (
        guestName,
        guestEmail,
        guestGreeting
    )
VALUES (
        'Sandra Olsen',
        'sandra.olsen@gmail.com',
        'Nydelig!'
    ), (
        'Ole Larsson',
        'Ole.Larsson@gmail.com',
        'Super sexy!'
    );

INSERT INTO
    productListGuest (
        productListGuest_Id,
        productListGuestP_Id,
        productListGuestG_Id
    )
VALUES (1, 2, 3), (2, 1, 2);

INSERT INTO
    user (
        userName,
        userEmail,
        userPassword,
        userProductList_Id
    )
VALUES (
        'Anna Andersson',
        'anna.andersson@gmail.com',
        'password123',
        1
    ), (
        'Bengt Berg',
        'bengt.berg@gmail.com',
        'letmein456',
        2
    ), (
        'Carolina Carlsson',
        'carolina.carlsson@gmail.com',
        'abc123xyz',
        3
    );

INSERT INTO
    UserProductList (
        userProductList_Id,
        userProductListP_Id,
        userProductListU_Id
    )
VALUES (1, 2, 3), (2, 3, 1);

SELECT * FROM product;

SHOW TABLES;

SELECT * FROM category;

SELECT * FROM guest;