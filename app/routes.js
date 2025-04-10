'use strict';

const express = require('express');
const crypto = require('crypto');
const router = express.Router();

router.get('/healthz', (req, res) => {
  res.set({'X-Robots-Tag': 'noindex, nofollow, noarchive'});
  res.json({'status': 'healthy'});
});

router.get('*default', (req, res) => {
  const { headers, ip, ips } = req;
  const buildID = process.env.BUILD_ID;
  const number = crypto.randomInt(10000);
  const sha1 = crypto.createHash('sha1').update(crypto.randomBytes(20)).digest('hex');
  res.json({
    message: "Hello World!",
    ip: ip,
    ips: ips,
    random_number: number,
    random_sha1: sha1,
    build: buildID,
    request: headers,
    environment_vars: process.env
  });
});

module.exports = router;