var express = require('express');
var config = require('../../configuration.json');
var twilio = require('twilio')(config.accountSid, config.authToken);
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

    router.route('/sendsms')
        .post(function (req, res) {
            twilio.messages.create({
                to: config.to,
                from: config.from,
                body: req.body.message,
            }, function (err, message) {
                console.log(err);
            });
            res.end();
        });
    return router;
};

module.exports = routing;