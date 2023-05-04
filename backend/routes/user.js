const express = require('express')
const connection = require('../connection')
const router = express.Router()

router.get('/api/user', async (req, res) => {
  const sql = 'SELECT * FROM user'
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

module.exports = router
