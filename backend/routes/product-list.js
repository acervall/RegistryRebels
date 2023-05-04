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
      res.json(results)
    })
  } catch (error) {
    return res.status(500).json({
      error,
    })
  }
})

router.post('/api/selectedProduct', async (req, res) => {
  const params = Object.entries({
    selectedProductList_Id: req.body?.selectedProductList_Id,
    selectedProductP_Id: req.body?.selectedProductP_Id,
    selectedProductPriority: req.body?.selectedProductPriority,
    selectedProductFavorite: req.body?.selectedProductFavorite,
    selectedProductPurchased: req.body?.selectedProductPurchased,
    selectedProductAmount: req.body?.selectedProductAmount,
  }).filter((kv) => kv[1])

  const columns = params.map((kv) => kv[0])
  const values = params.map(() => '?')
  const sql = `
  INSERT INTO
    selectedProduct(
      ${columns}
    )
  VALUES (${values});`

  try {
    // Kollar så man har skickat nödvändig data
    if (!req.body.selectedProductList_Id || !req.body.selectedProductP_Id) {
      throw { error: 'Saknas nödvändig data' }
    }

    await connection.query(
      sql,
      [...params.map((kv) => kv[1])],
      (error, results) => {
        if (error) {
          console.error(error.sqlMessage)
        } else {
          res.json(results)
        }
      },
    )
  } catch (error) {
    console.log('HERE: ', error)
    return res.status(500).json(error)
  }
})

router.put('/api/selectedProduct/:id', async (req, res) => {
  // Uppdatera en selectedProduct med parametrar
  const params = Object.entries({
    selectedProductList_Id: req.body?.selectedProductList_Id,
    selectedProductP_Id: req.body?.selectedProductP_Id,
    selectedProductPriority: req.body?.selectedProductPriority,
    selectedProductFavorite: req.body?.selectedProductFavorite,
    selectedProductPurchased: req.body?.selectedProductPurchased,
    selectedProductAmount: req.body?.selectedProductAmount,
  }).filter((kv) => kv[1])

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
        } else {
          res.json(results)
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
