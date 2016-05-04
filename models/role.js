/*
 * 角色模型
 */

'use strict';

module.exports = (sequelize, DataType) => {
	const Role = sequelize.define('role', {
		id: {
			type: DataType.INTEGER,
			primaryKey: true, 
			autoIncrement: true
		},
		name: {
			type: DataType.STRING,
			unique: true
		},
		code: {
			type: DataType.STRING,
			unique: true
		},
		created_at: {
			type: DataType.DATE
		},
		updated_at: {
			type: DataType.DATE	
		}
	}, {
		underscored: true,
		classMethods: {
			associate: (models) => {
				Role.hasMany(models.users_role);
			}
		}
	});

	return Role;
};