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