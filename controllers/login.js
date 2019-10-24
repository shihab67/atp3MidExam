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
		if(status){
			if(status.type == 1){
			response.cookie('username', request.body.username);
			request.session.username = request.body.username;
			request.session.type = 1;
			response.render('home/index', {user: request.session.username, type: request.session.type});
			}
			if(status.type == 2){
				response.cookie('username', request.body.username);
				request.session.username = request.body.username;
				request.session.type = 2;
				response.render('employee/index', {user: request.session.username, type: request.session.type});
			}
		}else{
			response.send('invalid username/password');		
		}
	});

});

module.exports = router;


