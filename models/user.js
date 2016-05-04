/*
 * 用户模型
 */

'use strict';

import md5 from 'md5';

module.exports = (sequelize, DataType) => {

	const User = sequelize.define('user', {
		id: {
			type: DataType.INTEGER,
			primaryKey: true, 
			autoIncrement: true
		},
		email: {
			type: DataType.STRING
			//unique: true
		},
		encrypted_password: {
			type: DataType.STRING
		},
		reset_password_token: {
			type: DataType.STRING
		},
		reset_password_sent_at: {
			type: DataType.DATE
		},
		remember_created_at: {
			type: DataType.DATE
		},
		sign_in_count: {
			type: DataType.INTEGER
		},
		current_sign_in_at: {
			type: DataType.DATE
		},
		last_sign_in_at: {
			type: DataType.DATE
		},
		current_sign_in_ip: {
			type: DataType.STRING
		},
		last_sign_in_ip: {
			type: DataType.STRING	
		},
		username: {
			type: DataType.STRING,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
		real_name: {
			type: DataType.STRING
		},
		mobile: {
			type: DataType.STRING
		},
		phone_number: {
			type: DataType.STRING
		},
		integration: {
			type: DataType.INTEGER	
		},
		authentication_token: {
			type: DataType.STRING
		},
		created_at: {
			type: DataType.DATE
		},
		updated_at: {
			type: DataType.DATE	
		},
		password_salt: {
			type: DataType.STRING
		},
		sex: {
			type: DataType.STRING	
		}
	}, {
		// getterMethods: {
		// 	isAdmin: function() {
		// 		return true
		// 	}
		// },
		// don't use camelcase for automatically added attributes but underscore style
		// so updatedAt will be updated_at
		underscored: true,
		// 钩子方法
		hooks: {
			beforeCreate: user => {
				user.encrypted_password = md5(user.password)
			}
		},
		// 定义类方法
		classMethods: {
			associate: (models) => {
				User.hasMany(models.users_role);
			},

			searchAll: (db, params, done) => {
				let condition = {
		        	// required: true,
		        	subQuery: false,
		        	include: [{
		        		model: db.models.users_role,
		        		where: {role_id: 4},
		        		attributes: ['role_id', 'residential_area', 'building', 'unit']
		        	}],  
		        	attributes: ['id', 'username', 'real_name', 'phone_number', 'mobile'],
		        	order: '"user"."id" ASC',
		        	offset: (params.page - 1) * 10,
		        	limit: 10
		        }, q = params.q;

		        if (q && q !== '') {
		        	let likeQ = '%' + q + '%';
		        	condition['where'] = [
                        '("user"."real_name" LIKE \'' + likeQ + 
                        '\' OR "user"."mobile" LIKE \'' + likeQ + 
                        '\' OR "users_roles"."building" LIKE \'' + likeQ + 
                        '\' OR "users_roles"."unit" LIKE \'' + likeQ + 
                        '\' OR "users_roles"."residential_area" LIKE \'' + likeQ + 
                        '\')'
		        	]
		        }

				User.findAndCountAll(condition).then(users => {
					done({
						code: '0',
						totalPage: Math.ceil(users.count / 10),
						totalCount: users.count,
						users: users.rows
					});
				}).catch( err => {
					done({code: '1000', msg: '系统维护中'});
					//res.status(412).json({code: '1000', msg: '系统维护中'}); //412 - Precondition Failed status code
				});
			},

			
			searchRelatedRes: (db, params, ra, done) => {
				let condition = {
		        	subQuery: false,
		        	include: [{             
		        		model: db.models.users_role,
		        		where: {role_id: 4, residential_area: ra},
		        		attributes: ['role_id', 'residential_area', 'building', 'unit']
		        	}],  
		        	attributes: ['id', 'username', 'real_name', 'phone_number', 'mobile'],
		        	order: '"user"."id" ASC',
		        	offset: (params.page - 1) * 10,
		        	limit: 10
		        },
		        q = params.q;

		        if (q && q !== '') {
		        	let likeQ = '%' + q + '%';
		        	
		        	condition['where'] = [
                        '("user"."real_name" LIKE \'' + likeQ + 
                        '\' OR "user"."mobile" LIKE \'' + likeQ + 
                        '\' OR "users_roles"."building" LIKE \'' + likeQ + 
                        '\' OR "users_roles"."unit" LIKE \'' + likeQ + '\')'
		        	]
		        	
		        }

				User.findAndCountAll(condition).then(users => {
					done({
						code: '0',
						totalPage: Math.ceil(users.count / 10),
						totalCount: users.count,
						users: users.rows
					});
				}).catch( err => {
					done({code: '1000', msg: '系统维护中'});
				});
			}
		},

		instanceMethods: {
			isAdmin: function () {
				return this.users_roles[0].role.code == '1000';
			},
			isAdminOrOperator: function () {
				return ['1000', '1001'].indexOf(this.users_roles[0].role.code) > -1;
			},
			getRole: function () {
				switch(this.users_roles[0].role.code) {
					case '1000':
						return 'ADMIN';
					case '1001': 
						return 'OPERATOR';
					default:
						return 'NORMAL';
				}
			},
			getRes: function () {
				return this.users_roles[0].residential_area;
			},
			getInfo: function () {
				let userRole = this.users_roles[0];
				switch(userRole.role.code) {
					case '1000':
						return {
							role: 'ADMIN',
							ra: 'ALL'
						};
					case '1001': 
						return {
							role: 'OPERATOR',
							ra: userRole.residential_area
						};
					default:
						return 'NORMAL';
				}
			}
		}
	});

	return User;
}