DELIMITER //
CREATE PROCEDURE deleteSelectedProduct(IN selectedProductId INT)
BEGIN
    /* Raderar kopplingen mellan guest och selectedProduct */
	DELETE FROM guestSelectedProduct WHERE guestSelectedProductS_Id = selectedProductId;
    /* Raderar selectedProduct */
    DELETE FROM selectedProduct WHERE selectedProduct_Id = selectedProductId;
END //
DELIMITER ;
