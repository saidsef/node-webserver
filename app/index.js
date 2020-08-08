'use strict';

const express     = require('express');
const promMid     = require('express-prometheus-middleware');
const logging     = require("morgan");
const compression = require('compression');
const helmet      = require('helmet');
const crypto      = require('crypto');
const cors        = require('cors');
const fs          = require("fs");

const app     = express();
const http    = require('http').Server(app);

const PORT    = process.env.PORT || 8080;

app.enable('trust proxy');
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // support json encoded bodies
app.use(promMid({ metricsPath: '/metrics', collectDefaultMetrics: true, requestDurationBuckets: [0.1, 0.5, 1, 1.5]}));
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
      upgradeInsecureRequests: [true],
    },
  },
  referrerPolicy: { policy: 'same-origin' },
  featurePolicy: {
    features: {
      fullscreen: ["'self'"],
      vibrate: ["'self'"],
      geolocation: ["'self'"],
      wakeLock: ["'self'"],
    },
  },
}));
app.use(cors());
app.use(compression());
app.options('*', cors());
app.disable('x-powered-by');

app.get('/healthz', (req, res, next) => {
  res.set({'X-Robots-Tag' : 'noindex, nofollow, noarchive'});
  res.json({'status': 'healthy'});
});

app.get("*", (req, res, next) => {
  const fileName = "build_id.txt";
  let number = parseInt(String(parseFloat((Math.random() * 100)).toFixed(2)),10);
  let buildID = (fs.existsSync(fileName)) ? fs.readFileSync(fileName, "utf-8").trim() : "NOFILE";
  let sha1 = crypto.randomBytes(20).toString("hex")
  res.json({ "message": "Hello World!", "random_number": number, "random_sha1": sha1, "build": buildID });
});

http.listen(PORT);
