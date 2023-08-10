var express = require('express');
var router = express.Router();

/* GET home page. */
router.route('/')
    .get(function (req, res, next) {

        res.setHeader('Content-Type', 'application/json');
        res.json({ 'data': 'Homepage' });
    });

module.exports = router;