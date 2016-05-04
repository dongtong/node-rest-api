'use strict';

module.exports = app => {
	// ensure this action will be executed before the server starts
	app.db.sequelize.sync().done( () => {
		const port = app.get('port');
		app.listen(port, () => {
			console.log(`Node REST API starting - port ${port}`);
		});
	});
};

