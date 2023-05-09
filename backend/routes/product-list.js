const express = require('express')
const connection = require('../connection')
const router = express.Router()

router.delete('/api/selectedProduct/:id', async (req, res) => {
  const sql = `CALL deleteSelectedProduct(?)`
  try {
    await connection.query(sql, [req.params.id], (error, results) => {
      if (error) {
        console.error(error.sqlMessage)
      }
      if (results.affectedRows >= 1) {
        res.json({
          success: true,
          error: '',
          message: 'Product has been deleted',
        })
      } else {
        res.status(404).json({
          success: false,
          error: 404,
          message: `Product with id: ${req.params.id} does not exist`,
        })
      }
    })
  } catch (error) {
    return res.status(500).json({
      error,
    })
  }
})

router.get('/api/selectedProduct/:id', async (req, res) => {
  // Visar alla produkter i list (med id)
  let sql = `
  SELECT * FROM selectedProduct as sP
  INNER JOIN list l on sP.selectedProductList_Id = l.list_Id
  INNER JOIN product p on sP.selectedProductP_Id = p.product_Id
  INNER JOIN category c on p.productCategory_Id = c.category_Id
  WHERE sP.selectedProductList_Id = ?`

  try {
    await connection.query(sql, [req.params.id], function (error, results) {
      if (error) {
        if (error) throw error
      }
      res.json(results)
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error,
      message: error.message,
    })
  }
})

router.post('/api/selectedProduct/:id', async (req, res) => {
  // Skapar en selectedProduct och kopplar till list (med id)
  const params = Object.entries({
    selectedProductP_Id: req.body?.selectedProductP_Id,
    selectedProductPriority: req.body?.selectedProductPriority,
    selectedProductFavorite: req.body?.selectedProductFavorite,
    selectedProductPurchased: req.body?.selectedProductPurchased,
    selectedProductAmount: req.body?.selectedProductAmount,
  }).filter((kv) => kv[1] || kv[1] === 0)

  const columns = params.map((kv) => kv[0])
  const values = params.map(() => '?')
  const sql = `
  INSERT INTO
    selectedProduct(
      selectedProductList_Id,
      ${columns}
    )
  VALUES (?, ${values});`

  try {
    // Kollar så man har skickat nödvändig data
    if (!req.body.selectedProductP_Id) {
      throw { error: 'Saknas nödvändig data' }
    }

    await connection.query(
      sql,
      [req.params.id, ...params.map((kv) => kv[1])],
      (error) => {
        if (error) {
          console.error(error.sqlMessage)
        } else {
          res.status(201).json({
            success: true,
            error: '',
            message: 'Product has been added',
          })
        }
      },
    )
  } catch (error) {
    return res.status(500).json(error)
  }
})

router.put('/api/selectedProduct/:id', async (req, res) => {
  // Uppdatera en selectedProduct (efter id) med valfria parametrar
  const params = Object.entries({
    selectedProductList_Id: req.body?.selectedProductList_Id,
    selectedProductP_Id: req.body?.selectedProductP_Id,
    selectedProductPriority: req.body?.selectedProductPriority,
    selectedProductFavorite: req.body?.selectedProductFavorite,
    selectedProductPurchased: req.body?.selectedProductPurchased,
    selectedProductAmount: req.body?.selectedProductAmount,
  }).filter((kv) => kv[1] || kv[1] === 0)

  const sql = `
  UPDATE selectedProduct SET
    ${params.map((kv) => `${kv[0]} = ?`)}
  WHERE selectedProduct_Id = ?;`

  try {
    await connection.query(
      sql,
      [...params.map((kv) => kv[1]), req.params.id],
      (error, results) => {
        if (error) {
          console.error(error.sqlMessage)
        } else if (results.affectedRows >= 1) {
          res.json({
            success: true,
            error: '',
            message: 'Product has been updated',
          })
        } else {
          res.status(404).json({
            success: false,
            error: 404,
            message: `Product with id: ${req.params.id} does not exist`,
          })
        }
      },
    )
  } catch (error) {
    return res.status(500).json({
      error,
    })
  }
})

module.exports = router
