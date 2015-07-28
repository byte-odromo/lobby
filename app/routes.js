var express = require('express'),
	router = express.Router();

router.get('/', require('./controllers/indexController'));
router.get('/test', function( req, res, next ){
	res.render('test.html');
});

router.get('/game/:id', require('./controllers/gameController'));

module.exports = router;