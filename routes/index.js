var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'HomeAppv2', footer: "Copyleft Tomas Harkema 2014. " + process.env.NODE_ENV.toLowerCase() });
});

module.exports = router;
