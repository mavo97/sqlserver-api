"use strict";

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const api = require("./routes");
const cors = require("cors");

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

app.use(cors());

app.use("/api", api);

app.use((req, res, next) => {
  // setTimeout(() => {

  // }, 40000);
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.get("/", function (req, res) {
  res.send("<h1>Hello node web server</h1>");
});

module.exports = app;
