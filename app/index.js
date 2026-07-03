import express from 'express';
import http from 'node:http';
import middleware from './middleware.js';
import routes from './routes.js';

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
