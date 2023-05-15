const express = require('express')
const connection = require('../connection')
const router = express.Router()


// Get all guestselectedproduct
router.get('/api/guestSelectedProducts', async (req, res) => {
  const sql = 'SELECT * FROM guestSelectedProduct';
  try {
    await connection.query(sql, (error, results) => {
      if (error) {
        console.error(error.sqlMessage);
      } else {
        res.json(results);
      }
    });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
});

// Get a single product by id
router.get('/api/guestSelectedProducts/:id', async (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM guestSelectedProduct WHERE guestSelectedProduct_Id = ?';
  try {
    await connection.query(sql, [id], (error, results) => {
      if (error) {
        console.error(error.sqlMessage);
        res.status(500).json({ error });
      } else {
        if (results.length === 0) {
          res.status(404).json({ message: 'Product not found' });
        } else {
          res.json(results[0]);
        }
      }
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
});


// Add a new guestselectedproduct
router.post('/api/guestSelectedProducts', async (req, res) => {
  const { guestSelectedProductS_Id, guestSelectedProductG_Id, productPurchased } = req.body;
  const sql = 'INSERT INTO guestSelectedProduct (guestSelectedProductS_Id, guestSelectedProductG_Id, productPurchased) VALUES (?, ?, ?)';
  try {
    await connection.query(sql, [guestSelectedProductS_Id, guestSelectedProductG_Id, productPurchased], (error, results) => {
      if (error) {
        console.error(error.sqlMessage);
        res.status(500).json({ error });
      } else {
        res.status(201).json({ message: 'Guest selected product added successfully', insertId: results.insertId });
      }
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

// Update a guestselectedproduct by id
router.put('/api/guestSelectedProducts/:id', async (req, res) => {
  const { id } = req.params;
  const { guestSelectedProductS_Id, guestSelectedProductG_Id, productPurchased } = req.body;
  const sql = 'UPDATE guestSelectedProduct SET guestSelectedProductS_Id = ?, guestSelectedProductG_Id = ?, productPurchased = ? WHERE guestSelectedProduct_Id = ?';
  try {
    await connection.query(sql, [guestSelectedProductS_Id, guestSelectedProductG_Id, productPurchased, id], (error, results) => {
      if (error) {
        console.error(error.sqlMessage);
        res.status(500).json({ error });
      } else {
        res.json({ message: 'Guest selected product updated successfully', affectedRows: results.affectedRows });
      }
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

// Delete a guestselectedproduct by id
router.delete('/api/guestSelectedProducts/:id', async (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM guestSelectedProduct WHERE guestSelectedProduct_Id = ?';
  try {
    await connection.query(sql, [id], (error, results) => {
      if (error) {
        console.error(error.sqlMessage);
        res.status(500).json({ error });
      } else {
        res.json({ message: 'Guest selected product deleted successfully', affectedRows: results.affectedRows });
      }
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

module.exports = router;
