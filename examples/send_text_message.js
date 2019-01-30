/*
 * Bundle: Examples / Send Text Message
 * Project: Crisp - Node API
 * Author: Baptiste Jamin http://jamin.me/
 * Copyright: 2019, Crisp IM
 */

"use strict";

const TOKEN = {
  identifier: "<YOUR_API_TOKEN_IDENTIFIER>",
  key: "<YOUR_API_TOKEN_KEY>"
};

const WEBSITE_ID = "<YOUR_WEBSITE_ID>";
const SESSION_ID = "<YOUR_SESSION_ID>";

var Crisp = require("../");

var CrispClient = new Crisp();

console.info("Authenticating...");

CrispClient.authenticate(TOKEN.identifier, TOKEN.key);

console.info("Sending message...");

CrispClient.websiteConversations.sendMessage(
  WEBSITE_ID,
  SESSION_ID,

  {
    type : "text",
    content : "This is a message sent from node-crisp-api examples.",
    from : "operator",
    origin : "chat"
  }
)
  .then(() => {
    console.info("Sent message.");
  })
  .catch((error) => {
    console.error("Failed sending message:", error);
  });
