'use strict';

const express = require('express');
const app = express();

app.get('/', function (req, res) {
	res.send('<h1>Hello node web server</h1>');
});

// Database component
const sql = require('mssql'); // Drivers

// Config database
const config = {
	user: 'mario_somee_SQLLogin_1',
	password: '1rlv15bxt3',
	server: 'licitaciones.mssql.somee.com',
	database: 'licitaciones',
};

// Connect to the database
sql.connect(config, function (err) {
	// Creating a new request
	let sqlRequest = new sql.Request();

	// Query to the database
	let sqlQuery = 'select * from dbo.marker';

	// Run the query
	sqlRequest.query(sqlQuery, function (err, data) {
		if (err) console.log(err);

		// display data in console
		console.log(data);
		console.log(data.recordset);
		console.log(data.rowsAffected);
		console.log(data.recordset[0]);
		sql.close();
	});
});

app.listen(5000, function () {
	console.log('Node web server is running');
});
