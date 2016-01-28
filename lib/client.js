const net = require('net');
const constants = require('./constants');

module.exports = startEvent => {
	return new Promise((resolve, reject) => {
		const client = net.createConnection(constants.SOCKET_PATH);

		client.on('error', err => {
		 	reject(`failed to connect to server: ${err}`);
		});

		client.on('connect', () => {
			client.write(JSON.stringify({ event: startEvent }));
		});

		client.on('data', data => {
			const result = JSON.parse(data);

			if (startEvent === constants.STATUS_REQUEST && result.event === constants.STATUS_RESPONSE) {
				resolve(result.data);
			} else {
				reject('unexpected behaviour');
			}

			client.end();
		});
	});
};
