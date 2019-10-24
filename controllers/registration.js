var express = require('express');
const notifier = require('node-notifier');
var router = express.Router();
var userModel = require('./../models/user-model');

router.get('/', function(request, response){
	response.render('registration/registration');
});

router.post('/', function(request, response){

	var user = {
		empName: request.body.empName,
		compName: request.body.compName,
		contact: request.body.contact,
		username: request.body.username,
		password: request.body.password
	};

	userModel.insert_customer(user, function(status){
		
		if(status){
			notifier.notify({
				title: 'Hello',
				message: 'Acount Created'
			  });
			response.redirect('/login');
		}else{
			//response.redirect('/user/edit/'+request.params.id);
		}
	});
	
});

module.exports = router;