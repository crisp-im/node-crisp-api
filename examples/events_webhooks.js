/*
 * node-crisp-api
 *
 * Copyright 2022, Crisp IM SAS
 * Author: Valerian Saliou <valerian@valeriansaliou.name>
 */


"use strict";


var http  = require("http");
var url   = require("url");


const TOKEN = {
  identifier : "<YOUR_API_TOKEN_IDENTIFIER>",
  key        : "<YOUR_API_TOKEN_KEY>",
  signSecret : "<YOUR_HOOKS_SIGNATURE_SECRET>"
};

const HOOKS_SERVER = {
  port : 8080,
  path : "/"
};


var Crisp = require("../");
var CrispClient = new Crisp();


console.info("Authenticating...");

CrispClient.authenticateTier("plugin", TOKEN.identifier, TOKEN.key);
CrispClient.setRtmMode(Crisp.RTM_MODES.WebHooks);


console.info("Listening for events...");

CrispClient.on("message:send", function(message) {
  console.info("[Web Hooks] Got 'message:send' event:", message);
})
  .then(function() {
    console.error("[Web Hooks] Requested to listen to sent messages");
  })
  .catch(function(error) {
    console.error("[Web Hooks] Failed listening to sent messages:", error);
  });

CrispClient.on("message:received", function(message) {
  console.info("[Web Hooks] Got 'message:received' event:", message);
})
  .then(function() {
    console.error("[Web Hooks] Requested to listen to received messages");
  })
  .catch(function(error) {
    console.error("[Web Hooks] Failed listening to received messages:", error);
  });


console.info(
  "Starting Web Hooks HTTP endpoint at "  +
    ("http://localhost:" + HOOKS_SERVER.port + "/")
);

var _processWebhooksEvent = function(request, body) {
  var secret    = TOKEN.signSecret,
      timestamp = request.headers["x-crisp-request-timestamp"],
      signature = request.headers["x-crisp-signature"];

  // Verify Web Hook payload
  if (CrispClient.verifyHook(secret, body, timestamp, signature) !== true) {
    console.warn(
      "[Web Hooks] Web Hooks request could not be verified with signature: "  +
        (signature || "(?)")
    );

    return 403;
  }

  // Receive Web Hook payload
  var error = CrispClient.receiveHook(body);

  if (error !== null) {
    console.error(
      "[Web Hooks] Web Hooks payload processing error: " + error.toString()
    );

    return 400;
  }

  console.info(
    "[Web Hooks] Web Hooks payload processed:\n \\->", body
  );

  return 200;
};

var _handleIncomingRequest = function(request, response, body) {
  // Handle request?
  var responseStatus = 404,
      requestURL     = url.parse(request.url);

  if (requestURL && requestURL.pathname === HOOKS_SERVER.path) {
    switch (request.method) {
      case "POST": {
        responseStatus = _processWebhooksEvent(request, body);

        break;
      }

      default: {
        responseStatus = 405;
      }
    }
  }

  // Send response
  response.writeHead(responseStatus, {
    "Content-Type" : "text/plain"
  });

  response.end(http.STATUS_CODES[responseStatus]);
};

http
  .createServer(function(request, response) {
    console.debug(
      "[Web Hooks] Received HTTP request: " + request.method + " " + request.url
    );

    var bodyBuffer = "";

    request
      .on("data", function(chunk) {
        bodyBuffer += chunk;
      })
      .on("end", function() {
        // Attempt to parse body to JSON
        var body = null;

        try {
          if (bodyBuffer) {
            body = JSON.parse(bodyBuffer);
          }
        } catch (_) {
          // Ignore errors
        }

        // Pass request to handler
        _handleIncomingRequest(request, response, body);
      })
      .setEncoding("utf8");
  })
  .listen(HOOKS_SERVER.port);
