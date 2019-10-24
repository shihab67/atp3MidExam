var express = require('express');
var db = require('./../models/db');
var userModel = require('./../models/user-model');

var router = express.Router();

router.get('/', function(request, response){

		if(request.cookies['username'] != null){
			response.render('employee/index', {user: request.session.username, id: request.session.id});		
		}else{
			response.redirect('/logout');
		}	
});
router.get('/profile', function(request, response){
	console.log(request.session.id);
	userModel.getById(request.session.name, function(result){
		response.render('employee/profile', {info: result});
	});
});

router.get('/edit/:id', function(request, response){

	userModel.getById(request.params.id, function(result){
		response.render('employee/edit', result);
	});
	
});

module.exports = router;



