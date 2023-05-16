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

router.get('/api/selectedProduct/stat/:id', async (req, res) => {
  const id = req.params.id
  const sql = `
  SELECT COUNT(*) as 'unique-products', SUM(sP.selectedProductAmount) as 'total-products' FROM selectedProduct as sP
  WHERE sP.selectedProductList_Id = ?;`
  try {
    connection.query(sql, [id], (error, results) => {
      if (error) {
        throw error
      }
      res.json(results)
    })
  } catch (error) {
    console.error(error)
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

  let searchTerm = req.body?.searchTerm
  if (searchTerm) {
    sql += ` AND p.productName LIKE ?;`
    searchTerm = `%${searchTerm}%`
  }
  const params = [req.params.id, searchTerm].filter((value) => value)

  console.log('SQL: ', sql, ' PARAMS: ', params)

  try {
    await connection.query(sql, params, function (error, results) {
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

router.get('/api/selectedProductByUrl/:url', async (req, res) => {
  // Visar alla produkter i list (med url)
  console.log(req.params.url)
  let sql = `
  SELECT * FROM selectedProduct as sP
  INNER JOIN list l on sP.selectedProductList_Id = l.list_Id
  INNER JOIN product p on sP.selectedProductP_Id = p.product_Id
  INNER JOIN category c on p.productCategory_Id = c.category_Id
  WHERE l.listUrl = ?`

  try {
    await connection.query(sql, [req.params.url], function (error, results) {
      if (error) {
        if (error) throw error
      }
      console.log(results)
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

router.get(
  '/api/selectedProduct/product/:listId/:selectedProductId',
  async (req, res) => {
    // Visar alla produkter i list (med id)
    let sql = `
  SELECT * FROM selectedProduct as sP
  INNER JOIN list l on sP.selectedProductList_Id = l.list_Id
  INNER JOIN product p on sP.selectedProductP_Id = p.product_Id
  INNER JOIN category c on p.productCategory_Id = c.category_Id
  WHERE sP.selectedProductList_Id = ?
  AND sP.selectedProduct_Id = ?`

    const params = [req.params.listId, req.params.selectedProductId]

    try {
      await connection.query(sql, params, function (error, results) {
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
  },
)

router.get('/api/selectedProduct/:listId/:categoryId', async (req, res) => {
  // Visar alla produkter i list (med id)
  let sql = `
  SELECT * FROM selectedProduct as sP
  INNER JOIN list l on sP.selectedProductList_Id = l.list_Id
  INNER JOIN product p on sP.selectedProductP_Id = p.product_Id
  INNER JOIN category c on p.productCategory_Id = c.category_Id
  WHERE sP.selectedProductList_Id = ?
  AND c.category_Id = ?`

  const params = [req.params.listId, req.params.categoryId]

  try {
    await connection.query(sql, params, function (error, results) {
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
    selectedProductPriority: req.body?.selectedProductPriority,
    selectedProductFavorite: req.body?.selectedProductFavorite,
    selectedProductPurchased: req.body?.selectedProductPurchased,
    selectedProductAmount: req.body?.selectedProductAmount,
    selectedProductP_Id: req.body?.selectedProductP_Id,
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
