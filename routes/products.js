const express = require('express');
const router = express.Router();
const _ = require('lodash');
const connection = require('../db/db');
const moment = require('moment');


/**
 * GET Products
 */
router.get('/', function (req, res, next) {
  try {
    connection.query('SELECT * FROM products', function (error, results, fields) {
      if (error) throw error;
      res.status(200).json([...results]);
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

/**
 * GET Products by id
 */
router.get('/:id', (req, res, next) => {
  try {
    const id = req.params.id;
    connection.query('SELECT * FROM products WHERE id = ?', id, (error, result) => {
      if (result.length === 0) {
        res.status(404).json({
          message: 'Property not found'
        });
      } else {
        res.status(200).json([...result]);
      }
      connection.on('error', function (err) {
        console.log(err.code); // 'ER_BAD_DB_ERROR'
      });
    });
  } catch (err) {
    res.status(500).send(err);
  }
});


/**
 * POST products
 */
router.post('/', (req, res) => {
  console.log('req', req.body);
  try {
    if (req) {
      const today = new Date();
      const product = {
        "image": moment(today).format("YYYYMMDD_hhmm") + '_' + req.body.image,
        "name": req.body.name,
        "category": req.body.category,
        "ingredient": req.body.ingredient,
        "description": req.body.description,
        "price": req.body.price,
        "createdAt": today,
      }
      console.log('product', product);
      connection.query('INSERT INTO products SET ?', product, function (error, results, fields) {
        if (error) {
          res.status(400).json({
            error: error,
            message: 'There are some error with query'
          })
        } else {
          res.status(200).json({
            message: 'Products created successfully.'
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
 * PUT products by id
 */
router.put('/:id', function (req, res, next) {
  const id = req.params.id;
  console.log('req', req.body);
  const product = {
    image: today + '_' + req.body.image,
    name: req.body.title,
    category: req.body.address,
    ingredient: req.body.description,
    description: req.body.description,
    price: req.body.price,
    createdAt: today,
  }

  connection.query('SELECT * FROM products WHERE id = ?', [id], function (error, results, fields) {
    if (results.length === 0) {
      res.status(200).json({
        message: 'Product doesn\'t exists.'
      });
    } else {
      const sql = `UPDATE products SET 
        name="${product.name}",
        category="${category}",
        category="${category}",
        ingredient="${ingredient}",
        description="${description}"
        price="${price}"
        WHERE id=${id}`;
      connection.query(sql, function (err, result) {
        if (err) {
          console.log('err', err);
          res.status(500).json({
            error: 'Something went wrong!'
          })
        }
        res.status(200).json({
          message: 'Product has been successfully updated.'
        });
      });
    }
  });
});

/**
 * DELETE Products by id
 */
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);
  let sql = `DELETE FROM products WHERE id=${id}`;
  connection.query(sql, function (err, result) {
    console.log('result', sql);
    if (err) {
      res.status(500).json({
        error: 'Something went wrong!'
      })
    }
    res.status(200).json({
      message: 'Product has been successfully deleted.'
    });
  });
});


module.exports = router;