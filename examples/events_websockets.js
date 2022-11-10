/*
 * node-crisp-api
 *
 * Copyright 2022, Crisp IM SAS
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

CrispClient.authenticateTier("plugin", TOKEN.identifier, TOKEN.key);


console.info("Listening for events...");

CrispClient.on("message:send", function(message) {
  console.info("Got 'message:send' event:", message);
})
  .then(function() {
    console.error("Requested to listen to sent messages");
  })
  .catch(function(error) {
    console.error("Failed listening to sent messages:", error);
  });

CrispClient.on("message:received", function(message) {
  console.info("Got 'message:received' event:", message);
})
  .then(function() {
    console.error("Requested to listen to received messages");
  })
  .catch(function(error) {
    console.error("Failed listening to received messages:", error);
  });
