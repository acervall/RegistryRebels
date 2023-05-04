const express = require('express')
const connection = require('../connection')
const router = express.Router()

// Renders all the products with highest price first
router.get('/api/products', async (req, res) => {
  const sql =
    'SELECT categoryName, productName, productPrice, productImg, productURL FROM category INNER JOIN product ON category.category_Id = product.productCategory_Id ORDER BY product.productPrice DESC'
  try {
    await connection.query(sql, (error, results) => {
      if (error) {
        console.error(error.sqlMessage)
      } else {
        res.json(results)
      }
    })
  } catch (error) {
    return res.status(500).json({
      error,
    })
  }
})

//Renders a specific product
router.get('/api/products/:id', async (req, res) => {
  let sql = 'SELECT * FROM product WHERE product_Id = ?'
  try {
    await connection.query(
      sql,
      [req.params.id],
      function (error, results, fields) {
        if (error) {
          if (error) throw error
        }
        res.json(results)
      },
    )
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    })
  }
})

//Add a new product
router.post('/api/products', async (req, res) => {
  let sql =
    'INSERT INTO product (productName, productPrice, productImg, productURL, productCategory_Id) VALUES (?,?,?,?,?)'
  let params = [
    req.body.productName,
    req.body.productPrice,
    req.body.productImg,
    req.body.productURL,
    req.body.productCategory_Id,
  ]

  try {
    await connection.query(sql, params, function (error, results, fields) {
      if (error) {
        if (error) throw error
      }
      return res.status(201).json({
        success: true,
        error: '',
        message: 'New item added',
      })
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    })
  }
})

// Change a current product. Target specific product ID
router.put('/api/products', async (req, res) => {
  let sql =
    'UPDATE product SET productName = ?, productPrice = ?, productImg = ?, productURL = ?, productCategory_Id = ? WHERE product_Id = ?'
  let params = [
    req.body.productName,
    req.body.productPrice,
    req.body.productImg,
    req.body.productURL,
    req.body.productCategory_Id,
    req.body.product_Id,
  ]

  try {
    await connection.query(sql, params, function (error, results, fields) {
      if (error) {
        if (error) throw error
      }
      return res.status(201).json({
        success: true,
        error: '',
        message: 'Product has been changed',
      })
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    })
  }
})

//Delete a specific product. Target specific product ID
router.delete('/api/product', async (req, res) => {
  let sql = 'DELETE FROM product WHERE product_Id = ?'
  try {
    await connection.query(
      sql,
      [req.body.product_Id],
      function (error, results, fields) {
        if (error) {
          if (error) throw error
        }
        return res.status(201).json({
          success: true,
          error: '',
          message: 'Product has been deleted',
        })
      },
    )
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    })
  }
})

module.exports = router
