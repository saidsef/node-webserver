import express from 'express';
import logging from 'pino-http';
import compression from 'compression';
import helmet from 'helmet';

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

export default middleware;
