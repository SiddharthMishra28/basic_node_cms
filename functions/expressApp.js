// /functions/expressApp.js
const serverless = require('serverless-http');
const express = require('express');
const app = require('../app'); // Assuming your express app is in app.js

module.exports.handler = serverless(app);
