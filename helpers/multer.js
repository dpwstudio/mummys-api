var upload = multer({
	storage: storage,
	limits: {
		// Setting Image Size Limit to 2MBs
		fileSize: 2000000
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