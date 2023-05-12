SHOW TABLES;

SELECT * FROM category;

SELECT * FROM guest;

SELECT * FROM guestSelectedProduct;

SELECT * FROM list;

SELECT * FROM product;

SELECT * FROM selectedProduct;

SELECT * FROM user;

SELECT *
FROM selectedProduct
    INNER JOIN product ON product.product_Id = selectedProduct.selectedProductP_Id
    INNER JOIN list ON list.list_Id = selectedProduct.selectedProductList_Id;

SELECT p.*, c.categoryName
FROM product p
JOIN category c ON productCategory_Id = c.category_Id
WHERE productCategory_Id = 1;
