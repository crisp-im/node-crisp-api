/*
 * node-crisp-api
 *
 * Copyright 2021, Crisp IM SAS
 * Author: Baptiste Jamin <baptiste@crisp.chat>
 */


"use strict";


const TOKEN = {
  identifier : "<YOUR_API_TOKEN_IDENTIFIER>",
  key        : "<YOUR_API_TOKEN_KEY>"
};

const WEBSITE_ID = "<YOUR_WEBSITE_ID>";
const SESSION_ID = "<YOUR_SESSION_ID>";


var Crisp = require("../");
var CrispClient = new Crisp();


console.info("Authenticating...");

CrispClient.authenticateTier("plugin", TOKEN.identifier, TOKEN.key);


console.info("Sending message...");

CrispClient.website.sendMessageInConversation(
  WEBSITE_ID, SESSION_ID,

  {
    type    : "picker",

    content : {
      "id"   : "routing",
      "text" : "What is your question about?",

      "choices": [
        {
          "value"    : "sales",
          "label"    : "Sales",
          "selected" : false
        },

        {
        "value"    : "tech",
        "label"    : "Tech",
        "selected" : false
        }
      ]
    },

    from   : "operator",
    origin : "chat"
  }
)
  .then((data) => {
    console.info("Sent message.", data);
  })
  .catch((error) => {
    console.error("Failed sending message:", error);
  });
