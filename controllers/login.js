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
			if(status == 1){
			response.cookie('username', request.body.username);
			response.redirect('/home');
			}
			if(status == 2){
				response.cookie('username', request.body.username);
				response.redirect('/employeeHome');
			}
		}else{
			response.send('invalid username/password');		
		}
	});

});

module.exports = router;


