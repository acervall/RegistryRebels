DROP PROCEDURE IF EXISTS deleteSelectedProduct;

DELIMITER //
CREATE PROCEDURE deleteSelectedProduct(IN selectedProductId INT)
BEGIN
    /* Raderar kopplingen mellan guest och selectedProduct */
	DELETE FROM guestSelectedProduct WHERE guestSelectedProductS_Id = selectedProductId;
    /* Raderar selectedProduct */
    DELETE FROM selectedProduct WHERE selectedProduct_Id = selectedProductId;
END //
DELIMITER ;


DROP PROCEDURE IF EXISTS addNewProduct;
DELIMITER //
CREATE PROCEDURE addNewProduct(IN productName VARCHAR(50), productPrice INT, productImg VARCHAR(500),
productURL VARCHAR(500), productCategory_Id INT, selectedProductFavorite INT, selectedProductPurchased INT,
selectedProductAmount INT, selectedProductList_Id INT)
BEGIN
    /* Skapar en ny produkt */
    INSERT INTO product(productName, productPrice, productImg, productURL, productCategory_Id)
    VALUES (productName, productPrice, productImg, productURL, productCategory_Id);

    /* Skapar en ny selectedProduct */
    INSERT INTO selectedProduct(selectedProductFavorite, selectedProductPurchased, selectedProductAmount, selectedProductP_Id, selectedProductList_Id)
    VALUES (selectedProductFavorite, selectedProductPurchased, selectedProductAmount, (SELECT LAST_INSERT_ID()), selectedProductList_Id);
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS updateProduct;
DELIMITER //
CREATE PROCEDURE updateProduct(IN product_Id INT, selectedProduct_Id INT, productName VARCHAR(50), productPrice INT, productImg VARCHAR(500),
productURL VARCHAR(500), productCategory_Id INT, selectedProductFavorite BOOLEAN, selectedProductPurchased INT,
selectedProductAmount INT)
BEGIN
    /* Uppdaterar en produkt */
    UPDATE product as p
    SET
    p.productName = productName,
    p.productPrice = productPrice,
    p.productImg = productImg,
    p.productURL = productURL,
    p.productCategory_Id = productCategory_Id
    WHERE p.product_Id = product_Id;

    /* Uppdaterar en selectedProduct */
    UPDATE selectedProduct as sP
    SET
    sP.selectedProductFavorite = selectedProductFavorite,
    sP.selectedProductPurchased = selectedProductPurchased,
    sP.selectedProductAmount = selectedProductAmount,
    sP.selectedProductP_Id = product_Id,
    sP.selectedProductList_Id = selectedProductList_Id
    WHERE sP.selectedProduct_Id = selectedProduct_Id;

END //
DELIMITER ;

/* Update stuff after purchassjdfhjkdsh */
DROP PROCEDURE IF EXISTS buyProduct;
DELIMITER //
CREATE PROCEDURE buyProduct(IN guestName VARCHAR(50), guestGreeting VARCHAR(250), product_Id INT,productPurchased INT)
BEGIN
  /* Registrerar guest och greeting */
  INSERT INTO guest (guestName, guestGreeting) VALUES (guestName, guestGreeting);

  /* Registrerar produkt i mellantabell */
  INSERT INTO guestselectedproduct (
    guestSelectedProductG_Id,
    guestSelectedProductS_Id,
    productPurchased)
    VALUES ((SELECT LAST_INSERT_ID()), product_Id,productPurchased);

  /* Uppdaterar antal köpta produkter */
  UPDATE selectedproduct
  SET selectedProductPurchased = selectedProductPurchased + productPurchased
  WHERE selectedProduct_Id = product_Id;

END //
DELIMITER ;
