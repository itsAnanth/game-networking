// eslint-disable-next-line no-unused-vars
const player = require('../../../components/Player');
require('colors');

module.exports = {
    event: 'state',
    callback: (connection, message) => {
        const payLoad = {
            method: 'state',
            player: player.players[0],
            t: Date.now()
        };

        connection.send(JSON.stringify(payLoad));
        // Logger.log('WS server', 'client connected', `clientId = ${clientId.cyan}`);
    }
};