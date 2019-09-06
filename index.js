require('dotenv').config();

console.log(process.env);

var express = require('express');
var bodyParser = require('body-parser'); //request body
var cookieParser = require('cookie-parser');

var userRoutes = require('./routes/user.route');
var authRoutes = require('./routes/auth.route');

var authMiddleware = require('./middleware/auth.middleware');

var port = 3000;

var app = express();
app.set('view engine', 'pug');
app.set('views', './views');

app.use(cookieParser(process.env.SESSION_SECRECT));

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// var users= [
// 	{ id:1, name:"Kien" },
// 	{ id:2, name:"Anh" },
// 	{ id:3, name:"Hoang An" }
// ];

app.get('/', function(req, res){
	res.render('index', {
		name: 'Me'
	});
});

app.use('/users', authMiddleware.requireAuth, userRoutes);
app.use('/auth', authRoutes);


app.listen(port, function(){
	console.log('Server listening on port ' + port);
});
