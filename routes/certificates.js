const express = require('express');
const router = express.Router();
const _ = require('lodash');
const connection = require('../db/db');
const moment = require('moment');
const multer = require('multer');
const io = require('../socket/socket');
const DIR = './public/uploads';

const Storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, DIR)
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`)
  },
})

const upload = multer({
  storage: Storage
})

/* GET certificates listing. */
router.get('/', function (req, res, next) {
  try {
    connection.query('SELECT * FROM certificates', function (error, results, fields) {
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
    connection.query('SELECT * FROM certificates WHERE id = ?', id, (error, result) => {
      if (result.length === 0) {
        res.status(404).json({
          message: 'Certificate not found'
        });
      } else {
        res.status(200).json([...result]);
      }
      connection.on('error', function(err) {
        console.log(err.code); // 'ER_BAD_DB_ERROR'
      });
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post('/', upload.array('photo', 3), (req, res) => {
  try {
    if (req) {
      let data = [];

      if (req.files) {
        //loop all files
        if (req.files.length > 1) {
          console.log('req.files.length > 1', req.files);
          _.forEach(_.keysIn(req.files), (key) => {
            let photo = req.files.photos[key];

            //push file details
            data.push({
              name: photo.filename,
              mimetype: photo.mimetype,
              size: photo.size
            });
          });
        } else if (req.files.length === 1) {
          console.log('req.files.length = 0', req.files);
            //push file details
            data.push({
              name: req.files[0].filename,
              mimetype: req.files[0].mimetype,
              size: req.files[0].size
            });
            console.log('data', data);
        } else {
          data = [];
        }
      }

      const today = new Date();
      const certificates = {
        "brand": req.body.brand,
        "model": req.body.model,
        "amount": req.body.amount,
        "photos": JSON.stringify(data),
        "description": req.body.description,
        "asset": req.body.asset,
        "created_at": today,
        "validated_at": null,
        "userId": req.body.userId
      }
      console.log('certificates', certificates);
      connection.query('INSERT INTO certificates SET ?', certificates, function (error, results, fields) {
        if (error) {
          res.status(400).json({
            error: error,
            message: 'There are some error with query'
          })
        } else {
          res.status(200).json({
            message: 'Certificate created successfully.'
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

router.put('/:id', function (req, res, next) {
  const id = req.params.id;
  console.log('req', req.body);
  const validated = req.body.isValidated;
  const validated_at = moment(req.body.validated_at).format("YYYY-MM-DD HH:mm:ss");
  connection.query('SELECT * FROM certificates WHERE id = ?', [id], function (error, results, fields) {
    if (results.length === 0) {
      res.status(200).json({
        message: 'Certificate doesn\'t exists'
      });
    } else {
      const sql = `UPDATE certificates SET validated_at="${validated_at}", isValidated="${validated}"  WHERE id=${id}`;
      connection.query(sql, function (err, result) {
        if (err) {
          console.log('err', err);
          res.status(500).json({
            error: 'Something went wrong!'
          })
        }
        res.status(200).json({
          message: 'Certificates has been validated.'
        });
      });
    }
  });
});

//Delete certificates
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);
  let sql = `DELETE FROM certificates WHERE id=${id}`;
  connection.query(sql, function (err, result) {
    console.log('result', sql);
    if (err) {
      res.status(500).json({
        error: 'Something went wrong!'
      })
    }
    res.status(200).json({
      message: 'Certificates has been deleted.'
    });
  });
});


module.exports = router;