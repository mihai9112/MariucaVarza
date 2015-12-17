var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var port = process.env.PORT || 3000;
var nav = [{
    Link: '/',
    Text: 'Admin'
}];

var houses = [
    {
        Name: 'Belgrave'
    },
    {
        Name: 'Blythswood'
    },
    {
        Name: 'Glencoe'
    }
];
var router = require('./src/routes/router')(nav, houses);

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