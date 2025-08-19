/*
 * node-crisp-api
 *
 * Copyright 2022, Crisp IM SAS
 * Author: Baptiste Jamin <baptiste@crisp.chat>
 */


import Crisp from "crisp-api";


const TOKEN = {
  identifier : "<YOUR_API_TOKEN_IDENTIFIER>",
  key        : "<YOUR_API_TOKEN_KEY>"
};

const CrispClient = new Crisp();


console.info("Authenticating...");

CrispClient.authenticateTier("plugin", TOKEN.identifier, TOKEN.key);
CrispClient.setRtmMode("websockets");


console.info("Listening for events...");

CrispClient.on("message:send", (message) => {
  console.info("[WebSockets] Got 'message:send' event:", message);
})
  .then(() => {
    console.error("[WebSockets] Requested to listen to sent messages");
  })
  .catch((error) => {
    console.error("[WebSockets] Failed listening to sent messages:", error);
  });

CrispClient.on("message:received", (message) => {
  console.info("[WebSockets] Got 'message:received' event:", message);
})
  .then(() => {
    console.error("[WebSockets] Requested to listen to received messages");
  })
  .catch((error) => {
    console.error("[WebSockets] Failed listening to received messages:", error);
  });
