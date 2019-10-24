var express = require('express');
const notifier = require('node-notifier');
var userModel = require('./../models/user-model');

var router = express.Router();


router.get('*', function(request, response, next){

	if(request.cookies['username'] != null){
		next();
	}else{
		response.redirect('/logout');
	}

});

router.get('/adduser', function(request, response){
	response.render("user/adduser");
});

router.post('/adduser', function(request, response){

	var user = {
		empName: request.body.empName,
		compName: request.body.compName,
		contact: request.body.contact,
		username: request.body.username,
		password: request.body.password
	};

	userModel.insert(user, function(status){
		
		if(status){
			notifier.notify({
				title: 'Hello',
				message: 'Employee Added!'
			  });
			response.redirect('/home');
		}else{
			//response.redirect('/user/edit/'+request.params.id);
		}
	});
	
});

router.get('/userList', function(request, response){
		
		userModel.getAll(function(results){
			response.render('user/index', {users: results});		
		});	
});

router.get('/edit/:id', function(request, response){

	userModel.getById(request.params.id, function(result){
		response.render('user/edit', result);
	});
	
});

router.post('/edit/:id', function(request, response){

	var user = {
		username: request.body.username,
		password: request.body.password,
		id: request.params.id
	};

	userModel.update(user, function(status){
		
		if(status){
			response.redirect('/user/userlist');
		}else{
			response.redirect('/user/edit/'+request.params.id);
		}
	});
	
});

router.get('/delete/:id', function(request, response){

	userModel.getById(sql, function(result){
		response.render("user/delete", {user: result[0]});
	})
});

router.post('/delete/:id', function(request, response){

	userModel.delete(sql, function(status){	
		if(status){
			response.redirect("/user/userList");
		}else{
			response.redirect("/user/delete/"+request.params.id);	
		}
	})
});

router.get('/details/:id', function(request, response){

	userModel.getById(request.params.id, function(result){
		response.render("user/details", result);
	})
});

module.exports = router;



