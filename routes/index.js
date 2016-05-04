/*
 * @module index
 * @desc 测试服务启动
 */

'use strict';

module.exports = app => {
	app.get('/', (req, res) => {
		res.json({status: "Node REST API"})
	});
}