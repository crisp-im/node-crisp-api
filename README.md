# Crisp API Wrapper

[![Test and Build](https://github.com/crisp-im/node-crisp-api/workflows/Test%20and%20Build/badge.svg?branch=master)](https://github.com/crisp-im/node-crisp-api/actions?query=workflow%3A%22Test+and+Build%22) [![NPM](https://img.shields.io/npm/v/crisp-api.svg)](https://www.npmjs.com/package/crisp-api) [![Downloads](https://img.shields.io/npm/dt/crisp-api.svg)](https://www.npmjs.com/package/crisp-api)

The Crisp API Node wrapper. Authenticate, send messages, fetch conversations, access your agent accounts from your JavaScript code.

Copyright 2021 Crisp IM SARL. See LICENSE for copying information.

* **📝 Implements**: [REST API Reference (V1)](https://docs.crisp.chat/references/rest-api/v1/) at revision: 30/11/2021
* **😘 Maintainers**: [@baptistejamin](https://github.com/baptistejamin), [@eliottvincent](https://github.com/eliottvincent), [@valeriansaliou](https://github.com/valeriansaliou)

## Installation

`npm install --save crisp-api`

## Authentication

To authenticate against the API, obtain your authentication token keypair by following the [REST API Authentication](https://docs.crisp.chat/guides/rest-api/authentication/) guide. You'll get a token keypair made of 2 values.

**Keep your token keypair values private, and store them safely for long-term use.**

Then, add authentication parameters to your `client` instance right after you create it:

```javascript
var Crisp = require("crisp-api");
var CrispClient = new Crisp();

// Authenticate to API with your plugin token (identifier, key)
// eg. CrispClient.authenticate("7c3ef21c-1e04-41ce-8c06-5605c346f73e", "cc29e1a5086e428fcc6a697d5837a66d82808e65c5cce006fbf2191ceea80a0a");
CrispClient.authenticateTier("plugin", identifier, key);

// Now, you can use authenticated API sections.
```

## Overview

You may follow the [REST API Quickstart](https://docs.crisp.chat/guides/rest-api/quickstart/) guide, which will get you running with the REST API in minutes.

```javascript
var Crisp = require("crisp-api");
var CrispClient = new Crisp();

CrispClient.authenticateTier("plugin", identifier, key);

CrispClient.website.listConversations(websiteID, 1)
  .then(function(conversations) {
    console.log("Listed conversations:", conversations);
  })
  .catch(function(error) {
    console.error("Error listing conversations:", error);
  });
```

## Examples

### Create your own bot!

```javascript
var Crisp = require("crisp-api");
var CrispClient = new Crisp();

CrispClient.authenticateTier("plugin", identifier, key);

// Notice: make sure to authenticate before listening for an event
CrispClient.on("message:send", function(message) {
  CrispClient.website.sendMessageInConversation(
    message.website_id, message.session_id,

    {
      type    : "text",
      content : "I'm a bot",
      from    : "operator", // or user
      origin  : "chat"
    }
  )
    .then(function(message) {
      console.log("Message sent:", message);
    })
    .catch(function(error) {
      console.error("Error sending message:", error);
    });
});
```

## Resource Methods

All the available Crisp API resources are fully implemented. **Programmatic methods names are named after their label name in the [REST API Reference](https://docs.crisp.chat/references/rest-api/v1/)**.

All methods that you will most likely need when building a Crisp integration are prefixed with a star symbol (⭐).

**⚠️ Note that, depending on your authentication token tier, which is either `user` or `plugin`, you may not be allowed to use all methods from the library. When in doubt, refer to the library method descriptions below. Most likely, you are using a `plugin` token.**

### Resource Methods Index
<details>
  <summary>
  <a href="#website">Website</a>
  </summary>
  <ul>
    <li><a href="#website-conversations">Website Conversations</a></li>
    <li><a href="#website-conversation">Website Conversation</a></li>
    <li><a href="#website-people">Website People</a></li>
    <li><a href="#website-operator">Website Operator</a></li>
    <li><a href="#website-availability">Website Availability</a></li>
    <li><a href="#website-analytics">Website Analytics</a></li>
    <li><a href="#website-batch">Website Batch</a></li>
    <li><a href="#website-verify">Website Verify</a></li>
    <li><a href="#website-campaigns">Website Campaigns</a></li>
    <li><a href="#website-campaign">Website Campaign</a></li>
  </ul>
</details>
<details>
  <summary>
  <a href="#plugin">Plugin</a>
  </summary>
  <ul>
    <li><a href="#plugin-connect">Plugin Connect</a></li>
    <li><a href="#plugin-subscription">Plugin Subscription</a></li>
  </ul>
</details>
<details>
  <summary>
  <a href="#media">Media</a>
  </summary>
  <ul>
    <li><a href="#media-animation">Media Animation</a></li>
  </ul>
</details>
<details>
  <summary>
  <a href="#bucket">Bucket</a>
  </summary>
  <ul>
    <li><a href="#bucket-url">Bucket URL</a></li>
  </ul>
</details>
<details>
  <summary>
  <a href="#plugin">RTM Events</a>
  </summary>
  <ul>
    <li><a href="#session--reference">Session Events</a></li>
    <li><a href="#message-events-reference">Message Events</a></li>
    <li><a href="#people-events-reference">People Events</a></li>
    <li><a href="#campaign-events-reference">Campaign Events</a></li>
    <li><a href="#browsing-events-reference">Browsing Events</a></li>
    <li><a href="#call-events-reference">Call Events</a></li>
    <li><a href="#widget-events-reference">Widget Events</a></li>
    <li><a href="#status-events-reference">Status Events</a></li>
    <li><a href="#website-events-reference">Website Events</a></li>
    <li><a href="#bucket-events-reference">Bucket Events</a></li>
    <li><a href="#media-events-reference">Media Events</a></li>
    <li><a href="#email-events-reference">Email Events</a></li>
    <li><a href="#plugin-events-reference">Plugin Events</a></li>
  </ul>
</details>


### Website

* #### **Website Conversations**
  * **⭐ List Conversations** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-conversations)
    * `CrispClient.website.listConversations(websiteID, pageNumber)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var pageNumber = 1;
      
      CrispClient.website.listConversations(websiteID, pageNumber);
      ```
      </details>

  * **List Suggested Conversation Segments** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-suggested-conversation-segments)
    * `CrispClient.website.listSuggestedConversationSegments(websiteID, pageNumber)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var pageNumber = 1;
      
      CrispClient.website.listSuggestedConversationSegments(websiteID, pageNumber);
      ```
      </details>

  * **Delete Suggested Conversation Segment** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#delete-suggested-conversation-segment)
    * `CrispClient.website.deleteSuggestedConversationSegment(websiteID, segment)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      
      var segment = "bug";
      
      CrispClient.website.deleteSuggestedConversationSegment(websiteID, segment);
      ```
      </details>

  * **List Suggested Conversation Data Keys** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-suggested-conversation-data-keys)
    * `CrispClient.website.listSuggestedConversationDataKeys(websiteID, pageNumber)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var pageNumber = 1;
      
      CrispClient.website.listSuggestedConversationDataKeys(websiteID, pageNumber);
      ```
      </details>

  * **Delete Suggested Conversation Data Key** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#delete-suggested-conversation-data-key)
    * `CrispClient.website.deleteSuggestedConversationDataKey(websiteID, key)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      
      var key = "price";
      
      CrispClient.website.deleteSuggestedConversationDataKey(websiteID, key);
      ```
      </details>


* #### **Website Conversation**
  * **⭐ Create A New Conversation** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#create-a-new-conversation)
    * `CrispClient.website.createNewConversation(websiteID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      
      CrispClient.website.createNewConversation(websiteID);
      ```
      </details>

  * **Check If Conversation Exists** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#check-if-conversation-exists)
    * `CrispClient.website.checkConversationExists(websiteID, sessionID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";
      
      CrispClient.website.checkConversationExists(websiteID, sessionID);
      ```
      </details>

  * **⭐ Get A Conversation** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-a-conversation)
    * `CrispClient.website.getConversation(websiteID, sessionID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";
      
      CrispClient.website.getConversation(websiteID, sessionID);
      ```
      </details>

  * **Remove A Conversation** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#remove-a-conversation)
    * `CrispClient.website.removeConversation(websiteID, sessionID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";
      
      CrispClient.website.removeConversation(websiteID, sessionID);
      ```
      </details>

  * **Initiate A Conversation With Existing Session** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#initiate-a-conversation-with-existing-session)
    * `CrispClient.website.initiateConversationWithExistingSession(websiteID, sessionID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";
      
      CrispClient.website.initiateConversationWithExistingSession(websiteID, sessionID);
      ```
      </details>

  * **⭐ Get Messages In Conversation** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-messages-in-conversation)
    * `CrispClient.website.getMessagesInConversation(websiteID, sessionID, timestampBefore)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";
      var timestampBefore = 1641206011000;
      
      CrispClient.website.getMessagesInConversation(websiteID, sessionID, timestampBefore);
      ```
      </details>

  * **⭐ Send A Message In Conversation** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#send-a-message-in-conversation)
    * `CrispClient.website.sendMessageInConversation(websiteID, sessionID, message)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";
      
      var message = {
        "type": "text",
        "from": "operator",
        "origin": "chat",
        "content": "Hey there! Need help?"
      };
      
      CrispClient.website.sendMessageInConversation(websiteID, sessionID, message);
      ```
      </details>

  * **Get A Message In Conversation** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-a-message-in-conversation)
    * `CrispClient.website.getMessageInConversation(websiteID, sessionID, fingerprint)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";
      var fingerprint = 524653764345;
      
      CrispClient.website.getMessageInConversation(websiteID, sessionID, fingerprint);
      ```
      </details>

  * **Update A Message In Conversation** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#update-a-message-in-conversation)
    * `CrispClient.website.updateMessageInConversation(websiteID, sessionID, fingerprint, content)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";
      var fingerprint = 524653764345;
      
      var content = "Hey there! Need help?";
      
      CrispClient.website.updateMessageInConversation(websiteID, sessionID, fingerprint, content);
      ```
      </details>

  * **Compose A Message In Conversation** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#compose-a-message-in-conversation)
    * `CrispClient.website.composeMessageInConversation(websiteID, sessionID, compose)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";
      
      var compose = {
        "type": "start",
        "from": "operator"
      };
      
      CrispClient.website.composeMessageInConversation(websiteID, sessionID, compose);
      ```
      </details>

  * **⭐ Mark Messages As Read In Conversation** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#mark-messages-as-read-in-conversation)
    * `CrispClient.website.markMessagesReadInConversation(websiteID, sessionID, read)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";
      
      var read = {
        "from": "operator",
        "origin": "urn:crisp.im:slack:0",
        "fingerprints": [
          "5719231201"
        ]
      };
      
      CrispClient.website.markMessagesReadInConversation(websiteID, sessionID, read);
      ```
      </details>

  * **⭐ Mark Messages As Delivered In Conversation** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#mark-messages-as-delivered-in-conversation)
    * `CrispClient.website.markMessagesDeliveredInConversation(websiteID, sessionID, delivered)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";
      
      var delivered = {
        "from": "operator",
        "origin": "urn:crisp.im:slack:0",
        "fingerprints": [
          "5719231201"
        ]
      };
      
      CrispClient.website.markMessagesDeliveredInConversation(websiteID, sessionID, delivered);
      ```
      </details>

  * **Update Conversation Open State** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#update-conversation-open-state)
    * `CrispClient.website.updateConversationOpenState(websiteID, sessionID, opened)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";
      
      var opened = true;
      
      CrispClient.website.updateConversationOpenState(websiteID, sessionID, opened);
      ```
      </details>

  * **⭐ Get Conversation Routing Assign** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-conversation-routing-assign)
    * `CrispClient.website.getConversationRoutingAssign(websiteID, sessionID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";
      
      CrispClient.website.getConversationRoutingAssign(websiteID, sessionID);
      ```
      </details>

  * **⭐ Assign Conversation Routing** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#assign-conversation-routing)
    * `CrispClient.website.assignConversationRouting(websiteID, sessionID, assign)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";
      
      var assign = {
        "assigned": {
          "user_id": "a4c32c68-be91-4e29-8a05-976e93abbe3f"
        }
      };
      
      CrispClient.website.assignConversationRouting(websiteID, sessionID, assign);
      ```
      </details>

  * **⭐ Get Conversation Metas** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-conversation-metas)
    * `CrispClient.website.getConversationMetas(websiteID, sessionID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";
      
      CrispClient.website.getConversationMetas(websiteID, sessionID);
      ```
      </details>

  * **⭐ Update Conversation Metas** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#update-conversation-metas)
    * `CrispClient.website.updateConversationMetas(websiteID, sessionID, metas)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";
      
      var metas = {
        "nickname": "John Doe",
        "email": "john.doe@acme-inc.com",
        "segments": [
          "happy",
          "customer",
          "love"
        ],
        "data": {
          "type": "customer",
          "signup": "finished"
        }
      };
      
      CrispClient.website.updateConversationMetas(websiteID, sessionID, metas);
      ```
      </details>

  * **Get An Original Message In Conversation** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-an-original-message-in-conversation)
    * `CrispClient.website.getOriginalMessageInConversation(websiteID, sessionID, originalID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";
      var originalID = "2325a3c0-9b47-4fc6-b00e-111b752e44cd";
      
      CrispClient.website.getOriginalMessageInConversation(websiteID, sessionID, originalID);
      ```
      </details>

  * **List Conversation Pages** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-conversation-pages)
    * `CrispClient.website.listConversationPages(websiteID, sessionID, pageNumber)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";
      var pageNumber = 1;
      
      CrispClient.website.listConversationPages(websiteID, sessionID, pageNumber);
      ```
      </details>

  * **List Conversation Events** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-conversation-events)
    * `CrispClient.website.listConversationEvents(websiteID, sessionID, pageNumber)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";
      var pageNumber = 1;
      
      CrispClient.website.listConversationEvents(websiteID, sessionID, pageNumber);
      ```
      </details>

  * **Get Conversation State** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-conversation-state)
    * `CrispClient.website.getConversationState(websiteID, sessionID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";
      
      CrispClient.website.getConversationState(websiteID, sessionID);
      ```
      </details>

  * **⭐ Change Conversation State** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#change-conversation-state)
    * `CrispClient.website.changeConversationState(websiteID, sessionID, state)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";
      
      var state = "unresolved";
      
      CrispClient.website.changeConversationState(websiteID, sessionID, state);
      ```
      </details>

  * **Get Conversation Participants** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-conversation-participants)
    * `CrispClient.website.getConversationParticipants(websiteID, sessionID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";
      
      CrispClient.website.getConversationParticipants(websiteID, sessionID);
      ```
      </details>

  * **Save Conversation Participants** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#save-conversation-participants)
    * `CrispClient.website.saveConversationParticipants(websiteID, sessionID, participants)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";
      
      var participants = {
        "participants": [
          {
            "type": "email",
            "target": "jane.doe@acme-inc.com"
          }
        ]
      };
      
      CrispClient.website.saveConversationParticipants(websiteID, sessionID, participants);
      ```
      </details>

  * **Get Block Status For Conversation** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-block-status-for-conversation)
    * `CrispClient.website.getBlockStatusForConversation(websiteID, sessionID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";
      
      CrispClient.website.getBlockStatusForConversation(websiteID, sessionID);
      ```
      </details>

  * **Block Incoming Messages For Conversation** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#block-incoming-messages-for-conversation)
    * `CrispClient.website.blockIncomingMessagesForConversation(websiteID, sessionID, blocked)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";
      
      var blocked = true;
      
      CrispClient.website.blockIncomingMessagesForConversation(websiteID, sessionID, blocked);
      ```
      </details>

  * **Request Email Transcript For Conversation** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#request-email-transcript-for-conversation)
    * `CrispClient.website.requestEmailTranscriptForConversation(websiteID, sessionID, to, email)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";
      
      var email = {
        "to": "operator",
        "email": "valerian@crisp.chat"
      };
      
      CrispClient.website.requestEmailTranscriptForConversation(websiteID, sessionID, to, email);
      ```
      </details>

  * **Request Chatbox Binding Purge For Conversation** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#request-chatbox-binding-purge-for-conversation)
    * `CrispClient.website.requestChatboxBindingPurgeForConversation(websiteID, sessionID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";
      
      CrispClient.website.requestChatboxBindingPurgeForConversation(websiteID, sessionID);
      ```
      </details>

  * **List Browsing Sessions For Conversation** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-browsing-sessions-for-conversation)
    * `CrispClient.website.listBrowsingSessionsForConversation(websiteID, sessionID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";
      
      CrispClient.website.listBrowsingSessionsForConversation(websiteID, sessionID);
      ```
      </details>

  * **Initiate Browsing Session For Conversation** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#initiate-browsing-session-for-conversation)
    * `CrispClient.website.initiateBrowsingSessionForConversation(websiteID, sessionID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";
      
      CrispClient.website.initiateBrowsingSessionForConversation(websiteID, sessionID);
      ```
      </details>

  * **Send Action To An Existing Browsing Session** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#send-action-to-an-existing-browsing-session)
    * `CrispClient.website.sendActionToExistingBrowsingSession(websiteID, sessionID, browsingID, action)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";
      var browsingID = "browsing_05a9392d-ff3f-45e7-b021-1179c45668fa";
      
      var action = "start";
      
      CrispClient.website.sendActionToExistingBrowsingSession(websiteID, sessionID, browsingID, action);
      ```
      </details>

  * **Assist Existing Browsing Session** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#assist-an-existing-browsing-session)
    * `CrispClient.website.assistExistingBrowsingSession(websiteID, sessionID, browsingID, assist)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";
      var browsingID = "browsing_05a9392d-ff3f-45e7-b021-1179c45668fa";
      
      var assist = {
        "action": "mouse",
        "mouse": {
          "x": 0,
          "y": 784
        }
      };
      
      CrispClient.website.assistExistingBrowsingSession(websiteID, sessionID, browsingID, assist);
      ```
      </details>

  * **Initiate New Call Session For Conversation** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#initiate-new-call-session-for-conversation)
    * `CrispClient.website.initiateNewCallSessionForConversation(websiteID, sessionID, mode)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";
      
      var mode = "audio";
      
      CrispClient.website.initiateNewCallSessionForConversation(websiteID, sessionID, mode);
      ```
      </details>

  * **Get Ongoing Call Session For Conversation** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-ongoing-call-session-for-conversation)
    * `CrispClient.website.getOngoingCallSessionForConversation(websiteID, sessionID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";
      
      CrispClient.website.getOngoingCallSessionForConversation(websiteID, sessionID);
      ```
      </details>

  * **Abort Ongoing Call Session For Conversation** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#abort-ongoing-call-session-for-conversation)
    * `CrispClient.website.abortOngoingCallSessionForConversation(websiteID, sessionID, callID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";
      var callID = "call_35a0c062-72fa-4095-a2a0-f9911d47ee56";
      
      CrispClient.website.abortOngoingCallSessionForConversation(websiteID, sessionID, callID);
      ```
      </details>

  * **Transmit Signaling On Ongoing Call Session** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#transmit-signaling-on-ongoing-call-session)
    * `CrispClient.website.transmitSignalingOnOngoingCallSession(websiteID, sessionID, callID, payload)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";
      var callID = "call_35a0c062-72fa-4095-a2a0-f9911d47ee56";
      
      var payload = {
        "type": "sdp",
        "payload": {}
      };
      
      CrispClient.website.transmitSignalingOnOngoingCallSession(websiteID, sessionID, callID, payload);
      ```
      </details>

  * **Deliver Widget Button Action For Conversation** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#deliver-widget-button-action-for-conversation)
    * `CrispClient.website.deliverWidgetButtonActionForConversation(websiteID, sessionID, pluginID, sectionID, itemID, data, value)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";
      var pluginID = "c64f3595-adee-425a-8d3a-89d47f7ed6bb";
      var sectionID = "8f8d3041-6698-43b8-a559-ae93211e6292";
      var itemID = "7631d7d8-4fe7-4ef8-9a36-31183dcd4785";
      
      var value = {
        "section_id": "payments",
        "item_id": "refund_on_stripe",
        "data": {
          "invoice": "D-1929-X"
        }
      };
      
      CrispClient.website.deliverWidgetButtonActionForConversation(websiteID, sessionID, pluginID, sectionID, itemID, data, value);
      ```
      </details>

  * **Deliver Widget Data Fetch Action For Conversation** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#deliver-widget-data-action-for-conversation)
    * `CrispClient.website.deliverWidgetDataFetchActionForConversation(websiteID, sessionID, pluginID, sectionID, itemID, data)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";
      var pluginID = "c64f3595-adee-425a-8d3a-89d47f7ed6bb";
      var sectionID = "8f8d3041-6698-43b8-a559-ae93211e6292";
      var itemID = "7631d7d8-4fe7-4ef8-9a36-31183dcd4785";
      
      var data = {
        "section_id": "payments",
        "item_id": "unpaid_balance",
        "action": "fetch",
        "data": {}
      };
      
      CrispClient.website.deliverWidgetDataFetchActionForConversation(websiteID, sessionID, pluginID, sectionID, itemID, data);
      ```
      </details>

  * **Deliver Widget Data Edit Action For Conversation** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#deliver-widget-data-action-for-conversation)
    * `CrispClient.website.deliverWidgetDataEditActionForConversation(websiteID, sessionID, pluginID, sectionID, itemID, value)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";
      var pluginID = "c64f3595-adee-425a-8d3a-89d47f7ed6bb";
      var sectionID = "8f8d3041-6698-43b8-a559-ae93211e6292";
      var itemID = "7631d7d8-4fe7-4ef8-9a36-31183dcd4785";
      
      var data = {
        "section_id": "payments",
        "item_id": "unpaid_balance",
        "action": "fetch",
        "data": {}
      };
      
      CrispClient.website.deliverWidgetDataFetchActionForConversation(websiteID, sessionID, pluginID, sectionID, itemID, data);
      ```
      </details>

  * **Schedule A Reminder For Conversation** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#schedule-a-reminder-for-conversation)
    * `CrispClient.website.scheduleReminderForConversation(websiteID, sessionID, date, note)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";
      
      var note = {
        "date": "2018-05-29T09:00:00Z",
        "note": "Call this customer."
      };
      
      CrispClient.website.scheduleReminderForConversation(websiteID, sessionID, date, note);
      ```
      </details>


* ### **Website People** _(these are your end-users)_
  * **Get People Statistics** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-people-statistics)
    * `CrispClient.website.getPeopleStatistics(websiteID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      
      CrispClient.website.getPeopleStatistics(websiteID);
      ```
      </details>

  * **List Suggested People Segments** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-suggested-people-segments)
    * `CrispClient.website.listSuggestedPeopleSegments(websiteID, pageNumber)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var pageNumber = 1;
      
      CrispClient.website.listSuggestedPeopleSegments(websiteID, pageNumber);
      ```
      </details>

  * **Delete Suggested People Segment** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#delete-suggested-people-segment)
    * `CrispClient.website.deleteSuggestedPeopleSegment(websiteID, segment)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      
      var segment = "poweruser";
      
      CrispClient.website.deleteSuggestedPeopleSegment(websiteID, segment);
      ```
      </details>

  * **List Suggested People Data Keys** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-suggested-people-data-keys/)
    * `CrispClient.website.listSuggestedPeopleDataKeys(websiteID, pageNumber)`
  * **Delete Suggested People Data Key** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#delete-suggested-people-data-key)
    * `CrispClient.website.deleteSuggestedPeopleDataKey(websiteID, key)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      
      var key = "price";
      
      CrispClient.website.deleteSuggestedPeopleDataKey(websiteID, key);
      ```
      </details>

  * **List Suggested People Events** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-suggested-people-events)
    * `CrispClient.website.listSuggestedPeopleEvents(websiteID, pageNumber)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var pageNumber = 1;
      
      CrispClient.website.listSuggestedPeopleEvents(websiteID, pageNumber);
      ```
      </details>

  * **Delete Suggested People Event** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#delete-suggested-people-event)
    * `CrispClient.website.deleteSuggestedPeopleEvent(websiteID, text)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      
      var text = "Removed item from basket";
      
      CrispClient.website.deleteSuggestedPeopleEvent(websiteID, text);
      ```
      </details>

  * **⭐ List People Profiles** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-people-profiles)
    * `CrispClient.website.listPeopleProfiles(websiteID, pageNumber, searchField, searchOrder, searchOperator, searchFilter, searchText)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var pageNumber = 1;
      
      CrispClient.website.listPeopleProfiles(websiteID, pageNumber, searchField, searchOrder, searchOperator, searchFilter, searchText);
      ```
      </details>

  * **⭐ Add New People Profile** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#add-new-people-profile)
    * `CrispClient.website.addNewPeopleProfile(websiteID, peopleProfile)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      
      var peopleProfile = {
        "email": "valerian@crisp.chat",
        "person": {
          "nickname": "Valerian Saliou"
        }
      };
      
      CrispClient.website.addNewPeopleProfile(websiteID, peopleProfile);
      ```
      </details>

  * **⭐ Check If People Profile Exists** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#check-if-people-profile-exists)
    * `CrispClient.website.checkPeopleProfileExists(websiteID, peopleID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var peopleID = "c5a2f70c-f605-4648-b47f-8c39d4b03a50";
      
      CrispClient.website.checkPeopleProfileExists(websiteID, peopleID);
      ```
      </details>

  * **⭐ Get People Profile** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-people-profile)
    * `CrispClient.website.getPeopleProfile(websiteID, peopleID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var peopleID = "c5a2f70c-f605-4648-b47f-8c39d4b03a50";
      
      CrispClient.website.getPeopleProfile(websiteID, peopleID);
      ```
      </details>

  * **⭐ Save People Profile** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#save-people-profile)
    * `CrispClient.website.savePeopleProfile(websiteID, peopleID, peopleProfile)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var peopleID = "c5a2f70c-f605-4648-b47f-8c39d4b03a50";
      
      var peopleProfile = {
        "email": "valerian@crisp.chat",
        "person": {
          "nickname": "Valerian Saliou"
        }
      };
      
      CrispClient.website.savePeopleProfile(websiteID, peopleID, peopleProfile);
      ```
      </details>

  * **⭐ Update People Profile** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#update-people-profile)
    * `CrispClient.website.updatePeopleProfile(websiteID, peopleID, peopleProfile)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var peopleID = "c5a2f70c-f605-4648-b47f-8c39d4b03a50";
      
      var peopleProfile = {
        "email": "valerian@crisp.chat",
        "person": {
          "nickname": "Valerian Saliou"
        }
      };
      
      CrispClient.website.updatePeopleProfile(websiteID, peopleID, peopleProfile);
      ```
      </details>

  * **⭐ Remove People Profile** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#remove-people-profile)
    * `CrispClient.website.removePeopleProfile(websiteID, peopleID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var peopleID = "c5a2f70c-f605-4648-b47f-8c39d4b03a50";
      
      CrispClient.website.removePeopleProfile(websiteID, peopleID);
      ```
      </details>

  * **List People Conversations** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-people-conversations)
    * `CrispClient.website.listPeopleConversations(websiteID, peopleID, pageNumber)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var peopleID = "c5a2f70c-f605-4648-b47f-8c39d4b03a50";
      var pageNumber = 1;
      
      CrispClient.website.listPeopleConversations(websiteID, peopleID, pageNumber);
      ```
      </details>

  * **List People Campaigns** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-people-campaigns)
    * `CrispClient.website.listPeopleCampaigns(websiteID, peopleID, pageNumber)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var peopleID = "c5a2f70c-f605-4648-b47f-8c39d4b03a50";
      var pageNumber = 1;
      
      CrispClient.website.listPeopleCampaigns(websiteID, peopleID, pageNumber);
      ```
      </details>

  * **Add A People Event** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#add-a-people-event)
    * `CrispClient.website.addPeopleEvent(websiteID, peopleID, peopleEvent)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var peopleID = "c5a2f70c-f605-4648-b47f-8c39d4b03a50";
      
      var peopleEvent = {
        "text": "Added item to basket",
        "data": {
          "price": 10.99,
          "currency": "USD"
        },
        "color": "red"
      };
      
      CrispClient.website.addPeopleEvent(websiteID, peopleID, peopleEvent);
      ```
      </details>

  * **List People Events** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-people-events)
    * `CrispClient.website.listPeopleEvents(websiteID, peopleID, pageNumber)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var peopleID = "c5a2f70c-f605-4648-b47f-8c39d4b03a50";
      var pageNumber = 1;
      
      CrispClient.website.listPeopleEvents(websiteID, peopleID, pageNumber);
      ```
      </details>

  * **Get People Data** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-people-data)
    * `CrispClient.website.getPeopleData(websiteID, peopleID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var peopleID = "c5a2f70c-f605-4648-b47f-8c39d4b03a50";
      
      CrispClient.website.getPeopleData(websiteID, peopleID);
      ```
      </details>

  * **Save People Data** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#save-people-data)
    * `CrispClient.website.savePeopleData(websiteID, peopleID, peopleData)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var peopleID = "c5a2f70c-f605-4648-b47f-8c39d4b03a50";
      
      var peopleData = {
        "data": {
          "type": "customer",
          "signup": "finished"
        }
      };
      
      CrispClient.website.savePeopleData(websiteID, peopleID, peopleData);
      ```
      </details>

  * **Update People Data** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#update-people-data)
    * `CrispClient.website.updatePeopleData(websiteID, peopleID, peopleData)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var peopleID = "c5a2f70c-f605-4648-b47f-8c39d4b03a50";
      
      var peopleData = {
        "data": {
          "signup": "finished"
        }
      };
      
      CrispClient.website.updatePeopleData(websiteID, peopleID, peopleData);
      ```
      </details>

  * **Get People Subscription Status** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-people-subscription-status)
    * `CrispClient.website.getPeopleSubscriptionStatus(websiteID, peopleID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var peopleID = "c5a2f70c-f605-4648-b47f-8c39d4b03a50";
      
      CrispClient.website.getPeopleSubscriptionStatus(websiteID, peopleID);
      ```
      </details>

  * **Update People Subscription Status** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#update-people-subscription-status)
    * `CrispClient.website.updatePeopleSubscriptionStatus(websiteID, peopleID, peopleSubscription)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var peopleID = "c5a2f70c-f605-4648-b47f-8c39d4b03a50";
      
      var peopleSubscription = {
        "email": true
      };
      
      CrispClient.website.updatePeopleSubscriptionStatus(websiteID, peopleID, peopleSubscription);
      ```
      </details>

  * **Export People Profiles** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#export-people-profiles)
    * `CrispClient.website.exportPeopleProfiles(websiteID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      
      CrispClient.website.exportPeopleProfiles(websiteID);
      ```
      </details>

  * **Import People Profiles** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#import-people-profiles)
    * `CrispClient.website.importPeopleProfiles(websiteID, profileImportSetup)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      
      var profileImportSetup = {
        "url": "https://storage.crisp.chat/users/processing/import/aa0b64dd-9fb4-4db9-80d6-5a49eb84087b/19d956c7-0294-45ad-89e1-58ce45e7008f.csv",
        "mapping": [
          {
            "column": 1,
            "field": "email"
          },
          {
            "column": 2,
            "field": "person.nickname"
          }
        ],
        "options": {
          "column_separator": ";",
          "skip_header": true
        }
      };
      
      CrispClient.website.importPeopleProfiles(websiteID, profileImportSetup);
      ```
      </details>


_👉 Notice: The `peopleID` argument can be an email or the `peopleID`._

* #### **Website Base**
  * **Check If Website Exists** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#check-if-website-exists)
    * `CrispClient.website.checkWebsiteExists(domain)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      CrispClient.website.checkWebsiteExists(domain);
      ```
      </details>

  * **Create Website** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#create-website)
    * `CrispClient.website.createWebsite(websiteData)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      CrispClient.website.createWebsite(websiteData);
      ```
      </details>

  * **Get A Website** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-a-website)
    * `CrispClient.website.getWebsite(websiteID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      
      CrispClient.website.getWebsite(websiteID);
      ```
      </details>

  * **Delete A Website** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#delete-a-website)
    * `CrispClient.website.deleteWebsite(websiteID, verify)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      
      var verify = "MySuperSecurePassword";
      
      CrispClient.website.deleteWebsite(websiteID, verify);
      ```
      </details>


* #### **Website Settings**
  * **Get Website Settings** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-website-settings)
    * `CrispClient.website.getWebsiteSettings(websiteID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      
      CrispClient.website.getWebsiteSettings(websiteID);
      ```
      </details>

  * **Update Website Settings** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#update-website-settings)
    * `CrispClient.website.updateWebsiteSettings(websiteID, settings)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      
      var settings = {
        "name": "Crisp",
        "domain": "crisp.chat",
        "logo": "https://storage.crisp.chat/users/avatar/website/8c842203-7ed8-4e29-a608-7cf78a7d2fcc/b6c2948d-b061-405e-91a9-2fdf855d1cc0.png",
        "contact": {
          "email": "contact@crisp.chat",
          "phone": "+33757905447"
        },
        "inbox": {
          "lock_removal": false,
          "force_operator_token": false
        },
        "emails": {
          "rating": true,
          "transcript": true,
          "enrich": true,
          "junk_filter": true
        },
        "chatbox": {
          "tile": "default",
          "wait_game": false,
          "last_operator_face": false,
          "ongoing_operator_face": true,
          "activity_metrics": true,
          "operator_privacy": false,
          "availability_tooltip": true,
          "hide_vacation": false,
          "hide_on_away": false,
          "hide_on_mobile": false,
          "position_reverse": false,
          "email_visitors": false,
          "phone_visitors": false,
          "force_identify": false,
          "ignore_privacy": false,
          "visitor_compose": false,
          "file_transfer": true,
          "helpdesk_link": true,
          "status_health_dead": true,
          "check_domain": false,
          "color_theme": "blue",
          "text_theme": "default",
          "welcome_message": "default",
          "locale": "en",
          "allowed_pages": [],
          "blocked_pages": [
            "status/*/",
            "docs.crisp.chat/*",
            "crisp.chat/terms/",
            "https://crisp.chat/privacy/"
          ],
          "blocked_countries": [
            "IT"
          ],
          "blocked_locales": [
            "fa",
            "he"
          ],
          "blocked_ips": [
            "8.8.8.8",
            "2001:0db8:85a3:0000:0000:8a2e:0370:7334",
            "192.168.1.1/24"
          ]
        }
      };
      
      CrispClient.website.updateWebsiteSettings(websiteID, settings);
      ```
      </details>


* #### **Website Operator**
  * **List Website Operators** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-website-operators)
    * `CrispClient.website.listWebsiteOperators(websiteID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      
      CrispClient.website.listWebsiteOperators(websiteID);
      ```
      </details>

  * **List Last Active Website Operators** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-last-active-website-operators)
    * `CrispClient.website.listLastActiveWebsiteOperators(websiteID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      
      CrispClient.website.listLastActiveWebsiteOperators(websiteID);
      ```
      </details>

  * **Flush Last Active Website Operators** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#flush-last-active-website-operators)
    * `CrispClient.website.flushLastActiveWebsiteOperators(websiteID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      
      CrispClient.website.flushLastActiveWebsiteOperators(websiteID);
      ```
      </details>

  * **Send Email To Website Operators** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#send-email-to-website-operators)
    * `CrispClient.website.sendEmailToWebsiteOperators(websiteID, emailData)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      
      var emailData = {
        "recipient": "owners",
        "subject": "Plugin limits reached",
        "message": "Hi, you've reached the Slack plugin limits. Please contact our support team."
      };
      
      CrispClient.website.sendEmailToWebsiteOperators(websiteID, emailData);
      ```
      </details>

  * **Get A Website Operator** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-a-website-operator)
    * `CrispClient.website.getWebsiteOperator(websiteID, userID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var userID = "a4c32c68-be91-4e29-8a05-976e93abbe3f";
      
      CrispClient.website.getWebsiteOperator(websiteID, userID);
      ```
      </details>

  * **Invite A Website Operator** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#invite-a-website-operator)
    * `CrispClient.website.inviteWebsiteOperator(websiteID, email, role, verify)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      
      var verify = {
        "email": "julien@crisp.chat",
        "role": "member",
        "verify": "MySuperSecurePassword"
      };
      
      CrispClient.website.inviteWebsiteOperator(websiteID, email, role, verify);
      ```
      </details>

  * **Change Operator Membership** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#change-operator-membership)
    * `CrispClient.website.changeOperatorMembership(websiteID, userID, role, title)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var userID = "a4c32c68-be91-4e29-8a05-976e93abbe3f";
      
      var title = {
        "role": "owner",
        "title": "CTO"
      };
      
      CrispClient.website.changeOperatorMembership(websiteID, userID, role, title);
      ```
      </details>

  * **Unlink Operator From Website** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#unlink-operator-from-website)
    * `CrispClient.website.unlinkOperatorFromWebsite(websiteID, userID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var userID = "a4c32c68-be91-4e29-8a05-976e93abbe3f";
      
      CrispClient.website.unlinkOperatorFromWebsite(websiteID, userID);
      ```
      </details>


* #### **Website Visitors**
  * **Count Visitors** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#count-visitors)
    * `CrispClient.website.countVisitors(websiteID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      
      CrispClient.website.countVisitors(websiteID);
      ```
      </details>

  * **List Visitors** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-visitors)
    * `CrispClient.website.listVisitors(websiteID, pageNumber)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var pageNumber = 1;
      
      CrispClient.website.listVisitors(websiteID, pageNumber);
      ```
      </details>

  * **Pinpoint Visitors On A Map** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#pinpoint-visitors-on-a-map)
    * `CrispClient.website.pinpointVisitorsOnMap(websiteID, centerLongitude, centerLatitude, centerRadius)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      
      CrispClient.website.pinpointVisitorsOnMap(websiteID, centerLongitude, centerLatitude, centerRadius);
      ```
      </details>

  * **Get Session Identifier From Token** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-session-identifier-from-token)
    * `CrispClient.website.getSessionIdentifierFromToken(websiteID, tokenID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var tokenID = "d3c17241-1327-47d7-9d8e-b89ff7bd2904";
      
      CrispClient.website.getSessionIdentifierFromToken(websiteID, tokenID);
      ```
      </details>

  * **Count Blocked Visitors** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#count-blocked-visitors/)
    * `CrispClient.website.countBlockedVisitors(websiteID)`
  * **Count Blocked Visitors In Rule** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#count-blocked-visitors-in-rule)
    * `CrispClient.website.countBlockedVisitorsInRule(websiteID, rule)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      
      CrispClient.website.countBlockedVisitorsInRule(websiteID, rule);
      ```
      </details>

  * **Clear Blocked Visitors In Rule** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#clear-blocked-visitors-in-rule)
    * `CrispClient.website.clearBlockedVisitorsInRule(websiteID, rule)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      
      CrispClient.website.clearBlockedVisitorsInRule(websiteID, rule);
      ```
      </details>


* #### **Website Availability**
  * **Get Website Availability Status** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-website-availability-status)
    * `CrispClient.website.getWebsiteAvailabilityStatus(websiteID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      
      CrispClient.website.getWebsiteAvailabilityStatus(websiteID);
      ```
      </details>

  * **List Website Operator Availabilities** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-website-operator-availabilities)
    * `CrispClient.website.listWebsiteOperatorAvailabilities(websiteID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      
      CrispClient.website.listWebsiteOperatorAvailabilities(websiteID);
      ```
      </details>


* #### **Website Analytics**
  * **Acquire Analytics Points** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#acquire-analytics-points)
    * `CrispClient.website.acquireAnalyticsPoints(websiteID, pointType, pointMetric, dateFrom, dateTo, dateSplit, classifier, filterPrimary, filterSecondary, filterTertiary)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      
      CrispClient.website.acquireAnalyticsPoints(websiteID, pointType, pointMetric, dateFrom, dateTo, dateSplit, classifier, filterPrimary, filterSecondary, filterTertiary);
      ```
      </details>

  * **List Analytics Filters** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-analytics-filters)
    * `CrispClient.website.listAnalyticsFilters(websiteID, pageNumber, pointType, pointMetric, dateFrom, dateTo)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var pageNumber = 1;
      
      CrispClient.website.listAnalyticsFilters(websiteID, pageNumber, pointType, pointMetric, dateFrom, dateTo);
      ```
      </details>

  * **List Analytics Classifiers** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-analytics-classifiers)
    * `CrispClient.website.listAnalyticsClassifiers(websiteID, pageNumber, pointType, pointMetric, dateFrom, dateTo)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var pageNumber = 1;
      
      CrispClient.website.listAnalyticsClassifiers(websiteID, pageNumber, pointType, pointMetric, dateFrom, dateTo);
      ```
      </details>


* #### **Website Batch**
  * **Batch Resolve Conversations** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#batch-resolve-items)
    * `CrispClient.website.batchResolveConversations(websiteID, sessions)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      
      CrispClient.website.batchResolveConversations(websiteID, sessions);
      ```
      </details>

  * **Batch Read Conversations** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#batch-read-items)
    * `CrispClient.website.batchReadConversations(websiteID, sessions)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      
      CrispClient.website.batchReadConversations(websiteID, sessions);
      ```
      </details>

  * **Batch Remove Conversations** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#batch-remove-items)
    * `CrispClient.website.batchRemoveConversations(websiteID, sessions)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      
      var sessions = [
        "session_19e5240f-0a8d-461e-a661-a3123fc6eec9",
        "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881"
      ];
      
      CrispClient.website.batchRemoveConversations(websiteID, sessions);
      ```
      </details>

  * **Batch Remove People** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#batch-remove-items)
    * `CrispClient.website.batchRemovePeople(websiteID, people)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      
      var sessions = [
        "session_19e5240f-0a8d-461e-a661-a3123fc6eec9",
        "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881"
      ];
      
      CrispClient.website.batchRemoveConversations(websiteID, sessions);
      ```
      </details>


* #### **Website Verify**
  * **Get Verify Settings** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-verify-settings)
    * `CrispClient.website.getVerifySettings(websiteID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      
      CrispClient.website.getVerifySettings(websiteID);
      ```
      </details>

  * **Update Verify Settings** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#update-verify-settings)
    * `CrispClient.website.updateVerifySettings(websiteID, settings)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      
      var settings = {
        "enabled": true
      };
      
      CrispClient.website.updateVerifySettings(websiteID, settings);
      ```
      </details>

  * **Get Verify Key** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-verify-key)
    * `CrispClient.website.getVerifyKey(websiteID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      
      CrispClient.website.getVerifyKey(websiteID);
      ```
      </details>

  * **Roll Verify Key** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#roll-verify-key)
    * `CrispClient.website.rollVerifyKey(websiteID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      
      CrispClient.website.rollVerifyKey(websiteID);
      ```
      </details>


* #### **Website Campaigns**
  * **List Campaigns** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-campaigns)
    * `CrispClient.website.listCampaigns(websiteID, pageNumber)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var pageNumber = 1;
      
      CrispClient.website.listCampaigns(websiteID, pageNumber);
      ```
      </details>

  * **List Campaign Tags** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-campaign-tags)
    * `CrispClient.website.listCampaignTags(websiteID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      
      CrispClient.website.listCampaignTags(websiteID);
      ```
      </details>

  * **List Campaign Templates** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-campaign-templates)
    * `CrispClient.website.listCampaignTemplates(websiteID, pageNumber)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var pageNumber = 1;
      
      CrispClient.website.listCampaignTemplates(websiteID, pageNumber);
      ```
      </details>

  * **Create A New Campaign Template** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#create-a-new-campaign-template)
    * `CrispClient.website.createNewCampaignTemplate(websiteID, templateFormat, templateName)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      
      var templateName = {
        "name": "HTML Template",
        "format": "html"
      };
      
      CrispClient.website.createNewCampaignTemplate(websiteID, templateFormat, templateName);
      ```
      </details>

  * **Check If Campaign Template Exists** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#check-if-campaign-template-exists)
    * `CrispClient.website.checkCampaignTemplateExists(websiteID, templateID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var templateID = "a4876300-4dae-47f7-8599-3bf9283f36c2";
      
      CrispClient.website.checkCampaignTemplateExists(websiteID, templateID);
      ```
      </details>

  * **Get A Campaign Template** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-a-campaign-template)
    * `CrispClient.website.getCampaignTemplate(websiteID, templateID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var templateID = "a4876300-4dae-47f7-8599-3bf9283f36c2";
      
      CrispClient.website.getCampaignTemplate(websiteID, templateID);
      ```
      </details>

  * **Save A Campaign Template** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#save-a-campaign-template)
    * `CrispClient.website.saveCampaignTemplate(websiteID, templateID, template)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var templateID = "a4876300-4dae-47f7-8599-3bf9283f36c2";
      
      var template = {
        "name": "HTML Template",
        "format": "html",
        "content": "<html><body><a href=\"{{url.unsubscribe}}\"></a></body></html>"
      };
      
      CrispClient.website.saveCampaignTemplate(websiteID, templateID, template);
      ```
      </details>

  * **Update A Campaign Template** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#update-a-campaign-template)
    * `CrispClient.website.updateCampaignTemplate(websiteID, templateID, template)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var templateID = "a4876300-4dae-47f7-8599-3bf9283f36c2";
      
      var template = "<html><body><a href=\"{{url.unsubscribe}}\"></a></body></html>";
      
      CrispClient.website.updateCampaignTemplate(websiteID, templateID, template);
      ```
      </details>

  * **Remove A Campaign Template** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#remove-a-campaign-template)
    * `CrispClient.website.removeCampaignTemplate(websiteID, templateID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var templateID = "a4876300-4dae-47f7-8599-3bf9283f36c2";
      
      CrispClient.website.removeCampaignTemplate(websiteID, templateID);
      ```
      </details>


* #### **Website Campaign**
  * **Create A New Campaign** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#create-a-new-campaign)
    * `CrispClient.website.createNewCampaign(websiteID, campaignType, campaignName)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      
      var campaignName = {
        "type": "one-shot",
        "name": "Welcome!"
      };
      
      CrispClient.website.createNewCampaign(websiteID, campaignType, campaignName);
      ```
      </details>

  * **Check If Campaign Exists** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#check-if-campaign-exists)
    * `CrispClient.website.checkCampaignExists(websiteID, campaignID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var campaignID = "355d805f-a72f-457e-a3e5-5d01521f3cd8";
      
      CrispClient.website.checkCampaignExists(websiteID, campaignID);
      ```
      </details>

  * **Get A Campaign** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-a-campaign)
    * `CrispClient.website.getCampaign(websiteID, campaignID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var campaignID = "355d805f-a72f-457e-a3e5-5d01521f3cd8";
      
      CrispClient.website.getCampaign(websiteID, campaignID);
      ```
      </details>

  * **Save A Campaign** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#save-a-campaign)
    * `CrispClient.website.saveCampaign(websiteID, campaignID, campaign)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var campaignID = "355d805f-a72f-457e-a3e5-5d01521f3cd8";
      
      var campaign = {
        "type": "one-shot",
        "format": "markdown",
        "name": "Welcome!",
        "sender": {
          "user_id": "aa0b64dd-9fb4-4db9-80d6-5a49eb84087b"
        },
        "recipients": {
          "type": "all"
        },
        "message": "*Hey there*, welcome on Crisp!",
        "options": {
          "deliver_to_chatbox": true,
          "deliver_to_email": true,
          "sender_name_website": false,
          "sender_email_reply": null,
          "tracking": true
        }
      };
      
      CrispClient.website.saveCampaign(websiteID, campaignID, campaign);
      ```
      </details>

  * **Update A Campaign** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#update-a-campaign)
    * `CrispClient.website.updateCampaign(websiteID, campaignID, campaign)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var campaignID = "355d805f-a72f-457e-a3e5-5d01521f3cd8";
      
      var campaign = {
        "message": "*Hey there*, welcome on Crisp folks!"
      };
      
      CrispClient.website.updateCampaign(websiteID, campaignID, campaign);
      ```
      </details>

  * **Remove A Campaign** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#remove-a-campaign)
    * `CrispClient.website.removeCampaign(websiteID, campaignID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var campaignID = "355d805f-a72f-457e-a3e5-5d01521f3cd8";
      
      CrispClient.website.removeCampaign(websiteID, campaignID);
      ```
      </details>

  * **Dispatch A Campaign** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#dispatch-a-campaign)
    * `CrispClient.website.dispatchCampaign(websiteID, campaignID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var campaignID = "355d805f-a72f-457e-a3e5-5d01521f3cd8";
      
      CrispClient.website.dispatchCampaign(websiteID, campaignID);
      ```
      </details>

  * **Resume A Campaign** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#resume-a-campaign)
    * `CrispClient.website.resumeCampaign(websiteID, campaignID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var campaignID = "355d805f-a72f-457e-a3e5-5d01521f3cd8";
      
      CrispClient.website.resumeCampaign(websiteID, campaignID);
      ```
      </details>

  * **Pause A Campaign** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#pause-a-campaign)
    * `CrispClient.website.pauseCampaign(websiteID, campaignID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var campaignID = "355d805f-a72f-457e-a3e5-5d01521f3cd8";
      
      CrispClient.website.pauseCampaign(websiteID, campaignID);
      ```
      </details>

  * **Test A Campaign** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#test-a-campaign)
    * `CrispClient.website.testCampaign(websiteID, campaignID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var campaignID = "355d805f-a72f-457e-a3e5-5d01521f3cd8";
      
      CrispClient.website.testCampaign(websiteID, campaignID);
      ```
      </details>

  * **List Campaign Recipients** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-campaign-recipients)
    * `CrispClient.website.listCampaignRecipients(websiteID, campaignID, pageNumber)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var campaignID = "355d805f-a72f-457e-a3e5-5d01521f3cd8";
      var pageNumber = 1;
      
      CrispClient.website.listCampaignRecipients(websiteID, campaignID, pageNumber);
      ```
      </details>

  * **List Campaign Statistics** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-campaign-statistics)
    * `CrispClient.website.listCampaignStatistics(websiteID, campaignID, action, pageNumber)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var campaignID = "355d805f-a72f-457e-a3e5-5d01521f3cd8";
      var pageNumber = 1;
      
      CrispClient.website.listCampaignStatistics(websiteID, campaignID, action, pageNumber);
      ```
      </details>


### Plugin

* #### **Plugin Connect**
  * **⭐ Get Connect Account** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-connect-account)
    * `CrispClient.plugin.getConnectAccount()`
    * <details>
      <summary>See Example</summary>

      ```javascript
      CrispClient.plugin.getConnectAccount();
      ```
      </details>

  * **⭐ Check Connect Session Validity** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#check-connect-session-validity)
    * `CrispClient.plugin.checkConnectSessionValidity()`
    * <details>
      <summary>See Example</summary>

      ```javascript
      CrispClient.plugin.checkConnectSessionValidity();
      ```
      </details>

  * **⭐ List All Connect Websites** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-all-connect-websites)
    * `CrispClient.plugin.listAllConnectWebsites(pageNumber, filterConfigured, dateSince)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var pageNumber = 1;
      
      CrispClient.plugin.listAllConnectWebsites(pageNumber, filterConfigured, dateSince);
      ```
      </details>


* #### **Plugin Subscription**
  * **List All Active Subscriptions** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-all-active-subscriptions)
    * `CrispClient.plugin.listAllActiveSubscriptions()`
    * <details>
      <summary>See Example</summary>

      ```javascript
      CrispClient.plugin.listAllActiveSubscriptions();
      ```
      </details>

  * **List Subscriptions For A Website** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-subscriptions-for-a-website)
    * `CrispClient.plugin.listSubscriptionsForWebsite(websiteID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      
      CrispClient.plugin.listSubscriptionsForWebsite(websiteID);
      ```
      </details>

  * **Get Subscription Details** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-subscription-details)
    * `CrispClient.plugin.getSubscriptionDetails(websiteID, pluginID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var pluginID = "c64f3595-adee-425a-8d3a-89d47f7ed6bb";
      
      CrispClient.plugin.getSubscriptionDetails(websiteID, pluginID);
      ```
      </details>

  * **Subscribe Website To Plugin** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#subscribe-website-to-plugin)
    * `CrispClient.plugin.subscribeWebsiteToPlugin(websiteID, pluginID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var pluginID = "c64f3595-adee-425a-8d3a-89d47f7ed6bb";
      
      var pluginID = "98454664-9f7d-4d95-a9ce-f37356f5e65a";
      
      CrispClient.plugin.subscribeWebsiteToPlugin(websiteID, pluginID);
      ```
      </details>

  * **Unsubscribe Plugin From Website** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#unsubscribe-plugin-from-website)
    * `CrispClient.plugin.unsubscribePluginFromWebsite(websiteID, pluginID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var pluginID = "c64f3595-adee-425a-8d3a-89d47f7ed6bb";
      
      CrispClient.plugin.unsubscribePluginFromWebsite(websiteID, pluginID);
      ```
      </details>

  * **Get Subscription Settings** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-subscription-settings)
    * `CrispClient.plugin.getSubscriptionSettings(websiteID, pluginID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var pluginID = "c64f3595-adee-425a-8d3a-89d47f7ed6bb";
      
      CrispClient.plugin.getSubscriptionSettings(websiteID, pluginID);
      ```
      </details>

  * **Save Subscription Settings** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#save-subscription-settings)
    * `CrispClient.plugin.saveSubscriptionSettings(websiteID, pluginID, settings)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var pluginID = "c64f3595-adee-425a-8d3a-89d47f7ed6bb";
      
      var settings = {
        "chatbox": {
          "25": "#bbbbbb"
        }
      };
      
      CrispClient.plugin.saveSubscriptionSettings(websiteID, pluginID, settings);
      ```
      </details>

  * **Update Subscription Settings** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#update-subscription-settings)
    * `CrispClient.plugin.updateSubscriptionSettings(websiteID, pluginID, settings)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var pluginID = "c64f3595-adee-425a-8d3a-89d47f7ed6bb";
      
      var settings = {
        "chatbox": {
          "25": "#bbbbbb"
        }
      };
      
      CrispClient.plugin.updateSubscriptionSettings(websiteID, pluginID, settings);
      ```
      </details>

  * **Forward Plugin Payload To Channel** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#forward-plugin-payload-to-channel)
    * `CrispClient.plugin.forwardPluginPayloadToChannel(websiteID, pluginID, payload)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var pluginID = "c64f3595-adee-425a-8d3a-89d47f7ed6bb";
      
      var payload = {
        "namespace": "bot:step",
        "payload": {
          "step": 1
        }
      };
      
      CrispClient.plugin.forwardPluginPayloadToChannel(websiteID, pluginID, payload);
      ```
      </details>

  * **Dispatch Plugin Event** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#dispatch-plugin-event)
    * `CrispClient.plugin.dispatchPluginEvent(websiteID, pluginID, payload)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var pluginID = "c64f3595-adee-425a-8d3a-89d47f7ed6bb";
      
      var payload = {
        "name": "bot-is-running",
        "data": {
          "bot": "Sales",
          "email": "valerian@crisp.chat"
        }
      };
      
      CrispClient.plugin.dispatchPluginEvent(websiteID, pluginID, payload);
      ```
      </details>


### Media

* #### **Media Animation**
  * **List Animation Medias** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-animation-medias)
    * `CrispClient.media.listAnimationMedias(pageNumber, listID, searchQuery)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var listID = "f7fb43da-1cd8-49c1-ade0-9f5b71d034e3";
      var pageNumber = 1;
      
      CrispClient.media.listAnimationMedias(pageNumber, listID, searchQuery);
      ```
      </details>


### Bucket

* #### **Bucket URL**
  * **Generate Bucket URL** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#bucket-url)
    * `CrispClient.bucket.generateBucketURL(data)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      CrispClient.bucket.generateBucketURL(data);
      ```
      </details>


## Realtime Events

You can bind to realtime events from Crisp, in order to get notified of incoming messages and updates in websites.

You won't receive any event if you don't explicitly subscribe to realtime events using `CrispClient.on()`, as the library doesn't connect to the realtime backend automatically.

Available events are listed below:

* #### **Session Events**: [Reference](https://docs.crisp.chat/references/rtm-api/v1/#session-events)
  * **Session Update Availability** [`user`, `plugin`]:
    * `session:update_availability`
  * **Session Update Verify** [`user`, `plugin`]:
    * `session:update_verify`
  * **Session Request Initiated** [`user`, `plugin`]:
    * `session:request:initiated`
  * **Session Set Email** [`user`, `plugin`]:
    * `session:set_email`
  * **Session Set Phone** [`user`, `plugin`]:
    * `session:set_phone`
  * **Session Set Address** [`user`, `plugin`]:
    * `session:set_address`
  * **Session Set Avatar** [`user`, `plugin`]:
    * `session:set_avatar`
  * **Session Set Nickname** [`user`, `plugin`]:
    * `session:set_nickname`
  * **Session Set Data** [`user`, `plugin`]:
    * `session:set_data`
  * **Session Sync Pages** [`user`, `plugin`]:
    * `session:sync:pages`
  * **Session Sync Events** [`user`, `plugin`]: 
    * `session:sync:events`
  * **Session Sync Capabilities** [`user`, `plugin`]:
    * `session:sync:capabilities`
  * **Session Sync Geolocation** [`user`, `plugin`]:
    * `session:sync:geolocation`
  * **Session Sync System** [`user`, `plugin`]:
    * `session:sync:system`
  * **Session Sync Network** [`user`, `plugin`]:
    * `session:sync:network`
  * **Session Sync Timezone** [`user`, `plugin`]:
    * `session:sync:timezone`
  * **Session Sync Locales** [`user`, `plugin`]:
    * `session:sync:locales`
  * **Session Sync Rating** [`user`, `plugin`]:
    * `session:sync:rating`
  * **Session Set State** [`user`, `plugin`]:
    * `session:set_state`
  * **Session Set Block** [`user`, `plugin`]:
    * `session:set_block`
  * **Session Set Segments** [`user`, `plugin`]:
    * `session:set_segments`
  * **Session Set Opened** [`user`, `plugin`]:
    * `session:set_opened`
  * **Session Set Closed** [`user`, `plugin`]:
    * `session:set_closed`
  * **Session Set Participants** [`user`, `plugin`]:
    * `session:set_participants`
  * **Session Set Mentions** [`user`, `plugin`]:
    * `session:set_mentions`
  * **Session Set Routing** [`user`, `plugin`]:
    * `session:set_routing`
  * **Session Removed** [`user`, `plugin`]:
    * `session:removed`

* #### **Message Events**: [Reference](https://docs.crisp.chat/references/rtm-api/v1/#message-events)
  * **Message Updated** [`user`, `plugin`]:
    * `message:updated`
  * **Message Send** [`user`, `plugin`]:
    * `message:send`
  * **Message Received** [`user`, `plugin`]:
    * `message:received`
  * **Message Compose Send** [`user`, `plugin`]:
    * `message:compose:send`
  * **Message Compose Receive** [`user`, `plugin`]:
    * `message:compose:receive`
  * **Message Acknowledge Read Send** [`user`, `plugin`]:
    * `message:acknowledge:read:send`
  * **Message Acknowledge Read Received** [`user`, `plugin`]:
    * `message:acknowledge:read:received`
  * **Message Acknowledge Delivered** [`user`, `plugin`]:
    * `message:acknowledge:delivered`
  * **Message Notify Unread Send** [`user`, `plugin`]:
    * `message:notify:unread:send`
  * **Message Notify Unread Received** [`user`, `plugin`]:
    * `message:notify:unread:received`

* #### **People Events**: [Reference](https://docs.crisp.chat/references/rtm-api/v1/#people-events)
  * **People Profile Created** [`user`, `plugin`]:
    * `people:profile:created`
  * **People Profile Updated** [`user`, `plugin`]:
    * `people:profile:updated`
  * **People Profile Removed** [`user`, `plugin`]:
    * `people:profile:removed`
  * **People Bind Session** [`user`, `plugin`]:
    * `people:bind:session`
  * **People Sync Profile** [`user`, `plugin`]:
    * `people:sync:profile`
  * **People Import Progress** [`user`]:
    * `people:import:progress`
  * **People Import Done** [`user`]:
    * `people:import:done`

* #### **Campaign Events**: [Reference](https://docs.crisp.chat/references/rtm-api/v1/#campaign-events)
  * **Campaign Progress** [`user`]:
    * `campaign:progress`
  * **Campaign Dispatched** [`user`]:
    * `campaign:dispatched`
  * **Campaign Running** [`user`]:
    * `campaign:running`

* #### **Browsing Events**: [Reference](https://docs.crisp.chat/references/rtm-api/v1/#browsing-events)
  * **Browsing Request Initiated** [`user`, `plugin`]:
    * `browsing:request:initiated`
  * **Browsing Request Rejected** [`user`, `plugin`]:
    * `browsing:request:rejected`

* #### **Call Events**: [Reference](https://docs.crisp.chat/references/rtm-api/v1/#call-events)
  * **Call Request Initiated** [`user`, `plugin`]:
    * `call:request:initiated`
  * **Call Request Rejected** [`user`, `plugin`]:
    * `call:request:rejected`

* #### **Widget Events**: [Reference](https://docs.crisp.chat/references/rtm-api/v1/#widget-events)
  * **Widget Action Processed** [`user`]:
    * `widget:action:processed`

* #### **Status Events**: [Reference](https://docs.crisp.chat/references/rtm-api/v1/#status-events)
  * **Status Health Changed** [`user`]:
    * `status:health:changed`

* #### **Website Events**: [Reference](https://docs.crisp.chat/references/rtm-api/v1/#website-events)
  * **Website Update Visitors Count** [`user`, `plugin`]:
    * `website:update_visitors_count`
  * **Website Update Operators Availability** [`user`, `plugin`]:
    * `website:update_operators_availability`
  * **Website Users Available** [`user`, `plugin`]: 
    * `website:users:available`

* #### **Bucket Events**: [Reference](https://docs.crisp.chat/references/rtm-api/v1/#bucket-events)
  * **Bucket URL Upload Generated** [`user`, `plugin`]:
    * `bucket:url:upload:generated`
  * **Bucket URL Avatar Generated** [`user`, `plugin`]:
    * `bucket:url:avatar:generated`
  * **Bucket URL Website Generated** [`user`, `plugin`]:
    * `bucket:url:website:generated`
  * **Bucket URL Campaign Generated** [`user`, `plugin`]:
    * `bucket:url:campaign:generated`
  * **Bucket URL Helpdesk Generated** [`user`, `plugin`]:
    * `bucket:url:helpdesk:generated`
  * **Bucket URL Status Generated** [`user`, `plugin`]:
    * `bucket:url:status:generated`
  * **Bucket URL Processing Generated** [`user`, `plugin`]:
    * `bucket:url:processing:generated`

* #### **Media Events**: [Reference](https://docs.crisp.chat/references/rtm-api/v1/#media-events)
  * **Media Animation Listed** [`user`]:
    * `media:animation:listed`

* #### **Email Events**: [Reference](https://docs.crisp.chat/references/rtm-api/v1/#email-events)
  * **Email Subscribe** [`user`, `plugin`]:
    * `email:subscribe`
  * **Email Track View** [`user`, `plugin`]:
    * `email:track:view`

* #### **Plugin Events**: [Reference](https://docs.crisp.chat/references/rtm-api/v1/#plugin-events)
  * **Plugin Channel** [`user`, `plugin`]: 
    * `plugin:channel`
  * **Plugin Event** [`user`, `plugin`]:
    * `plugin:event`
  * **Plugin Settings Saved** [`user`, `plugin`]: 
    * `plugin:settings:saved`
