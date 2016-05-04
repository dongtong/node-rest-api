'use strict';

import bodyParser from "body-parser";
import passport from 'passport';


module.exports = app => {
	app.set('port', 3000);
	app.set('json spaces', 4);

	app.use(bodyParser.json());                         // for parsing application/json
	app.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded

	//auth
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(app.auth.init());
	passport.serializeUser(function(user, done) {
		console.log('serialize user: ', user)
	  	done(null, user);
	});


	app.use((req, res, next) => {
		//req.body.id could overwrite the id of a user,
		//on each request functions, we are going to use req.body as a parameter for Sequelize.js functions, 
		//and the attribute req.body.id could overwrite the id of a user, for example, on update or create a user
		delete req.body.id;
		// it can execute the next function on the route or the next middleware below
		next();
	});
};