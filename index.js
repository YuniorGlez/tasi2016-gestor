var express = require('express');
var app = express();
var mongojs = require('mongojs');
var bodyParser = require('body-parser');
var uri = 'mongodb://heroku_ng4vzrc8:7eiqqmqn0rldusdpvt2rb6u4hg@ds011419.mlab.com:11419/heroku_ng4vzrc8';
var db = mongojs(uri, ['noticias']);
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
//mongo.MongoClient.connect(uri, function (err, db) {
//    if (err) throw err;
//});

app.get('/', function (request, response) {
    response.render('index.html');
});

app.get('/notices', function (req, res) {
    console.log(typeof parseInt(req.params.id));
    db.noticias.find({}, function (err, items) {
        if (err) throw err;
        console.log(items);
        res.json(items); // LINEA QUE PETA
    });
});
app.delete('/notices', function (req, res) {
    noticias.remove({}, function (err,items) {
        if (err) throw err;
        console.log(items); 
        res.send('Todo borrado');
    });
}); 
app.post('/notices', function (req, res) {
    console.log(req.body);
    noticias.insert(req.body, function (err, items) {
        if (err) throw err;
        res.send('Metido');
    });
});
app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});