const PORT = process.env.PORT || 3000;
const { Logger } = require('../modules');
// const handleHTTPRequests = require('./HTTP');
const WsManager = require('./WebSocket/ws');

const http = require('http');
const httpServer = http.createServer();

const websocketServer = require('ws').Server;
const wsServer = new websocketServer({ server: httpServer });
const wsManager = new WsManager(wsServer);


wsManager.handle();
// httpServer.on('request', handleHTTPRequests);

httpServer.listen(PORT, () => Logger.log('HTTP server', `running on port ${PORT}`));