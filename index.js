var express = require('express');
var app = express();
var mongo = require('mongodb');
var bodyParser = require('body-parser');
var noticias;
// URI to labMongoDB
var uri = 'mongodb://heroku_ng4vzrc8:7eiqqmqn0rldusdpvt2rb6u4hg@ds011419.mlab.com:11419/heroku_ng4vzrc8';
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
mongo.MongoClient.connect(uri, function (err, db) {
    if (err) throw err;
    noticias = db.collection('noticias');
});

app.get('/', function (request, response) {
    response.render('index.html');
});




app.get('/notices', function (req, res) {
    noticias.find(function (err, items) {
        if (err) throw err;
        res.send(items);
    });
});

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});