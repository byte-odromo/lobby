var express = require('express'),
	router = express.Router();

/* GET home page. */
router.get('/', require('../controllers/indexController'));

router.get('/screen/:id', require('../controllers/screenController'));

router.get('/test', require('../controllers/testController'));

module.exports = router;
