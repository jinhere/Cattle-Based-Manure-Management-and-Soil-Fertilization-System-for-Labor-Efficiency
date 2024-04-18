const db = require('./db');
const httpServer = require('./httpServer');
const tcpServer = require('./tcpServer');

//Network Setting
const port = 3100;
const httpPort = 8080;

db.initializeDatabase();
db.putDummyData();
httpServer.startHttpServer(httpPort);
tcpServer.startTcpServer(port);

