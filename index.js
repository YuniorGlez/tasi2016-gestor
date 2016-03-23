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

app.get('/', function (request, response) {
    response.render('index.html');
});

app.get('/notices', function (req, res) {
    db.noticias.find({}, function (err, items) {
        if (err) return console.log('err=' + JSON.stringify(err));
        return res.json(items); 
    });
});
app.delete('/notices/:id', function (req, res) {
	var id = parseInt(req.params.id);
    db.noticias.remove({_id:id}, function (err) {
        if (err) throw err;
        return res.send('Noticia con id = ' id + ' borrado con exito');
    });
}); 
app.get('/notices/:id', function (req, res) {
	var id = parseInt(req.params.id);
    db.noticias.finOne({_id:id}, function (err, notice) {
        if (err) throw err;
        return res.json(notice);
    });
}); 
app.post('/notice', function (req, res) {
    console.log(req.body);
    db.noticias.insert(req.body, function (err, items) {
        if (err) throw err;
        res.send('Metido');
    });
});

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});