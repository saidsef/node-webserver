'use strict';

const express = require('express');
const prom    = require("express-prom-bundle");
const logging = require("morgan");
const fs      = require("fs");

const app               = express();
const metricsMiddleware = prom({includeMethod: true});
const PORT              = process.env.PORT || 80;

app.use(metricsMiddleware);
app.use(logging("combined"));

app.get("*", (req, res, next) => {
  const fileName = "build_id.txt";
  let randomNumber = parseInt(String(parseFloat((Math.random() * 100)).toFixed(2)),10);
  let buildID = (fs.existsSync(fileName)) ? fs.readFileSync(fileName, "utf-8").trim() : "NOFILE";
  res.json({ "message": "Hello World!", "random_number": randomNumber, "build": buildID });
});

app.listen(PORT);
