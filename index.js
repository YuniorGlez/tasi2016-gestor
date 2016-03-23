var express = require('express');
var app = express();
var mongojs = require('mongojs');
var bodyParser = require('body-parser');
var uri = 'mongodb://heroku_ng4vzrc8:7eiqqmqn0rldusdpvt2rb6u4hg@ds011419.mlab.com:11419/heroku_ng4vzrc8';
var db = mongojs(uri, ['noticias', 'contadores']);
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.all('*', function (req, res, next) {
	req.accepts('application/json');
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET');
	next();
});
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
	db.noticias.remove({_id: id}, function (err) {
		if (err) throw err;
		return res.send('Noticia con id = ' + id + ' borrado con exito');
	});
});
app.get('/notice/:id', function (req, res) {
	var id = parseInt(req.params.id);
	db.noticias.findOne({_id: id} , function (err,notice) {
		if (err) throw err;
		return res.json(notice);
	});
});
app.post('/notice', function (req, res) {
	var validate = true;
	if (validate) {
		getNextSequence('noticias', function (nextId) {
			db.noticias.insert({
				_id: nextId,
				img: req.body.img,
				titulo: req.body.titulo,
				cuerpo: req.body.cuerpo
			}, function (err, items) {
				if (err) throw err;
				res.send('Metido');
			});
		})
	}

});

function getNextSequence(name, callback) {
	db.contadores.findAndModify({
		query: {
			_id: name
		},
		update: {
			$inc: {
				seq: 1
			}
		}
	}, function (err, contador, other) {
		if (err) console.log('err= ' + err);
		return callback(contador.seq);
	});
}

app.listen(app.get('port'), function () {
	//	db.noticias.remove({});
	//	db.contadores.insert({_id:'noticias', seq: 0});
	console.log('Node app is running on port', app.get('port'));
});