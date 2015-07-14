var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/screen', function(req, res, next) {
  res.render('screen', { title: 'Screen' });
});

module.exports = router;
