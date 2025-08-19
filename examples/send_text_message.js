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

const WEBSITE_ID = "<YOUR_WEBSITE_ID>";
const SESSION_ID = "<YOUR_SESSION_ID>";


const CrispClient = new Crisp();


console.info("Authenticating...");

CrispClient.authenticateTier("plugin", TOKEN.identifier, TOKEN.key);


console.info("Sending message...");

CrispClient.website.sendMessageInConversation(
  WEBSITE_ID, SESSION_ID,

  {
    type    : "text",
    content : "This is a message sent from node-crisp-api examples.",
    from    : "operator",
    origin  : "chat",

    user   : {
      nickname : "My Custom Bot"
      // avatar   : "https://PATH_TO_A_CUSTOM_AVATAR"
    }
  }
)
  .then((data) => {
    console.info("Sent message.", data);
  })
  .catch((error) => {
    console.error("Failed sending message:", error);
  });
