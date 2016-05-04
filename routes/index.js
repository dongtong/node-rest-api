/*
 * @module index
 * @desc 测试服务启动
 */

'use strict';

module.exports = app => {

	/**
	 * @api {get} / API Status
	 * @apiGroup Status
	 * @apiSuccess {String} status API Status' message
	 * @apiSuccessExample {json} Success
	 *     HTTP/1.1 200 OK
	 *     {"status": "Node REST API"}
	 */
	app.get('/', (req, res) => {
		res.json({status: "Node REST API"})
	});
}