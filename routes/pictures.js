const express = require('express');
const multer = require('multer');
const router = express.Router();
const path = require('path');
const moment = require('moment');

const DIR = './public/images/uploads';

// Configure Storage
var storage = multer.diskStorage({

	// Setting directory on disk to save uploaded files
	destination: function (req, file, cb) {
		cb(null, DIR)
	},

	// Setting name of file saved
	filename: function (req, file, cb) {
		const date = moment().format("YYYYMMDD_hhmm");
		cb(null, date + '_' + file.originalname)
	}
})

var upload = multer({
	storage: storage,
	limits: {
		// Setting Image Size Limit to 20MBs
		fileSize: 20000000
	},
	fileFilter(req, file, cb) {
		if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
			//Error 
			cb(new Error('Please upload JPG and PNG images only!'))
		}
		//Success 
		cb(undefined, true)
	}
})

router.post('/', upload.single('uploadedImg'), (req, res, next) => {
	const file = req.file
	console.log('file', file);
	if (!file) {
		const error = new Error('Please upload a file')
		error.httpStatusCode = 400
		return next(error)
	}
	res.status(200).send({
		statusCode: 200,
		status: 'success',
		uploadedFile: file
	})

}, (error, req, res, next) => {
	res.status(400).send({
		error: error.message
	})
})
module.exports = router;