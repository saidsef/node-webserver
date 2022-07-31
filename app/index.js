'use strict';

const express     = require('express');
const logging     = require("morgan");
const compression = require('compression');
const helmet      = require('helmet');
const crypto      = require('crypto');
const cors        = require('cors');

const app  = express();
const http = require('http').Server(app);
const PORT = process.env.PORT || 8080;

app.enable('trust proxy');
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // support json encoded bodies
app.use(logging("combined"));
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      baseUri: ["'self'"],
      defaultSrc: ["'self'"],
      formAction: ["'none'"],
      frameAncestors: ["'none'"],
      imgSrc: ["'self"],
      objectSrc: ["'self'"],
      sandbox: ['allow-forms', 'allow-scripts'],
      scriptSrc: ["'none'"],
      styleSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
  referrerPolicy: { policy: 'same-origin' },
}));

app.use(cors());
app.use(compression());
app.disable('x-powered-by');

app.get('/healthz', (req, res, next) => {
  res.set({'X-Robots-Tag' : 'noindex, nofollow, noarchive'});
  res.json({'status': 'healthy'});
});

app.get("*", (req, res, next) => {
  const buildID = process.env.BUILD_ID;
  let number = parseInt(String(parseFloat((crypto.randomInt(100) * 100)).toFixed(2)),10);
  let sha1 = crypto.randomBytes(20).toString("hex")
  let ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;
  res.json({ "message": "Hello World!", "ip": ip, "random_number": number, "random_sha1": sha1, "build": buildID, "request": req.headers });
});

http.listen(PORT);
