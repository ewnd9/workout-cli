'use strict';

const net = require('net');
const fs = require('fs');

const constants = require('./constants');
const notify = require('./notify');
const config = require('./config');

fs.stat(constants.SOCKET_PATH, err => {
  if (!err) {
		fs.unlinkSync(constants.SOCKET_PATH);
	}

  const unixServer = net.createServer(connection => {
    const reply = (event, data) => connection.write(JSON.stringify({ event, data }));

    connection.on('data', data => {
      const result = JSON.parse(data);
      console.log('data', result.event);

      switch (result.event) {
        case constants.STATUS_REQUEST:
          const msg = `${(date.getTime() + config.data.interval * 1000 * 60 - new Date().getTime()) / 1000 / 60 | 0} minutes left`;
          reply(constants.STATUS_RESPONSE, msg);
          break;
        default:
          console.log('undefined');
      }
    });
  });

  unixServer.listen(constants.SOCKET_PATH);
  console.log(`created ${constants.SOCKET_PATH}`);

  let date = new Date();

  const loopFn = () => {
    notify('ok');
    clearInterval(intervalId);
  };

  let intervalId = setInterval(loopFn, 1000);
});
