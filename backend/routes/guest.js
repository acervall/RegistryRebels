const express = require('express')
const connection = require('../connection')
const router = express.Router()

// View all guest and greetings
router.get('/api/guest', async (req, res) => {
  const sql = 'SELECT * FROM guest'
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

// Get guest by name
router.get('/api/guest/:name', async (req, res) => {
  const sql = `
  SELECT u.userName, g.guest_Id, g.guestName, g.guestGreeting, p.productName, p.productImg, p.productURL, p.productPrice, c.categoryName FROM guest as g
  INNER JOIN guestSelectedProduct gSP on g.guest_Id = gSP.guestSelectedProductG_Id
  INNER JOIN selectedProduct sP on gSP.guestSelectedProductS_Id = sP.selectedProduct_Id
  INNER JOIN product p on sP.selectedProductP_Id = p.product_Id
  INNER JOIN category c on p.productCategory_Id = c.category_Id
  INNER JOIN list l on sP.selectedProductList_Id = l.list_Id
  INNER JOIN user u on l.listU_Id = u.user_Id
  WHERE guestName LIKE ?;
  `
  const name = req.params.name
  try {
    await connection.query(sql, [name], (error, results) => {
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

// Create new guest and greeting
router.post('/api/guest', async (req, res) => {
  const params = [
    req.body.guestName,
    req.body.guestGreeting,
    req.body.productId,
    req.body.amountItems,
  ]
  const sql = `CALL buyProduct(?,?,?,?)`
  console.log(params)

  try {
    await connection.query(sql, params, (error) => {
      if (error) {
        if (error) throw error
      }
      return res.status(201).json({
        success: true,
        message: 'New guest and greeting added.',
      })
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    })
  }
})

// As guest, change greeting

router.put('/api/guest', async (req, res) => {
  const params = [req.body.guestName, req.body.guestGreeting, req.body.guest_Id]
  const sql =
    'UPDATE guest SET guestName = ?, guestGreeting = ? WHERE guest_Id = ?'

  try {
    await connection.query(sql, params, (error, result) => {
      if (error) {
        if (error) throw error
      }
      return res.status(201).json({
        success: true,
        message: 'Greeting has been changed',
      })
    })
  } catch (error) {
    return res.status(500).json({
      succes: false,
      error: error.message,
    })
  }
})

// Remove greeting (restore default amount wished for?)

router.delete('/api/guest', async (req, res) => {
  let sql = 'DELETE FROM guest WHERE guest_Id = ?'

  try {
    await connection.query(sql, [req.body.guest_Id], (error, results) => {
      if (error) {
        if (error) throw error
      }
      return res.status(201).json({
        success: true,
        message: 'Guest and greeting has been deleted',
      })
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    })
  }
})

module.exports = router
