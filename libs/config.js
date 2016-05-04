/*
 * 数据库链接配置
 */

'use strict';

module.exports = {
	database: 'node-rest-sample',      // defines the database name
	username: 'postgres',              
	password: 'xxxxxxxx',
	params: {
		host: 'localhost',
		dialect: 'postgres',          // database will be used (sqlite, mysql, postgres, mariadb,mssql)
		define: {
			underscored: true         // standardize the tables fields’ name in lowercase letters with underscore
		},
		pool: {
		    max: 5,
		    min: 0,
		    idle: 10000
		}
	},
	jwtSecret: "--NodeRESTApi--",    // do not publish
	jwtSession: {session: true}      // inform Passport that the API won’t manage session
};