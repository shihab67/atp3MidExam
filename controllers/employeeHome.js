var express = require('express');
var db = require('./../models/db');
var userModel = require('./../models/user-model');

var router = express.Router();

router.get('/', function(request, response){

		if(request.cookies['username'] != null){
			response.render('employee/index', {user: request.session.username, type: request.session.type});		
		}else{
			response.redirect('/logout');
		}	
});
router.get('/profile', function(request, response){
	var user =  request.session.type;
	userModel.getById(user, function(result){
		response.render('employee/profile', result, {users: request.session.username, type: request.session.type});
	});
});

module.exports = router;



