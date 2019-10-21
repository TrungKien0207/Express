require('dotenv').config();


var express = require('express');
var bodyParser = require('body-parser'); //request body
var cookieParser = require('cookie-parser');
var csurf = require('csurf');
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);

var userRoutes = require('./routes/user.route');
var authRoutes = require('./routes/auth.route');
var productRoutes = require('./routes/product.route');
var cartRoute = require('./routes/cart.route');
var transferRoute = require('./routes/transfer.route');

var authMiddleware = require('./middleware/auth.middleware');
var sessionMiddleware = require('./middleware/session.middleware');

var port = 3000;

var app = express();
app.set('view engine', 'pug');  
app.set('views', './views');

app.use(cookieParser(process.env.SESSION_SECRECT));


app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(sessionMiddleware);
app.use(csurf({ cookie: true }));

app.use('/users', authMiddleware.requireAuth, userRoutes);
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoute);
app.use('/transfer',authMiddleware.requireAuth, transferRoute);
// app.use(express.static('public'));


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

app.listen(port, function(){
	console.log('Server listening on port ' + port);
});
