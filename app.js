var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var port = process.env.PORT || 3000;
var nav = [{
    Link: '/',
    Text: 'Admin'
}];

var housesWithRooms = [
    {
        Label: '5Belgrave',
        Name: '5 Belgrave',
        Rooms: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
    },
    {
        Label: '7Belgrave',
        Name: '7 Belgrave',
        Rooms: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    },
    {
        Label: '74Belgrave',
        Name: '74 Belgrave',
        Rooms: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
    },
    {
        Label: 'Blythswood',
        Name: 'Blythswood',
        Rooms: [1, 2, 3, 4, 5, 6, 7, 8]
    },
    {
        Label: 'Glencoe',
        Name: 'Glencoe',
        Rooms: [1, 2, 3, 4, 5, 6, 7, 8]
    }
];
var router = require('./src/routes/router')(nav, housesWithRooms);

app.use(express.static('public'));
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use('/', router);

app.listen(port, function (err) {
    console.log('running server on port ' + port);
});