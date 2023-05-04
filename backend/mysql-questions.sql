SHOW TABLES;

SELECT * FROM category;

SELECT * FROM guest;

SELECT * FROM guestselectedproduct;

SELECT * FROM list;

SELECT * FROM product;

SELECT * FROM selectedproduct;

SELECT * FROM user;

SELECT *
FROM selectedproducts
    INNER JOIN product ON product.product_Id = selectedProducts.selectedProductsP_Id
    INNER JOIN list ON list.list_Id = selectedProducts.selectedProductsList_Id;