'use strict';

const express = require('express');
const http = require('http');
const middleware = require('./middleware');
const routes = require('./routes');

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 8080;

app.disable('x-powered-by');
app.enable('trust proxy');

// Apply middleware
middleware.forEach(mw => app.use(mw));

// Apply routes
app.use(routes);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
