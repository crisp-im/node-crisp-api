/*
 * Bundle: Examples / Events
 * Project: Crisp - Node API
 * Author: Baptiste Jamin http://jamin.me/
 * Copyright: 2019, Crisp IM
 */

"use strict";

const TOKEN = {
  identifier: "<YOUR_API_TOKEN_IDENTIFIER>",
  key: "<YOUR_API_TOKEN_KEY>"
};

var Crisp = require("../");

var CrispClient = new Crisp();

console.info("Authenticating...");

CrispClient.authenticate(TOKEN.identifier, TOKEN.key);

console.info("Listening for events...");

CrispClient.on("message:send", function(message) {
  console.info("Got 'message:send' event:", message);
});

CrispClient.on("message:received", function(message) {
  console.info("Got 'message:send' event:", message);
});

console.info("Now listening.");
