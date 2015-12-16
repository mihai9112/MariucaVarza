var express = require('express');

var app = express();

var router = express.Router();

router.route('/')
    .get(function (req, res) {
        res.render('index', {
            title: 'Independent cleaner',
            nav: [{
                Link: '/',
                Text: 'Admin'
            }]
        });
    });

module.exports = router;