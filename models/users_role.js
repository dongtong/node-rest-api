/*
 * 用户角色关联模型
 */

'use strict';

module.exports = (sequelize, DataType) => {
	const UsersRole = sequelize.define("users_role", {
		id: {
			type: DataType.INTEGER,
			primaryKey: true, 
			autoIncrement: true
		},
		user_id: {
			type: DataType.INTEGER,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
		role_id: {
			type: DataType.INTEGER,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
		residential_area: {
			type: DataType.STRING,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
		building: {
			type: DataType.STRING,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
		unit: {
			type: DataType.STRING,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
		description: {
			type: DataType.TEXT,
		},
		created_at: {
			type: DataType.DATE,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
		updated_at: {
			type: DataType.DATE,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
		barcode_no: {
			type: DataType.STRING,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
		qr_code_uid: {
			type: DataType.STRING,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
		qr_code_name: {
			type: DataType.STRING,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
		last_recovered_at: {
			type: DataType.DATE
		}
	},{
		// don't use camelcase for automatically added attributes but underscore style
		// so updatedAt will be updated_at
		underscored: true,
		classMethods: {
			associate: (models) => {
				UsersRole.belongsTo(models.user);
				UsersRole.belongsTo(models.role);
			}
		}
	});
	
	return UsersRole;
};
