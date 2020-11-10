'use strict';

const app = require('./app');


app.listen(process.env.PORT || 5000, function () {
	console.log('Node web server is running');
});

