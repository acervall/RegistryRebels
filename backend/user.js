const express = require('express')
const connection = require('../connection')
const router = express.Router()
const cors = require('cors')

const bodyParser = require('body-parser')
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))

router.use(cors())
const port = 3000

// GET all users
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

// GET a single user by id
router.get('/api/user/:id', async (req, res) => {
  const id = req.params.id
  const sql = 'SELECT * FROM user WHERE user_Id = ?'
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

// ADD a user
router.post('/api/user', async (req, res) => {
  const sql =
    'INSERT INTO user (userName, userEmail, userPassword) VALUES (?,?,?)'
  const params = [req.body.userName, req.body.userEmail, req.body.userPassword]

  try {
    await connection.query(sql, params, function (error, results, fields) {
      if (error) {
        if (error) throw error
      }
      return res.status(201).json({
        success: true,
        error: '',
        message: 'Du har lagt till en ny användare!',
      })
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    })
  }
})

// CHANGE user info
router.put('/api/user', async (req, res) => {
  const sql =
    'UPDATE user SET userName = ?, userEmail = ?, userPassword = ? WHERE user_Id = ?'
  const params = [
    req.body.userName,
    req.body.userEmail,
    req.body.userPassword,
    req.body.user_Id,
  ]

  try {
    await connection.query(sql, params, function (error, results, fields) {
      if (error) {
        if (error) throw error
      }
      return res.status(201).json({
        success: true,
        error: '',
        message: 'Du har ändrat användar-informationen',
      })
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    })
  }
})

// DELETE user
router.delete('/api/user', async (req, res) => {
  console.log(req.body)
  let sql = 'DELETE FROM user WHERE user_Id = ?'

  try {
    await connection.query(
      sql,
      [req.body.user_Id],
      function (error, results, fields) {
        if (error) {
          if (error) throw error
        }
        return res.status(201).json({
          success: true,
          error: '',
          message: 'Användaren är nu raderad!',
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
