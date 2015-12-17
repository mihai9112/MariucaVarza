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
        })
        .post(function (req, res) {
            console.log(req.body.data);
            res.send('bleak');
        });

    return router;
};

module.exports = routing;