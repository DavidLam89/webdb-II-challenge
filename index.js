const express = require('express');
const helmet = require('helmet');

const zoosRouter = require('./zoos-router.js');
const bearsRouter = require('./bears-router.js');
const server = express();

server.use(express.json());
server.use(helmet());

server.use('/api/zoos', zoosRouter);
server.use('/api/bears', bearsRouter);

// endpoints here

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
