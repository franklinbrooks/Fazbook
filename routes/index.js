var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/users');
});

router.get('/new', function(req, res, next) {
  res.redirect('/users/new');
});

module.exports = router;
