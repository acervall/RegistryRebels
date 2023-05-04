SHOW TABLES;

SELECT * FROM category;

SELECT * FROM guest;

SELECT * FROM guestselectedproduct;

SELECT * FROM list;

SELECT * FROM product;

SELECT * FROM selectedproduct;

SELECT * FROM user;

SELECT *
FROM selectedproduct
    INNER JOIN product ON product.product_Id = selectedProduct.selectedProductP_Id
    INNER JOIN list ON list.list_Id = selectedProduct.selectedProductList_Id;