var express = require('express');
var bodyParser = require('body-parser');
var contacts = require('./config/contacts.json');
var housesWithRooms = require('./config/houses.json');

var app = express();

var port = process.env.PORT || 3000;
var nav = [{
    Link: '/',
    Text: 'Admin'
}];

var router = require('./src/routes/router')(nav, housesWithRooms, contacts);

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