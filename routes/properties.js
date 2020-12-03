const express = require('express');
const router = express.Router();
const _ = require('lodash');
const connection = require('../db/db');
const moment = require('moment');


/* GET properties listing. */
router.get('/', function (req, res, next) {
  try {
    connection.query('SELECT * FROM properties', function (error, results, fields) {
      if (error) throw error;
      res.status(200).json([...results]);
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/:id', (req, res, next) => {
  try {
    const id = req.params.id;
    connection.query('SELECT * FROM properties WHERE id = ?', id, (error, result) => {
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

router.post('/', (req, res) => {
  console.log('req', req.body);
  try {
    if (req) {
      const today = moment().format("YYYYMMDD_hhmm");
      const properties = {
        "image":  today + '_' + req.body.image,
        "title": req.body.title,
        "address": req.body.address,
        "country": req.body.country,
        "description": req.body.description,
        "price": req.body.price,
        "createdAt": today,
        "userId": req.body.userId
      }
      console.log('properties', properties);
      connection.query('INSERT INTO properties SET ?', properties, function (error, results, fields) {
        if (error) {
          res.status(400).json({
            error: error,
            message: 'There are some error with query'
          })
        } else {
          res.status(200).json({
            message: 'Property created successfully.'
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

// router.put('/:id', function (req, res, next) {
//   const id = req.params.id;
//   console.log('req', req.body);
//   const validated = req.body.isValidated;
//   const validated_at = moment(req.body.validated_at).format("YYYY-MM-DD HH:mm:ss");
//   connection.query('SELECT * FROM certificates WHERE id = ?', [id], function (error, results, fields) {
//     if (results.length === 0) {
//       res.status(200).json({
//         message: 'Certificate doesn\'t exists'
//       });
//     } else {
//       const sql = `UPDATE certificates SET validated_at="${validated_at}", isValidated="${validated}"  WHERE id=${id}`;
//       connection.query(sql, function (err, result) {
//         if (err) {
//           console.log('err', err);
//           res.status(500).json({
//             error: 'Something went wrong!'
//           })
//         }
//         res.status(200).json({
//           message: 'Certificates has been validated.'
//         });
//       });
//     }
//   });
// });

// //Delete certificates
// router.delete('/:id', (req, res) => {
//   const id = req.params.id;
//   console.log(id);
//   let sql = `DELETE FROM certificates WHERE id=${id}`;
//   connection.query(sql, function (err, result) {
//     console.log('result', sql);
//     if (err) {
//       res.status(500).json({
//         error: 'Something went wrong!'
//       })
//     }
//     res.status(200).json({
//       message: 'Certificates has been deleted.'
//     });
//   });
// });


module.exports = router;