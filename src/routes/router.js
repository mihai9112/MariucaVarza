var express = require('express');

var app = express();

var router = express.Router();

var routing = function (nav, houses) {
    router.route('/')
        .get(function (req, res) {
            res.render('index', {
                title: 'Independent cleaner',
                nav: nav,
                houses: houses
            });
        });
    return router;
};

module.exports = routing;