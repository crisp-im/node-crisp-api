/*
 * node-crisp-api
 *
 * Copyright 2021, Crisp IM SARL
 * Author: Baptiste Jamin <baptiste@crisp.chat>
 */


"use strict";


const TOKEN = {
  identifier : "<YOUR_API_TOKEN_IDENTIFIER>",
  key        : "<YOUR_API_TOKEN_KEY>"
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
  console.info("Got 'message:received' event:", message);
});

console.info("Now listening.");
