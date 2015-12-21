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
        Value: '5Belgrave',
        Name: '5 Belgrave',
        ShortName: '5 Blgrv',
        Rooms: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
    },
    {
        Value: '7Belgrave',
        Name: '7 Belgrave',
        ShortName: '7 Blgrv',
        Rooms: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    },
    {
        Value: '74Belgrave',
        Name: '74 Belgrave',
        ShortName: '74 Blgrv',
        Rooms: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
    },
    {
        Value: 'Blythswood',
        Name: 'Blythswood',
        ShortName: 'Blytswd',
        Rooms: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    },
    {
        Value: 'Glencoe',
        Name: 'Glencoe',
        ShortName: 'Glno',
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