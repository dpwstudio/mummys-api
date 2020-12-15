const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const connection = require('../db/db');

/**
 * GET Orders
 */
router.get('/', function (req, res) {
  connection.query('SELECT * FROM orders', function (error, results, fields) {
    if (error) throw error;
    return res.send([...results]);
  });
});

/**
 * POST Orders
 */
router.post('/', (req, res) => {
  console.log('req', req.body);
  try {
    if (req) {
      const today = new Date();
      const order = {
        "status": req.body.status,
        "clientName": req.body.clientName,
        "localization": req.body.localization,
        "total": req.body.total,
        "carts": req.body.carts,
        "createdAt": today,
        "userId": req.body.userId
      }
      console.log('order', order);
      connection.query('INSERT INTO orders SET ?', order, function (error, results, fields) {
        if (error) {
          res.status(400).json({
            error: error,
            message: 'There are some error with query'
          })
        } else {
          res.status(200).json({
            message: 'Order created successfully.'
          })
        }
      });
    }
  } catch (err) {
    console.log('err', err);
    res.status(500).json({
      error: error,
    });
  }
})


/**
 * GET Order by id
 */
router.get('/:id', (req, res) => {
  try {
    const id = req.params.id;
    connection.query('SELECT * FROM orders WHERE id = ?', id, (error, result) => {
      if (result.length === 0) {
        res.status(404).json({
          message: 'User not found'
        });
      } else {
        res.status(200).json([...result]);
      }
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

/**
 * PUT Order by id
 */
router.put('/:id', function (req, res, next) {
  console.log('req', req.body);
  const id = req.params.id;
  const status = req.body.status;

  connection.query('SELECT * FROM orders WHERE id = ?', [id], function (error, results, fields) {
    if (results.length === 0) {
      res.status(200).json({
        message: 'Orders doesn\'t exists.'
      });
    } else {
      const sql = `UPDATE orders SET status="${status}" WHERE id=${id}`;
      console.log('sql', sql);
      connection.query(sql, function (err, result) {
        if (err) {
          console.log('err', err);
          res.status(500).json({
            error: 'Something went wrong!'
          })
        }
        res.status(200).json({
          message: 'Orders has been successfully updated.'
        });
      });
    }
  });
});

/**
 * DELETE Order by id
 */
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  let sql = `DELETE FROM orders WHERE id=${id}`;
  connection.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({
      "status": 200,
      "error": null,
      "response": results
    }));
  });
});

module.exports = router;