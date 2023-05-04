INSERT INTO
    category (categoryName)
VALUES ('All Gifts'), ('Coffee'), ('Kitchen'), ('Games');

INSERT INTO
    user (
        userName,
        userEmail,
        userPassword
    )
VALUES (
        'Anna Andersson',
        'anna.andersson@gmail.com',
        'password123'
    ), (
        'Bengt Berg',
        'bengt.berg@gmail.com',
        'letmein456'
    ), (
        'Carolina Carlsson',
        'carolina.carlsson@gmail.com',
        'abc123xyz'
    );

INSERT INTO
    list (listName, listU_Id)
VALUES ('Bröllop', 1), ('30-fest', 2);

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
    selectedProduct (
        selectedProductPriority,
        selectedProductFavorite,
        selectedProductPurchased,
        selectedProductAmount,
        selectedProductP_Id,
        selectedProductList_Id
    )
VALUES (1, false, 0, 1, 1, 1), (2, false, 0, 2, 2, 1), (2, true, 0, 2, 3, 1);

INSERT INTO
    guest (guestName, guestGreeting)
VALUES ('Sandra Olsen', 'Nydelig!'), ('Ole Larsson', 'Super sexy!');

INSERT INTO
    guestSelectedProduct(
        guestSelectedProductS_Id,
        guestSelectedProductG_Id,
        productPurchased
    )
VALUES (1, 1, 1), (2, 2, 1);