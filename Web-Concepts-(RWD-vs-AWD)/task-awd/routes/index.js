var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {

  req.device.type == 'phone' ? res.render('mobile') : res.render('desktop');

});

module.exports = router;
