var express = require('express');

var app = express();

var router = express.Router();

var housesWithRooms = [
    {
        Name: 'Belgrave',
        Rooms: [1, 2, 3, 4, 5]
    },
    {
        Name: 'Blythswood',
        Rooms: [6, 7, 8, 9, 10]
    },
    {
        Name: 'Glencoe',
        Rooms: [11, 12, 13, 14, 15]
    }
];

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
            for (var i = 0; i < housesWithRooms.length; i++) {
                if (housesWithRooms[i].Name === req.body.data) {
                    res.send(housesWithRooms[i].Rooms);
                }
            }
        });

    return router;
};

module.exports = routing;