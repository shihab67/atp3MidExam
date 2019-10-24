var express = require('express');
var userModel = require('./../models/user-model');
var router = express.Router();

router.get('/', function(request, response){
	response.render('login/index');
});

router.post('/', function(request, response){
	
	var user = {
		empName: request.body.empName,
		compName: request.body.compName,
		contact: request.body.contact,
		username: request.body.username,
		password: request.body.password
	};

	userModel.validate(user, function(status){
		request.session.username = request.body.username;
		request.session.name = status.id;
		console.log(request.session.name);
			if(status.type == 1){
			response.cookie('username', request.body.username);
			//request.session.username = request.body.username;
			//request.session.id = status.id;
			response.render('home/index', {user: request.session.username, id: request.session.id});
			}
			if(status.type == 2){
				response.cookie('username', request.body.username);
				//request.session.username = request.body.username;
				//request.session.id = status.id;
			
				response.render('employee/index', {user: request.session.username, id: request.session.id});
			}
		else{
			response.send('invalid username/password');		
		}
	});

});

module.exports = router;


