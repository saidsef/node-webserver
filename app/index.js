'use strict';

const express     = require('express');
const logging     = require("morgan");
const compression = require('compression');
const helmet      = require('helmet');
const crypto      = require('crypto');
const cors        = require('cors');

const app  = express();
const http = require('http').createServer(app);
const PORT = process.env.PORT || 8080;

app.enable('trust proxy');
app.use(express.urlencoded({extended: true}));
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
  referrerPolicy: {policy: 'same-origin'},
}));

app.use(cors());
app.use(compression());
app.disable('x-powered-by');

app.get('/healthz', (req, res, next) => {
  res.set({'X-Robots-Tag' : 'noindex, nofollow, noarchive'});
  res.json({'status': 'healthy'});
});

app.get("*", (req, res, next) => {
  const { headers, ip } = req;
  const buildID = process.env.BUILD_ID;
  const number = crypto.randomInt(10000);
  const sha1 = crypto.createHash('sha1').update(crypto.randomBytes(20)).digest('hex');
  res.json({
    "message": "Hello World!",
    "ip": ip,
    "random_number": number,
    "random_sha1": sha1,
    "build": buildID,
    "request": headers,
    "environment_vars": process.env
  });
});

http.listen(PORT);
