var express = require('express'),
	router = express.Router();

router.get('/', require('./controllers/indexController'));

router.get('/game/:id', require('./controllers/gameController'));

module.exports = router;