const express = require('express');
const connection = require('../connection');
const router = express.Router();

router.get('/api/product-list/', async (req, res) => {
  // Visar alla listor som finns
  const sql = 'SELECT * FROM productList';
  console.log(req.params.id);
  try {
    await connection.query(sql, (error, results) => {
      if (error) {
        console.error(error.sqlMessage);
      } else {
        res.json(results);
      }
    });
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
});

router.get('/api/product-list/:id', async (req, res) => {
  // Genom att anropa endpoint med (userProductList_Id) så kan man få fram en specifik listas produkter
  const sql = `
  SELECT pL.productAmount as amount, pL.productPurchased as purchased, pL.productFavorite as favorite,
         pL.productPriority as priority, p.product_Id as id, p.productName as name, p.productPrice as price, p.productImg as img, p.productURL as url, c.categoryName as category FROM userProductList as uPL
  INNER JOIN
         productList pL on uPL.userProductListP_Id = pL.productList_Id
  INNER JOIN
         product p on pL.products_Id = p.product_Id
  INNER JOIN
         category c on p.productCategory_Id = c.category_Id
  WHERE uPL.userProductList_Id = ?`;

  try {
    await connection.query(sql, [req.params.id], (error, results) => {
      if (error) {
        console.error(error.sqlMessage);
      } else {
        res.json(results);
      }
    });
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
});

// router.put('/api/product-list/:id', async (req, res, next) => {
//   // Genom att anropa endpoint med id så kan man få fram en specifik lista
//   const sql = `
//   INSERT INTO
//     productList(
//         products_Id,
//         productPriority,
//         productFavorite,
//         productPurchased,
//         productAmount
//     )
//   VALUES (?, ?, ?, ?, ?)`;

//   const params = [
//     req.body.productId,
//     req.body?.productPriority || 0,
//     req.body?.productFavorite || false,
//     req.body?.productPurchased || 0,
//     req.body?.productAmount || 1
//   ];

//   try {
//     await connection.query(
//       sql,
//       [req.params.id, ...params],
//       (error, results) => {
//         if (error) {
//           console.error(error.sqlMessage);
//           next({
//             message: {
//               error,
//               info: `request should request from /api/product-list/:id`,
//               example: {
//                 productId: 1,
//                 productPriority: 5,
//                 productFavorite: false,
//                 productPurchased: 0,
//                 productAmount: 1
//               }
//             }
//           });
//         } else {
//           res.json(results);
//         }
//       }
//     );
//   } catch (error) {
//     return res.status(500).json({
//       error
//     });
//   }
// });

module.exports = router;
