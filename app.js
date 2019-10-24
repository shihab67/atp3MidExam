//DECLARATION
var express = require('express');
var bodyParser = require('body-parser');
var expSession = require('express-session');
var cookieParser = require('cookie-parser');
var ejs = require('ejs');
var login = require('./controllers/login');
var home = require('./controllers/home');
var user = require('./controllers/user');
var employee = require('./controllers/employeeHome');
var logout = require('./controllers/logout');
var registration = require('./controllers/registration');
var app = express();


//CONFIGURATION
app.set('view engine', 'ejs');

//MIDDLEWARE
app.use(bodyParser.urlencoded({extended:true}));
app.use(expSession({secret:'my top secret value', saveUninitialized:true, resave: false}));
app.use(cookieParser());
app.use('/abc', express.static('xyz'))
app.use('/login', login);
app.use('/home', home);
app.use('/user', user);
app.use('/logout', logout);
app.use('/employeeHome', employee);
app.use('/registration', registration);


//ROUTER
app.get('/', function(request, response){
	response.render('index page!');
});

app.get('/test/your/:name/:id', function(request, response){
	var id = request.params.id;
	var name = request.params.name;
	response.send(id+" "+name);

});


//SERVER STARTUP
app.listen(3000, function(){
	console.log('server started at 3000...');
});