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

	/**
	 * @api {post} /token Authentication Token
	 * @apiGroup Credentials
	 * @apiParam {String} mobile User mobile
	 * @apiParam {String} password User md5 password
	 * @apiParamExample {json} Input
	 *     {
	 *         mobile: '139145726374',
	 *         password: '25bbdcd06c32d477f7fa1c3e4a91b032'
	 *     }
	 *  @apiSuccess {String} token Token of authenticated user
	 *  @apiSuccessExample {json} Success
	 *     HTTP/1.1 200 OK
	 *     {
	 *         "code": "0",
	 *         "message": "登录成功",
	 *         "session_id": "swyifxN4T55NkWqnre57",
	 *         "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NTc1NX0.3EUzoJzlR5K6733EtakdI_I0ncKoNAr2x1wxHqorgtY"
	 *     }
	 *  @apiErrorExample {json} Find Error
	 *     HTTP/1.1 200 OK
	 *     {
	 *         "code": "401",
	 *         "msg": "认证失败"
	 *     }
	 */
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