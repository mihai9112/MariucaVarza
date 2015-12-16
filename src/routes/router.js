var express = require('express');

var app = express();

var router = express.Router();

var routing = function (nav) {
    router.route('/')
        .get(function (req, res) {
            res.render('index', {
                title: 'Independent cleaner',
                nav: nav
            });
        });

    return router;
};

module.exports = routing;