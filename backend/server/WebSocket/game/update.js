// eslint-disable-next-line no-unused-vars
const player = require('../../../components/Player');
require('colors');

module.exports = {
    event: 'update',
    callback: (connection, message) => {
        player.players[0] = message.player;
    }
};