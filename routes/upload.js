const express = require('express');
const Multer = require('multer');
const router = express.Router();
const _ = require('lodash');
const connection = require('../db/db');
const images = require('../helpers/images');

// const DIR = './public/uploads';

router.post('/', images.multer.single('fileData'), images.sendUploadToGCS, (req, res, next) => {
	console.log('req.body of /upload', req.body);
	console.log('req.file of /upload', req.file);
	let data = req.body;
	console.log('data', data);
	if (req.file && req.file.cloudStoragePublicUrl) {
		data.imageUrl = req.file.cloudStoragePublicUrl.replace(
			"https://storage.cloud.google.com/",
			"https://storage.googleapis.com/"
		);
		console.log('data.imageUrl', data.imageUrl);
	} else {
		res.status(500).json({
			error: error,
		});
	}
	const today = new Date();
	const certificates = {
		"brand": req.body.brand,
		"model": req.body.model,
		"amount": req.body.amount,
		"photos": data.imageUrl,
		"description": req.body.description,
		"asset": req.body.asset,
		"dateOfBuy": req.body.dateBuy,
		"created_at": today,
		"validated_at": null,
		"isValidated": null,
		"userId": req.body.userId,
		"usernameOwner": req.body.usernameOwner
	}
	console.log('certificates', certificates);
	connection.query('INSERT INTO certificates SET ?', certificates, function (error, results, fields) {
		if (error) {
			console.log('error', error);
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
});

router.post('/file', images.multer.single('fileProof'), images.sendUploadToGCS, (req, res, next) => {
	console.log('req.body of /upload/file', req.body);
	console.log('req.file of /upload/file', req.file);
	let data = req.body;
	console.log('data', data);
	if (req.file && req.file.cloudStoragePublicUrl) {
		data.imageUrl = req.file.cloudStoragePublicUrl.replace(
			"https://storage.cloud.google.com/",
			"https://storage.googleapis.com/"
		);
		console.log('data.imageUrl', data.imageUrl);
	} else {
		res.status(500).json({
			error: error,
		});
	}
	const today = new Date();
	const proofs = {
		"brand": req.body.brand,
		"model": req.body.model,
		"amount": req.body.amount,
		"description": req.body.description,
		"asset": req.body.asset,
		"dateOfBuy": req.body.dateBuy,
		"actOfBuy": data.imageUrl,
		"created_at": today,
		"userId": req.body.userId,
		"usernameOwner": req.body.usernameOwner
	}
	console.log('proofs', proofs);
	connection.query('INSERT INTO proofs SET ?', proofs, function (error, results, fields) {
		if (error) {
			console.log('error', error);
			res.status(400).json({
				error: error,
				message: 'There are some error with query'
			})
		} else {
			res.status(200).json({
				message: 'Proofs created successfully.'
			})
		}
	});
});

router.post('/add', images.multer.single('image'), images.sendUploadToGCS, (req, res, next) => {
	console.log('req', req);
	let data = req.body;
	if (req.file && req.file.cloudStoragePublicUrl) {
		data.imageUrl = req.file.cloudStoragePublicUrl;
		console.log('data.imageUrl', data.imageUrl);
		res.status(200).json({
			message: 'success',
		});
	} else {
		res.status(500).json({
			message: error,
		});
	}
});
module.exports = router;