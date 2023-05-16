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
