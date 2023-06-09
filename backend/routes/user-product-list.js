const express = require('express')
const connection = require('../connection')
const router = express.Router()

// CRUD

// Get all lists
router.get('/api/user-product-list', async (req, res) => {
  const sql = 'SELECT * FROM list'
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

// Get all lists for user
router.get('/api/user-product-list/user/:id', async (req, res) => {
  const id = req.params.id
  const sql = `
  SELECT * FROM list as l
  INNER JOIN user as u ON l.listU_Id = u.user_Id
  WHERE u.user_Id = ?
  `
  try {
    await connection.query(sql, [id], (error, results) => {
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

// GET a single list by id
router.get('/api/user-product-list/:id', async (req, res) => {
  const id = req.params.id
  const sql = 'SELECT * FROM list WHERE list_Id = ?'
  try {
    await connection.query(sql, [id], (error, results) => {
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

// Retrieve list from url
router.get('/api/user-list/:url', async (req, res) => {
  const url = req.params.url
  const sql = 'SELECT * FROM list WHERE listUrl = ?'
  try {
    await connection.query(sql, [url], (error, results) => {
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

// ADD a list
router.post('/api/user-product-list', async (req, res) => {
  const sql =
    'INSERT INTO list (listName, listImage, listUrl, listDate, listU_Id) VALUES (?,?,?,?,?)'
  const params = [
    req.body.listName,
    req.body.listImage,
    req.body.listUrl,
    req.body.listDate,
    req.body.listU_Id,
  ]

  try {
    await connection.query(sql, params, function (error, results, fields) {
      if (error) {
        if (error) throw error
      }
      return res.status(201).json({
        success: true,
        error: '',
        message: 'Du har lagt till en ny lista!',
      })
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    })
  }
})

// CHANGE list
router.put('/api/user-product-list', async (req, res) => {
  const sql = 'UPDATE list SET listName = ?, listU_Id = ? WHERE list_Id = ?'
  const params = [req.body.listName, req.body.listU_Id, req.body.list_Id]

  try {
    await connection.query(sql, params, function (error, results, fields) {
      if (error) {
        if (error) throw error
      }
      return res.status(201).json({
        success: true,
        error: '',
        message: 'Du har ändrat i listan',
      })
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    })
  }
})

// DELETE list
router.delete('/api/user-product-list', async (req, res) => {
  console.log(req.body)
  let sql = 'DELETE FROM list WHERE list_Id = ?'

  try {
    await connection.query(
      sql,
      [req.body.list_Id],
      function (error, results, fields) {
        if (error) {
          if (error) throw error
        }
        return res.status(201).json({
          success: true,
          error: '',
          message: 'Listan är nu raderad!',
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
