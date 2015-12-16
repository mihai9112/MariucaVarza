var express = require('express');

var app = express();

var port = process.env.PORT || 3000;
var router = require('./src/routes/router');

app.use(express.static('public'));
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/', router);

app.listen(port, function (err) {
    console.log('running server on port ' + port);
});