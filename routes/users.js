/*
 * @module users
 * @desc 用户查询
 */

'use strict';

import passport from 'passport';

module.exports = app => {
	
	const User = app.db.models.user;
	const UsersRole = app.db.models.users_role;

	// 查找所有用户
	app.route("/users/page/:page")
	   .all(app.auth.authenticate())
	   .get((req, res) => {
	   	    req.params['q'] = req.query.q;
	   	    if (req.user.role === 'ADMIN') {
	   	    	res.json(User.searchAll(req.params))
	   	    } else {
	   	    	User.searchRelatedRes(app.db, req.params, req.user.ra, function (result) {
	   	    		res.json(result);
	   	    	})
	   	    }
	   });

	// 查找和更新
	 app.route("/users/:id")
	    .all(app.auth.authenticate())
		.get((req, res) => {
		    User.findOne({where: req.params})
		    .then(result => { 
				if (result) {
					res.json(result); 
				} else {
			        res.sendStatus(404);
			    }
			}).catch(error => {
		        res.status(412).json({msg: '系统维护中'});
		    });
		})
		.put((req, res) => {
			User.update(req.body, {where: req.params})
				.then(result => {
					user = User.findById(req.params.id, {
						attributes: ['id', 'real_name', 'mobile', 'residential_area', 'building', 'unit']
					})
					res.json({code: '0', user: user})
				}) // 204 - No Content status code using the res.sendStatus(204) function
				.catch(err => res.status(412).json({msg: '系统维护中'}))
		});


}