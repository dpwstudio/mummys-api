'use strict';

const {
	Storage
 } = require('@google-cloud/storage');
 const Multer = require('multer');
 
 const CLOUD_BUCKET = 'chronchain-ws.appspot.com';
 
 const storage = new Storage({
	keyFilename: "./helpers/chronchain-ws-058c15eba5ae.json"
 });
 const bucket = storage.bucket(CLOUD_BUCKET);
 
 function getPublicUrl(filename) {
	return `https://storage.cloud.google.com/${CLOUD_BUCKET}/${filename}`;
 }
 
 function sendUploadToGCS(req, res, next) {
	if (!req.file) {
	  return next();
	}
 
	const gcsname = Date.now() + req.file.originalname;
	const file = bucket.file(gcsname);
 
	const stream = file.createWriteStream({
	  metadata: {
		 contentType: req.file.mimetype
	  },
	  resumable: false
	});
 
	stream.on('error', (err) => {
	  console.log('err', err);
	  req.file.cloudStorageError = err;
	  next(err);
	});
 
	stream.on('finish', () => {
	  req.file.cloudStorageObject = gcsname;
	  file.makePublic().then(() => {
		 req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
		 next();
	  });
	});
	console.log('finish');
	stream.end(req.file.buffer);
 }
 
 const multer = Multer({
	storage: Multer.MemoryStorage,
	limits: {
	  fileSize: 5 * 1024 * 1024 // no larger than 5mb
	}
 });

module.exports = {
	getPublicUrl,
	sendUploadToGCS,
	multer
};