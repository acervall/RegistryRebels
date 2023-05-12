const express = require('express')
const connection = require('../connection')
const router = express.Router()

// Renders all the products with highest price first
router.get('/api/products', async (req, res) => {
  const sql =
    'SELECT product_Id, categoryName, productName, productPrice, productImg, productURL FROM category INNER JOIN product ON category.category_Id = product.productCategory_Id ORDER BY product.productPrice DESC'
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

router.get('/api/product/:searchTerm', async (req, res) => {
  // Visar alla produkter i list (med id)
  let sql = `
  SELECT * FROM product as p
  INNER JOIN category c on p.productCategory_Id = c.category_Id
  WHERE p.productName LIKE ?`

  let searchTerm = '%' + req.params.searchTerm + '%'

  const params = [searchTerm].filter((value) => value)

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

// Lägger till en produkt i både product & selectedProduct
router.post('/api/product/:id', async (req, res) => {
  const sql = 'CALL addNewProduct(?, ?, ?, ?, ?, ?, ?, ?, ?)'
  const params = [
    req.body.productName,
    req.body.productPrice,
    req.body.productImg,
    req.body.productURL,
    req.body.productCategory_Id,
    req.body.selectedProductFavorite,
    req.body.selectedProductPurchased,
    req.body.selectedProductAmount,
  ]

  try {
    await connection.query(sql, [...params, req.params.id], (error) => {
      if (error?.code === 'ER_DUP_ENTRY') {
        res.status(409).json({
          success: false,
          error: error,
          message: 'Product name already exists',
        })
      } else if (error) {
        throw error
      } else {
        res.status(201).json({
          success: true,
          error: '',
          message: 'Product has been added',
        })
      }
    })
  } catch (error) {
    return res.status(500).json(error)
  }
})

// Uppdaterar en produkt i både product & selectedProduct
router.put('/api/product/:productId/:selectedProductId', async (req, res) => {
  const sql = 'CALL updateProduct(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
  const params = [
    req.body.productName,
    req.body.productPrice,
    req.body.productImg,
    req.body.productURL,
    req.body.productCategory_Id,
    req.body.selectedProductFavorite,
    req.body.selectedProductPurchased,
    req.body.selectedProductAmount,
  ]

  console.log('PARAMS: ', params)

  try {
    await connection.query(
      sql,
      [req.params.productId, req.params.selectedProductId, ...params],
      (error) => {
        if (error?.code === 'ER_DUP_ENTRY') {
          res.status(409).json({
            success: false,
            error: error,
            message: 'Product name already exists',
          })
        } else if (error) {
          throw error
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
