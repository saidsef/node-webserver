'use strict';

const express = require('express');
const promMid = require('express-prometheus-middleware');
const logging = require("morgan");
const fs      = require("fs");

const app     = express();
const PORT    = process.env.PORT || 8080;

app.enable('trust proxy');
app.use(express.urlencoded({extended: true}));
app.use(express.json()); // support json encoded bodies
app.use(promMid({ metricsPath: '/metrics', collectDefaultMetrics: true, requestDurationBuckets: [0.1, 0.5, 1, 1.5]}));
app.use(logging("combined"));

app.get("*", (req, res, next) => {
  const fileName = "build_id.txt";
  let randomNumber = parseInt(String(parseFloat((Math.random() * 100)).toFixed(2)),10);
  let buildID = (fs.existsSync(fileName)) ? fs.readFileSync(fileName, "utf-8").trim() : "NOFILE";
  res.json({ "message": "Hello World!", "random_number": randomNumber, "build": buildID });
});

app.listen(PORT);
