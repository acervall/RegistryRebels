const express = require('express')
const connection = require('../connection')
const router = express.Router()

// GET all category
router.get('/api/category', async (req, res) => {
  const sql = 'SELECT * FROM category'
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

// GET a single category by id
router.get('/api/category/:id', async (req, res) => {
  const id = req.params.id
  const sql = 'SELECT * FROM category WHERE category_Id = ?'
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

// GET all products in a category
router.get('/api/category/:id/products', async (req, res) => {
  const categoryId = req.params.id
  const sql = `SELECT p.*, c.categoryName
    FROM product p
    JOIN category c ON productCategory_Id = c.category_Id
    WHERE productCategory_Id = ?
    `
  try {
    await connection.query(sql, [categoryId], (error, results) => {
      if (error) {
        console.error(error.sqlMessage)
        res.status(500).json({ error: error.sqlMessage })
      } else {
        res.json(results)
      }
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error })
  }
})

// CREATE a new category
router.post('/api/category', async (req, res) => {
  const { categoryName } = req.body
  const sql = 'INSERT INTO category (categoryName) VALUES (?)'
  try {
    await connection.query(sql, [categoryName], (error, result) => {
      if (error) {
        console.error(error.sqlMessage)
        res.status(500).json({
          error,
        })
      } else {
        const newCategory = {
          category_Id: result.insertId,
          categoryName,
        }
        res.status(201).json(newCategory)
      }
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      error,
    })
  }
})

// UPDATE an existing category
router.put('/api/category/:id', async (req, res) => {
  const id = req.params.id
  const { categoryName } = req.body
  const sql = 'UPDATE category SET categoryName = ? WHERE category_Id = ?'
  try {
    await connection.query(sql, [categoryName, id], (error, result) => {
      if (error) {
        console.error(error.sqlMessage)
        res.status(500).json({
          error,
        })
      } else if (result.affectedRows === 0) {
        res.status(404).json({
          message: `Category with id ${id} not found`,
        })
      } else {
        const updatedCategory = {
          category_Id: id,
          categoryName,
        }
        res.json(updatedCategory)
      }
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      error,
    })
  }
})

// DELETE a category
router.delete('/api/category/:id', async (req, res) => {
  const id = req.params.id
  const sql = 'DELETE FROM category WHERE category_Id = ?'
  try {
    await connection.query(sql, [id], (error, results) => {
      if (error) {
        console.error(error.sqlMessage)
        return res.status(500).json({
          error,
        })
      } else {
        if (results.affectedRows === 0) {
          return res.status(404).json({
            message: 'Category not found',
          })
        } else {
          return res.json({
            message: 'Category deleted successfully',
          })
        }
      }
    })
  } catch (error) {
    return res.status(500).json({
      error,
    })
  }
})
