var express = require('express'),
	router = express.Router();

router.get('/', require('./controllers/indexController'));

module.exports = router;