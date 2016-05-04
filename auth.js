'use strict';

import passport from 'passport';
import {Strategy, ExtractJwt} from 'passport-jwt';

module.exports = app => {
	const User = app.db.models.user;
	const Role = app.db.models.role;
	const UsersRole = app.db.models.users_role;
	const cfg = app.libs.config;

	const params = {
		secretOrKey: cfg.jwtSecret,
		jwtFromRequest: ExtractJwt.fromAuthHeader()
	};

    // app.auth.authenticate() will receive http headers authorization field
	const strategy = new Strategy(params, (payload, done) => {
		User.findOne({
			where: {id: payload.id},
			include: [{
				model: UsersRole,
				attributes: [ 'role_id', 'residential_area'],
				include: [{
					model: Role,
					attributes: [ 'code' ],
				}]
			}]
		}).then(user => {
			let userInfo = user.getInfo(),
			    role = userInfo.role;

		    if(user && (role === 'ADMIN') {
		     	return done(null, {
		     		id: user.id,
		     		mobile: user.mobile,
		     		role: role,
		     		ra: userInfo.ra
		     	});
		    } else {
		     	// 访问受限
		     	return done(null, false);
		    }

		    return done(null, false);
		})
		.catch(err => {
		    done(err, null);
		})
	});

	passport.use(strategy);

	return {
		init: () => {
			return passport.initialize();
		},
		authenticate: () => {
			console.log('auth.authenticate()')
			return passport.authenticate('jwt', cfg.jwtSession);
		}
	}
}