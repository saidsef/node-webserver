'use strict';

const express = require('express');
const logging = require('pino-http');
const compression = require('compression');
const helmet = require('helmet');

const middleware = [
  express.urlencoded({ extended: true }),
  express.json(), // support json encoded bodies
  logging({ level: process.env.LOG_LEVEL || 'info' }),
  helmet({
    contentSecurityPolicy: {
      directives: {
        baseUri: ["'self'"],
        defaultSrc: ["'self'"],
        formAction: ["'none'"],
        frameAncestors: ["'none'"],
        imgSrc: ["'self'"],
        objectSrc: ["'self'"],
        sandbox: ['allow-forms', 'allow-scripts'],
        scriptSrc: ["'none'"],
        styleSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
    referrerPolicy: { policy: 'same-origin' },
  }),
  compression()
];

module.exports = middleware;