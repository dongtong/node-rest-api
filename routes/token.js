/*
 * @module token
 * @desc 登录
 */

'use strict';

import jwt from 'jwt-simple';
import md5 from 'md5';

module.exports = app => {
	const cfg = app.libs.config;
	const User = app.db.models.user;

	app.post("/token", (req, res) => {
		if(req.body.mobile && req.body.password) {
			const mobile = req.body.mobile;
			const password = req.body.password;

			User.findOne({where: {mobile: mobile}})
			    .then(user => {
			    	if(user.encrypted_password === password) {
			    		const payload = {id: user.id};
			    		console.log('payload:', payload)
			    		//token: jwt.encode(payload, cfg.jwtSecret)
			    		res.json({
			    			code: '0', 
							message: "登录成功", 
							session_id: user.authentication_token,
							token: jwt.encode(payload, cfg.jwtSecret)
			    		});
			    	} else {
			    		//res.sendStatus(401);
			    		res.json({
			    			code: '401',
			    			msg: '认证失败'
			    		});
			    	}
			    })
			    .catch(err => {
			    	//res.sendStatus(401);
			    	res.json({
			    		code: '401',
			    		msg: '认证失败'
			    	});
			    })
		} else {
			//res.sendStatus(401);
			res.json({
			   	code: '401',
			    msg: '认证失败'
			});
		}
	});
}