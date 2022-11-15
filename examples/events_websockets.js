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
CrispClient.setRtmMode(Crisp.RTM_MODES.WebSockets);


console.info("Listening for events...");

CrispClient.on("message:send", function(message) {
  console.info("[WebSockets] Got 'message:send' event:", message);
})
  .then(function() {
    console.error("[WebSockets] Requested to listen to sent messages");
  })
  .catch(function(error) {
    console.error("[WebSockets] Failed listening to sent messages:", error);
  });

CrispClient.on("message:received", function(message) {
  console.info("[WebSockets] Got 'message:received' event:", message);
})
  .then(function() {
    console.error("[WebSockets] Requested to listen to received messages");
  })
  .catch(function(error) {
    console.error("[WebSockets] Failed listening to received messages:", error);
  });
