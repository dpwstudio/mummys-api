const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const connection = require('../db/db');

/* GET users listing. */
router.get('/', function (req, res) {
  connection.query('SELECT * FROM users', function (error, results, fields) {
    if (error) throw error;
    return res.send([...results]);
  });
});

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
      const users = {
        "lastName": req.body.lastName,
        "firstName": req.body.firstName,
        "email": req.body.email,
        "password": hash,
        "created_at": today,
      }
      connection.query('SELECT * FROM users WHERE email = ?', [email], function (error, results, fields) {
        if (results.length > 0) {
          res.status(409).json({
            message: 'Email already exists'
          })
        } else {
          connection.query('INSERT INTO users SET ?', users, function (error, results, fields) {
            if (error) {
              res.status(405).json({
                error: 'There are some error with query'
              })
            } else {
              res.status(200).json({
                message: 'User created successfully'
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

//Delete user
router.delete('/users/:id',(req, res) => {
  const id = req.params.id;
  let sql = `DELETE FROM users WHERE id=${id}`;
  connection.query(sql, (err, results) => {
    if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

module.exports = router;