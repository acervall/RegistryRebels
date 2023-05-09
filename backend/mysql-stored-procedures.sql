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
