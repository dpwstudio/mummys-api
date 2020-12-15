const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const connection = require('../db/db');

/**
 * GET Users
 */
router.get('/', function (req, res) {
  connection.query('SELECT * FROM users', function (error, results, fields) {
    if (error) throw error;
    return res.send([...results]);
  });
});

/**
 * POST Users
 */
router.post('/', function (req, res, next) {
  try {
    const password = req.body.password;
    bcrypt.hash(password, 10, function (err, hash) {
      if (err) {
        console.error(err)
        return
      }

      console.log('req.body', req.body);

      const today = new Date();
      const user = {
        "lastName": req.body.lastName,
        "firstName": req.body.firstName,
        "email": req.body.email,
        "password": hash,
        "createdAt": today,
      }
      connection.query('SELECT * FROM users WHERE email = ?', [email], function (error, results, fields) {
        if (results.length > 0) {
          res.status(409).json({
            message: 'Email already exists'
          })
        } else {
          connection.query('INSERT INTO users SET ?', user, function (error, results, fields) {
            if (error) {
              res.status(405).json({
                error: 'There are some error with query'
              })
            } else {
              res.status(200).json({
                message: 'User has been successfully created.'
              })
            }
          });
        }
      });
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

/**
 * GET User by id
 */
router.get('/:id', (req, res) => {
  try {
    const id = req.params.id;
    connection.query('SELECT * FROM users WHERE id = ?', id, (error, result) => {
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
 * PUT Orders by id
 */
router.put('/:id', function (req, res, next) {
  const id = req.params.id;
  console.log('id', id);
  console.log('req', req.body);
  const users = {
    address: req.body.address,
    zipcode: req.body.zipcode,
    city: req.body.city,
  }

  connection.query('SELECT * FROM users WHERE id = ?', [id], function (error, results, fields) {
    if (results.length === 0) {
      res.status(200).json({
        message: 'Product doesn\'t exists.'
      });
    } else {
      const sql = `UPDATE users SET address="${users.address}", zipcode="${users.zipcode}", city="${users.city}" WHERE id=${id}`;
      connection.query(sql, function (err, result) {
        if (err) {
          console.log('err', err);
          res.status(500).json({
            error: 'Something went wrong!'
          })
        }
        res.status(200).json({
          message: 'Users has been successfully updated.'
        });
      });
    }
  });
});

/**
 * DELETE User by id
 */
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  let sql = `DELETE FROM users WHERE id=${id}`;
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