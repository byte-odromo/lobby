var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', require('../controllers/indexController'));

router.get('/screen/:id', require('../controllers/screenController'));

module.exports = router;
