# Crisp API Wrapper

[![Test and Build](https://github.com/crisp-im/node-crisp-api/actions/workflows/test.yml/badge.svg)](https://github.com/crisp-im/node-crisp-api/actions/workflows/test.yml) [![Build and Release](https://github.com/crisp-im/node-crisp-api/actions/workflows/build.yml/badge.svg)](https://github.com/crisp-im/node-crisp-api/actions/workflows/build.yml) [![Version](https://img.shields.io/npm/v/crisp-api.svg)](https://www.npmjs.com/package/crisp-api) [![Downloads](https://img.shields.io/npm/dt/crisp-api.svg)](https://www.npmjs.com/package/crisp-api)

The Crisp API Node wrapper. Authenticate, send messages, fetch conversations, access your agent accounts from your JavaScript code.

Copyright 2026 Crisp IM SAS. See LICENSE for copying information.

* **📝 Implements**: [REST API Reference (V1)](https://docs.crisp.chat/references/rest-api/v1/) at revision: 16/10/2026
* **😘 Maintainers**: [@baptistejamin](https://github.com/baptistejamin), [@eliottvincent](https://github.com/eliottvincent), [@valeriansaliou](https://github.com/valeriansaliou)

## Installation

`npm install --save crisp-api`

## Authentication

To authenticate against the API, obtain your authentication token keypair by following the [REST API Authentication](https://docs.crisp.chat/guides/rest-api/authentication/) guide. You'll get a token keypair made of 2 values.

**Keep your token keypair values private, and store them safely for long-term use.**

Then, add authentication parameters to your `client` instance right after you create it:

```javascript
var { Crisp } = require("crisp-api");
var CrispClient = new Crisp();

// Authenticate to API with your token (identifier, key)
// eg. CrispClient.authenticate("7c3ef21c-1e04-41ce-8c06-5605c346f73e", "cc29e1a5086e428fcc6a697d5837a66d82808e65c5cce006fbf2191ceea80a0a");
CrispClient.authenticateTier(tier, identifier, key);

// Now, you can use authenticated API sections.
```

## Overview

You may follow the [REST API Quickstart](https://docs.crisp.chat/guides/rest-api/quickstart/) guide, which will get you running with the REST API in minutes.

```javascript
var { Crisp } = require("crisp-api");
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
var { Crisp } = require("crisp-api");
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
})
  .then(function() {
    console.error("Requested to listen to sent messages");
  })
  .catch(function(error) {
    console.error("Failed listening to sent messages:", error);
  });
```

## Resource Methods

All the available Crisp API resources are fully implemented. **Programmatic methods names are named after their label name in the [REST API Reference](https://docs.crisp.chat/references/rest-api/v1/)**.

All methods that you will most likely need when building a Crisp integration are prefixed with a star symbol (⭐).

**⚠️ Note that, depending on your authentication token tier, which is either `user`, `website` or `plugin`, you may not be allowed to use all methods from the library. When in doubt, refer to the library method descriptions below. Most likely, you are using a `plugin` token.**

---

<details>
  <summary>
  <a href="#website">Website</a>
  </summary>
  <ul>
    <li><a href="#website-conversations">Website Conversations</a></li>
    <li><a href="#website-conversation">Website Conversation</a></li>
    <li><a href="#website-people-these-are-your-end-users">Website People</a></li>
    <li><a href="#website-helpdesk">Website Helpdesk</a></li>
    <li><a href="#website-operator">Website Operator</a></li>
    <li><a href="#website-availability">Website Availability</a></li>
    <li><a href="#website-analytics">Website Analytics</a></li>
    <li><a href="#website-inbox">Website Inbox</a></li>
    <li><a href="#website-teams">Website Teams</a></li>
    <li><a href="#website-verify">Website Verify</a></li>
    <li><a href="#website-campaigns">Website Campaigns</a></li>
    <li><a href="#website-connect">Website Connect</a></li>
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
  <a href="#plan">Plan</a>
  </summary>
  <ul>
    <li><a href="#plan-subscription">Plan Subscription</a></li>
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
  <a href="#realtime-events">RTM Events</a>
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

---


### Website


* #### **Website Conversations**
  * **⭐ List Conversations**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-conversations)
    * `CrispClient.website.listConversations(websiteID, pageNumber, options)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var pageNumber = 1;

      var options = {
        per_page: 50
      }

      CrispClient.website.listConversations(websiteID, pageNumber, options);
      ```
      </details>

  * **List Suggested Conversation Segments**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-suggested-conversation-segments)
    * `CrispClient.website.listSuggestedConversationSegments(websiteID, pageNumber)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var pageNumber = 1;

      CrispClient.website.listSuggestedConversationSegments(websiteID, pageNumber);
      ```
      </details>

  * **Delete Suggested Conversation Segment**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#delete-suggested-conversation-segment)
    * `CrispClient.website.deleteSuggestedConversationSegment(websiteID, segment)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

      var segment = "bug";

      CrispClient.website.deleteSuggestedConversationSegment(websiteID, segment);
      ```
      </details>

  * **List Suggested Conversation Data Keys**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-suggested-conversation-data-keys)
    * `CrispClient.website.listSuggestedConversationDataKeys(websiteID, pageNumber)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var pageNumber = 1;

      CrispClient.website.listSuggestedConversationDataKeys(websiteID, pageNumber);
      ```
      </details>

  * **Delete Suggested Conversation Data Key**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#delete-suggested-conversation-data-key)
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
  * **⭐ Create A New Conversation**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#create-a-new-conversation)
    * `CrispClient.website.createNewConversation(websiteID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

      CrispClient.website.createNewConversation(websiteID);
      ```
      </details>

  * **Check If Conversation Exists**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#check-if-conversation-exists)
    * `CrispClient.website.checkConversationExists(websiteID, sessionID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";

      CrispClient.website.checkConversationExists(websiteID, sessionID);
      ```
      </details>

  * **⭐ Get A Conversation**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-a-conversation)
    * `CrispClient.website.getConversation(websiteID, sessionID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";

      CrispClient.website.getConversation(websiteID, sessionID);
      ```
      </details>

  * **Remove A Conversation**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#remove-a-conversation)
    * `CrispClient.website.removeConversation(websiteID, sessionID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";

      CrispClient.website.removeConversation(websiteID, sessionID);
      ```
      </details>

  * **Initiate A Conversation With Existing Session**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#initiate-a-conversation-with-existing-session)
    * `CrispClient.website.initiateConversationWithExistingSession(websiteID, sessionID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";

      CrispClient.website.initiateConversationWithExistingSession(websiteID, sessionID);
      ```
      </details>

  * **⭐ Get Messages In Conversation**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-messages-in-conversation)
    * `CrispClient.website.getMessagesInConversation(websiteID, sessionID, timestampBefore, timestampAfter, timestampAround)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";

      // Either 'timestampBefore', 'timestampAfter' or 'timestampAround'
      var timestampBefore = 1641206011000;

      CrispClient.website.getMessagesInConversation(websiteID, sessionID, timestampBefore);
      ```
      </details>

  * **⭐ Send A Message In Conversation**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#send-a-message-in-conversation)
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

  * **Get A Message In Conversation**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-a-message-in-conversation)
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

  * **Update A Message In Conversation**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#update-a-message-in-conversation)
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

  * **Remove A Message In Conversation**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#remove-a-message-in-conversation)
    * `CrispClient.website.removeMessageInConversation(websiteID, sessionID, fingerprint)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";
      var fingerprint = 524653764345;

      CrispClient.website.removeMessageInConversation(websiteID, sessionID, fingerprint);
      ```
      </details>

  * **Compose A Message In Conversation**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#compose-a-message-in-conversation)
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

  * **⭐ Mark Messages As Read In Conversation**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#mark-messages-as-read-in-conversation)
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

  * **Mark Conversation As Unread**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#mark-conversation-as-unread)
    * `CrispClient.website.markConversationAsUnread(websiteID, sessionID, unread)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";

      var unread = {
        "from": "operator"
      };

      CrispClient.website.markConversationAsUnread(websiteID, sessionID, unread);
      ```
      </details>

  * **⭐ Mark Messages As Delivered In Conversation**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#mark-messages-as-delivered-in-conversation)
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

  * **Update Conversation Open State**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#update-conversation-open-state)
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

  * **⭐ Get Conversation Routing Assign**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-conversation-routing-assign)
    * `CrispClient.website.getConversationRoutingAssign(websiteID, sessionID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";

      CrispClient.website.getConversationRoutingAssign(websiteID, sessionID);
      ```
      </details>

  * **⭐ Assign Conversation Routing**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#assign-conversation-routing)
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

  * **Update Conversation Inbox**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#update-conversation-inbox)
    * `CrispClient.website.updateConversationInbox(websiteID, sessionID, inboxID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";
      var inboxID = "bf6935c9-43b3-4f8e-87ea-175c1e1ed1a9";

      CrispClient.website.updateConversationInbox(websiteID, sessionID, inboxID);
      ```
      </details>

  * **⭐ Get Conversation Metas**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-conversation-metas)
    * `CrispClient.website.getConversationMetas(websiteID, sessionID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";

      CrispClient.website.getConversationMetas(websiteID, sessionID);
      ```
      </details>

  * **⭐ Update Conversation Metas**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#update-conversation-metas)
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

  * **Get An Original Message In Conversation**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-an-original-message-in-conversation)
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

  * **List Conversation Pages**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-conversation-pages)
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

  * **List Conversation Events**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-conversation-events)
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

  * **List Conversation Files**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-conversation-files)
    * `CrispClient.website.listConversationFiles(websiteID, sessionID, pageNumber)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";
      var pageNumber = 1;

      CrispClient.website.listConversationFiles(websiteID, sessionID, pageNumber);
      ```
      </details>

  * **Get Conversation State**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-conversation-state)
    * `CrispClient.website.getConversationState(websiteID, sessionID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";

      CrispClient.website.getConversationState(websiteID, sessionID);
      ```
      </details>

  * **⭐ Change Conversation State**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#change-conversation-state)
    * `CrispClient.website.changeConversationState(websiteID, sessionID, state, user, origin)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";

      var state = "unresolved";

      CrispClient.website.changeConversationState(websiteID, sessionID, state);
      ```
      </details>

  * **Get Conversation Relations**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-conversation-relations)
    * `CrispClient.website.getConversationRelations(websiteID, sessionID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";

      CrispClient.website.getConversationRelations(websiteID, sessionID);
      ```
      </details>

  * **Get Conversation Participants**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-conversation-participants)
    * `CrispClient.website.getConversationParticipants(websiteID, sessionID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";

      CrispClient.website.getConversationParticipants(websiteID, sessionID);
      ```
      </details>

  * **Save Conversation Participants**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#save-conversation-participants)
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

  * **Get Block Status For Conversation**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-block-status-for-conversation)
    * `CrispClient.website.getBlockStatusForConversation(websiteID, sessionID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";

      CrispClient.website.getBlockStatusForConversation(websiteID, sessionID);
      ```
      </details>

  * **Block Incoming Messages For Conversation**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#block-incoming-messages-for-conversation)
    * `CrispClient.website.blockIncomingMessagesForConversation(websiteID, sessionID, blocked, user, origin)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";

      var blocked = true;

      CrispClient.website.blockIncomingMessagesForConversation(websiteID, sessionID, blocked);
      ```
      </details>

  * **Get Verify Status For Conversation**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-verify-status-for-conversation)
    * `CrispClient.website.getVerifyStatusForConversation(websiteID, sessionID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";

      CrispClient.website.getVerifyStatusForConversation(websiteID, sessionID);
      ```
      </details>

  * **Update Verify Status For Conversation**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#update-verify-status-for-conversation)
    * `CrispClient.website.updateVerifyStatusForConversation(websiteID, sessionID, verified)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";

      var verified = true;

      CrispClient.website.updateVerifyStatusForConversation(websiteID, sessionID, verified);
      ```
      </details>

  * **Request Identity Verification For Conversation**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#request-identity-verification-for-conversation)
    * `CrispClient.website.requestIdentityVerificationForConversation(websiteID, sessionID, verification)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";

      var verification = {
        "identity": "email"
      };

      CrispClient.website.requestIdentityVerificationForConversation(websiteID, sessionID, verification);
      ```
      </details>

  * **Redeem Identity Verification Link For Conversation**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#redeem-identity-verification-link-for-conversation)
    * `CrispClient.website.redeemIdentityVerificationLinkForConversation(websiteID, sessionID, identity, token)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";

      var verification = {
        "identity": "email",
        "token": "709691"
      };

      CrispClient.website.redeemIdentityVerificationLinkForConversation(websiteID, sessionID, verification);
      ```
      </details>

  * **Request Email Transcript For Conversation**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#request-email-transcript-for-conversation)
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

  * **Request Chatbox Binding Purge For Conversation**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#request-chatbox-binding-purge-for-conversation)
    * `CrispClient.website.requestChatboxBindingPurgeForConversation(websiteID, sessionID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";

      CrispClient.website.requestChatboxBindingPurgeForConversation(websiteID, sessionID);
      ```
      </details>

  * **Request User Feedback For Conversation**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#request-user-feedback-for-conversation)
    * `CrispClient.website.requestUserFeedbackForConversation(websiteID, sessionID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";

      CrispClient.website.requestUserFeedbackForConversation(websiteID, sessionID);
      ```
      </details>

  * **List Browsing Sessions For Conversation**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-browsing-sessions-for-conversation)
    * `CrispClient.website.listBrowsingSessionsForConversation(websiteID, sessionID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";

      CrispClient.website.listBrowsingSessionsForConversation(websiteID, sessionID);
      ```
      </details>

  * **Initiate Browsing Session For Conversation**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#initiate-browsing-session-for-conversation)
    * `CrispClient.website.initiateBrowsingSessionForConversation(websiteID, sessionID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";

      CrispClient.website.initiateBrowsingSessionForConversation(websiteID, sessionID);
      ```
      </details>

  * **Send Action To An Existing Browsing Session**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#send-action-to-an-existing-browsing-session)
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

  * **Assist Existing Browsing Session**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#assist-an-existing-browsing-session)
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

  * **Initiate New Call Session For Conversation**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#initiate-new-call-session-for-conversation)
    * `CrispClient.website.initiateNewCallSessionForConversation(websiteID, sessionID, mode, user, origin)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";

      var mode = "audio";

      CrispClient.website.initiateNewCallSessionForConversation(websiteID, sessionID, mode);
      ```
      </details>

  * **Get Ongoing Call Session For Conversation**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-ongoing-call-session-for-conversation)
    * `CrispClient.website.getOngoingCallSessionForConversation(websiteID, sessionID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";

      CrispClient.website.getOngoingCallSessionForConversation(websiteID, sessionID);
      ```
      </details>

  * **Abort Ongoing Call Session For Conversation**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#abort-ongoing-call-session-for-conversation)
    * `CrispClient.website.abortOngoingCallSessionForConversation(websiteID, sessionID, callID, user, origin)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";
      var callID = "call_35a0c062-72fa-4095-a2a0-f9911d47ee56";

      CrispClient.website.abortOngoingCallSessionForConversation(websiteID, sessionID, callID);
      ```
      </details>

  * **Transmit Signaling On Ongoing Call Session**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#transmit-signaling-on-ongoing-call-session)
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

  * **Request Tool Call For Conversation**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#request-tool-call-for-conversation)
    * `CrispClient.website.requestToolCallForConversation(websiteID, sessionID, command, payload)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";

      var command = "list_tools";

      CrispClient.website.requestToolCallForConversation(websiteID, sessionID, command);
      ```
      </details>

  * **Schedule A Reminder For Conversation**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#schedule-a-reminder-for-conversation)
    * `CrispClient.website.scheduleReminderForConversation(websiteID, sessionID, date, note, user, origin)`
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

  * **Report Conversation**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#report-conversation)
    * `CrispClient.website.reportConversation(websiteID, sessionID, flag)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";

      var flag = "spam";

      CrispClient.website.reportConversation(websiteID, sessionID, flag);
      ```
      </details>


* ### **Website People** _(these are your end-users)_
  * **Get People Statistics**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-people-statistics)
    * `CrispClient.website.getPeopleStatistics(websiteID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

      CrispClient.website.getPeopleStatistics(websiteID);
      ```
      </details>

  * **List Suggested People Segments**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-suggested-people-segments)
    * `CrispClient.website.listSuggestedPeopleSegments(websiteID, pageNumber)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var pageNumber = 1;

      CrispClient.website.listSuggestedPeopleSegments(websiteID, pageNumber);
      ```
      </details>

  * **Delete Suggested People Segment**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#delete-suggested-people-segment)
    * `CrispClient.website.deleteSuggestedPeopleSegment(websiteID, segment)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

      var segment = "poweruser";

      CrispClient.website.deleteSuggestedPeopleSegment(websiteID, segment);
      ```
      </details>

  * **List Suggested People Data Keys**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-suggested-people-data-keys)
    * `CrispClient.website.listSuggestedPeopleDataKeys(websiteID, pageNumber)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var pageNumber = 1;

      CrispClient.website.listSuggestedPeopleDataKeys(websiteID, pageNumber);
      ```
      </details>

  * **Delete Suggested People Data Key**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#delete-suggested-people-data-key)
    * `CrispClient.website.deleteSuggestedPeopleDataKey(websiteID, key)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

      var key = "price";

      CrispClient.website.deleteSuggestedPeopleDataKey(websiteID, key);
      ```
      </details>

  * **List Suggested People Events**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-suggested-people-events)
    * `CrispClient.website.listSuggestedPeopleEvents(websiteID, pageNumber)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var pageNumber = 1;

      CrispClient.website.listSuggestedPeopleEvents(websiteID, pageNumber);
      ```
      </details>

  * **Delete Suggested People Event**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#delete-suggested-people-event)
    * `CrispClient.website.deleteSuggestedPeopleEvent(websiteID, text)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

      var text = "Removed item from basket";

      CrispClient.website.deleteSuggestedPeopleEvent(websiteID, text);
      ```
      </details>

  * **⭐ List People Profiles**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-people-profiles)
    * `CrispClient.website.listPeopleProfiles(websiteID, pageNumber, searchField, searchOrder, searchOperator, searchFilter, searchText)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var pageNumber = 1;

      CrispClient.website.listPeopleProfiles(websiteID, pageNumber, searchField, searchOrder, searchOperator, searchFilter, searchText);
      ```
      </details>

  * **⭐ Add New People Profile**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#add-new-people-profile)
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

  * **⭐ Check If People Profile Exists**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#check-if-people-profile-exists)
    * `CrispClient.website.checkPeopleProfileExists(websiteID, peopleID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var peopleID = "c5a2f70c-f605-4648-b47f-8c39d4b03a50";

      CrispClient.website.checkPeopleProfileExists(websiteID, peopleID);
      ```
      </details>

  * **⭐ Get People Profile**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-people-profile)
    * `CrispClient.website.getPeopleProfile(websiteID, peopleID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var peopleID = "c5a2f70c-f605-4648-b47f-8c39d4b03a50";

      CrispClient.website.getPeopleProfile(websiteID, peopleID);
      ```
      </details>

  * **⭐ Save People Profile**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#save-people-profile)
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

  * **⭐ Update People Profile**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#update-people-profile)
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

  * **⭐ Remove People Profile**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#remove-people-profile)
    * `CrispClient.website.removePeopleProfile(websiteID, peopleID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var peopleID = "c5a2f70c-f605-4648-b47f-8c39d4b03a50";

      CrispClient.website.removePeopleProfile(websiteID, peopleID);
      ```
      </details>

  * **List People Conversations**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-people-conversations)
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

  * **Add A People Event**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#add-a-people-event)
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

  * **List People Events**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-people-events)
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

  * **Get People Data**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-people-data)
    * `CrispClient.website.getPeopleData(websiteID, peopleID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var peopleID = "c5a2f70c-f605-4648-b47f-8c39d4b03a50";

      CrispClient.website.getPeopleData(websiteID, peopleID);
      ```
      </details>

  * **Save People Data**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#save-people-data)
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

  * **Update People Data**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#update-people-data)
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

  * **Get People Subscription Status**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-people-subscription-status)
    * `CrispClient.website.getPeopleSubscriptionStatus(websiteID, peopleID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var peopleID = "c5a2f70c-f605-4648-b47f-8c39d4b03a50";

      CrispClient.website.getPeopleSubscriptionStatus(websiteID, peopleID);
      ```
      </details>

  * **Update People Subscription Status**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#update-people-subscription-status)
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


* #### **Website Helpdesk**
  * **Check If Helpdesk Exists**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#check-if-helpdesk-exists)
    * `CrispClient.website.checkHelpdeskExists(websiteID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

      CrispClient.website.checkHelpdeskExists(websiteID);
      ```
      </details>

  * **Resolve Helpdesk**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#resolve-helpdesk)
    * `CrispClient.website.resolveHelpdesk(websiteID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

      CrispClient.website.resolveHelpdesk(websiteID);
      ```
      </details>

  * **List Helpdesk Locales**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-helpdesk-locales)
    * `CrispClient.website.listHelpdeskLocales(websiteID, pageNumber)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var pageNumber = 1;

      CrispClient.website.listHelpdeskLocales(websiteID, pageNumber);
      ```
      </details>

  * **Add Helpdesk Locale**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#add-helpdesk-locale)
    * `CrispClient.website.addHelpdeskLocale(websiteID, locale)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var locale = "en";

      CrispClient.website.addHelpdeskLocale(websiteID, locale);
      ```
      </details>

  * **Check If Helpdesk Locale Exists**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#check-if-helpdesk-locale-exists)
    * `CrispClient.website.checkHelpdeskLocaleExists(websiteID, locale)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var locale = "en";

      CrispClient.website.checkHelpdeskLocaleExists(websiteID, locale);
      ```
      </details>

  * **Resolve Helpdesk Locale**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#resolve-helpdesk-locale)
    * `CrispClient.website.resolveHelpdeskLocale(websiteID, locale)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var locale = "en";

      CrispClient.website.resolveHelpdeskLocale(websiteID, locale);
      ```
      </details>

  * **Delete Helpdesk Locale**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#delete-helpdesk-locale)
    * `CrispClient.website.deleteHelpdeskLocale(websiteID, locale)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var locale = "en";

      CrispClient.website.deleteHelpdeskLocale(websiteID, locale);
      ```
      </details>

  * **List Helpdesk Pages**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-helpdesk-pages)
    * `CrispClient.website.listHelpdeskPages(websiteID, locale, contentType, pageNumber)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var locale = "en";
      var contentType = "articles";
      var pageNumber = 1;

      CrispClient.website.listHelpdeskPages(websiteID, locale, contentType, pageNumber);
      ```
      </details>

  * **Resolve Helpdesk Page Entity**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#resolve-helpdesk-page-entity)
    * `CrispClient.website.resolveHelpdeskPageEntity(websiteID, locale, contentType, entityID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var locale = "en";
      var contentType = "articles";
      var entityID = "01959c8b-0c6e-7e4c-8dfb-6e0a420ac990";

      CrispClient.website.resolveHelpdeskPageEntity(websiteID, locale, contentType, entityID);
      ```
      </details>

  * **List Helpdesk Tree**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-helpdesk-tree)
    * `CrispClient.website.listHelpdeskTree(websiteID, locale, contentType, pageNumber, subPath, searchTitle, filterDateStart, filterDateEnd)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var locale = "en";
      var contentType = "articles";
      var pageNumber = 1;
      var subPath = "guides";
      var searchTitle = "Getting started";
      var filterDateStart = "2025-01-01";
      var filterDateEnd = "2025-12-31";

      CrispClient.website.listHelpdeskTree(websiteID, locale, contentType, pageNumber, subPath, searchTitle, filterDateStart, filterDateEnd);
      ```
      </details>

  * **Create Helpdesk Tree Path**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#create-helpdesk-tree-path)
    * `CrispClient.website.createHelpdeskTreePath(websiteID, locale, contentType, path)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var locale = "en";
      var contentType = "articles";
      var path = "getting-started";

      CrispClient.website.createHelpdeskTreePath(websiteID, locale, contentType, path);
      ```
      </details>

  * **Resolve Helpdesk Tree Path**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#resolve-helpdesk-tree-path)
    * `CrispClient.website.resolveHelpdeskTreePath(websiteID, locale, contentType, path)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var locale = "en";
      var contentType = "articles";
      var path = "getting-started";

      CrispClient.website.resolveHelpdeskTreePath(websiteID, locale, contentType, path);
      ```
      </details>

  * **Update Helpdesk Tree Path**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#update-helpdesk-tree-path)
    * `CrispClient.website.updateHelpdeskTreePath(websiteID, locale, contentType, path, update)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var locale = "en";
      var contentType = "articles";
      var path = "getting-started";
      var update = { action: "move", path: { to: "guides/getting-started" } };

      CrispClient.website.updateHelpdeskTreePath(websiteID, locale, contentType, path, update);
      ```
      </details>

  * **Delete Helpdesk Tree Path**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#delete-helpdesk-tree-path)
    * `CrispClient.website.deleteHelpdeskTreePath(websiteID, locale, contentType, path)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var locale = "en";
      var contentType = "articles";
      var path = "getting-started";

      CrispClient.website.deleteHelpdeskTreePath(websiteID, locale, contentType, path);
      ```
      </details>

  * **Resolve Helpdesk Tree Content**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#resolve-helpdesk-tree-content)
    * `CrispClient.website.resolveHelpdeskTreeContent(websiteID, locale, contentType, path)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var locale = "en";
      var contentType = "articles";
      var path = "getting-started";

      CrispClient.website.resolveHelpdeskTreeContent(websiteID, locale, contentType, path);
      ```
      </details>

  * **Save Helpdesk Tree Content**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#save-helpdesk-tree-content)
    * `CrispClient.website.saveHelpdeskTreeContent(websiteID, locale, contentType, path, content)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var locale = "en";
      var contentType = "articles";
      var path = "getting-started";
      var content = "# Getting started\n\nWelcome to our helpdesk.";

      CrispClient.website.saveHelpdeskTreeContent(websiteID, locale, contentType, path, content);
      ```
      </details>

  * **Resolve Helpdesk Tree Metadata**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#resolve-helpdesk-tree-metadata)
    * `CrispClient.website.resolveHelpdeskTreeMetadata(websiteID, locale, contentType, path)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var locale = "en";
      var contentType = "articles";
      var path = "getting-started";

      CrispClient.website.resolveHelpdeskTreeMetadata(websiteID, locale, contentType, path);
      ```
      </details>

  * **Update Helpdesk Tree Metadata**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#update-helpdesk-tree-metadata)
    * `CrispClient.website.updateHelpdeskTreeMetadata(websiteID, locale, contentType, path, metadata)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var locale = "en";
      var contentType = "articles";
      var path = "getting-started";
      var metadata = { title: "Getting started", state: { published: true } };

      CrispClient.website.updateHelpdeskTreeMetadata(websiteID, locale, contentType, path, metadata);
      ```
      </details>

  * **List Helpdesk Tree Alternates**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-helpdesk-tree-alternates)
    * `CrispClient.website.listHelpdeskTreeAlternates(websiteID, locale, contentType, path)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var locale = "en";
      var contentType = "articles";
      var path = "getting-started";

      CrispClient.website.listHelpdeskTreeAlternates(websiteID, locale, contentType, path);
      ```
      </details>

  * **Update Helpdesk Tree Alternates**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#update-helpdesk-tree-alternates)
    * `CrispClient.website.updateHelpdeskTreeAlternates(websiteID, locale, contentType, path, alternates)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var locale = "en";
      var contentType = "articles";
      var path = "getting-started";
      var alternates = { fr: "demarrage" };

      CrispClient.website.updateHelpdeskTreeAlternates(websiteID, locale, contentType, path, alternates);
      ```
      </details>

  * **Resolve Helpdesk Tree Page**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#resolve-helpdesk-tree-page)
    * `CrispClient.website.resolveHelpdeskTreePage(websiteID, locale, contentType, path)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var locale = "en";
      var contentType = "articles";
      var path = "getting-started";

      CrispClient.website.resolveHelpdeskTreePage(websiteID, locale, contentType, path);
      ```
      </details>

  * **Map Helpdesk Locale Feedback Ratings**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#map-helpdesk-locale-feedback-ratings)
    * `CrispClient.website.mapHelpdeskLocaleFeedbackRatings(websiteID, locale, contentType, filterDateStart, filterDateEnd)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var locale = "en";
      var contentType = "articles";
      var filterDateStart = "2025-01-01";
      var filterDateEnd = "2025-12-31";

      CrispClient.website.mapHelpdeskLocaleFeedbackRatings(websiteID, locale, contentType, filterDateStart, filterDateEnd);
      ```
      </details>

  * **List Helpdesk Locale Feedbacks**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-helpdesk-locale-feedbacks)
    * `CrispClient.website.listHelpdeskLocaleFeedbacks(websiteID, locale, contentType, pageNumber, filterDateStart, filterDateEnd)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var locale = "en";
      var contentType = "articles";
      var pageNumber = 1;
      var filterDateStart = "2025-01-01";
      var filterDateEnd = "2025-12-31";

      CrispClient.website.listHelpdeskLocaleFeedbacks(websiteID, locale, contentType, pageNumber, filterDateStart, filterDateEnd);
      ```
      </details>

  * **List Helpdesk Redirections**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-helpdesk-redirections)
    * `CrispClient.website.listHelpdeskRedirections(websiteID, pageNumber)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var pageNumber = 1;

      CrispClient.website.listHelpdeskRedirections(websiteID, pageNumber);
      ```
      </details>

  * **Add Helpdesk Redirection**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#add-helpdesk-redirection)
    * `CrispClient.website.addHelpdeskRedirection(websiteID, redirectionPath, redirectionTarget)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var redirectionPath = "/old-page";
      var redirectionTarget = "/new-page";

      CrispClient.website.addHelpdeskRedirection(websiteID, redirectionPath, redirectionTarget);
      ```
      </details>

  * **Check If Helpdesk Redirection Exists**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#check-if-helpdesk-redirection-exists)
    * `CrispClient.website.checkHelpdeskRedirectionExists(websiteID, redirectionId)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var redirectionId = "01959c8b-0c6e-7e4c-8dfb-6e0a420ac990";

      CrispClient.website.checkHelpdeskRedirectionExists(websiteID, redirectionId);
      ```
      </details>

  * **Resolve Helpdesk Redirection**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#resolve-helpdesk-redirection)
    * `CrispClient.website.resolveHelpdeskRedirection(websiteID, redirectionId)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var redirectionId = "01959c8b-0c6e-7e4c-8dfb-6e0a420ac990";

      CrispClient.website.resolveHelpdeskRedirection(websiteID, redirectionId);
      ```
      </details>

  * **Delete Helpdesk Redirection**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#delete-helpdesk-redirection)
    * `CrispClient.website.deleteHelpdeskRedirection(websiteID, redirectionId)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var redirectionId = "01959c8b-0c6e-7e4c-8dfb-6e0a420ac990";

      CrispClient.website.deleteHelpdeskRedirection(websiteID, redirectionId);
      ```
      </details>

  * **Resolve Helpdesk Settings**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#resolve-helpdesk-settings)
    * `CrispClient.website.resolveHelpdeskSettings(websiteID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

      CrispClient.website.resolveHelpdeskSettings(websiteID);
      ```
      </details>

  * **Save Helpdesk Settings**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#save-helpdesk-settings)
    * `CrispClient.website.saveHelpdeskSettings(websiteID, settings)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var settings = { name: "My Helpdesk" };

      CrispClient.website.saveHelpdeskSettings(websiteID, settings);
      ```
      </details>


* #### **Website Base**
  * **Check If Website Exists**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#check-if-website-exists)
    * `CrispClient.website.checkWebsiteExists(domain)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      CrispClient.website.checkWebsiteExists(domain);
      ```
      </details>

  * **Create Website**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#create-website)
    * `CrispClient.website.createWebsite(websiteData)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      CrispClient.website.createWebsite(websiteData);
      ```
      </details>

  * **Get A Website**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-a-website)
    * `CrispClient.website.getWebsite(websiteID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

      CrispClient.website.getWebsite(websiteID);
      ```
      </details>


* #### **Website Settings**
  * **Get Website Settings**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-website-settings)
    * `CrispClient.website.getWebsiteSettings(websiteID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

      CrispClient.website.getWebsiteSettings(websiteID);
      ```
      </details>

  * **Update Website Settings**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#update-website-settings)
    * `CrispClient.website.updateWebsiteSettings(websiteID, settings)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

      var settings = {
        "name": "Crisp",
        "domain": "crisp.chat",
        "domain_alternates": [],
        "logo": "https://storage.crisp.chat/users/avatar/website/8c842203-7ed8-4e29-a608-7cf78a7d2fcc/b6c2948d-b061-405e-91a9-2fdf855d1cc0.png",
        "audit": {
          "log": true
        },
        "contact": {
          "email": "contact@crisp.chat",
          "phone": "+33757905447"
        },
        "inbox": {
          "lock_removal": false,
          "force_operator_token": false,
          "locale": ""
        },
        "emails": {
          "rating": true,
          "transcript": true,
          "trackers": true,
          "junk_filter": true
        },
        "chatbox": {
          "tile": "default",
          "conversations": true,
          "wait_game": false,
          "website_logo": true,
          "last_operator_face": false,
          "ongoing_operator_face": true,
          "activity_metrics": true,
          "operator_privacy": false,
          "visitor_privacy": false,
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
          "audio_record": true,
          "guard_level": "default",
          "mode_initial": "chat",
          "home": true,
          "overlay_search": true,
          "overlay_mode": false,
          "helpdesk_link": true,
          "helpdesk_only": false,
          "helpdesk_navigate": "deep",
          "status_health_dead": true,
          "check_domain": false,
          "color_theme": "blue",
          "color_mode": "auto",
          "layout_theme": "default",
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
  * **List Website Operators**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-website-operators)
    * `CrispClient.website.listWebsiteOperators(websiteID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

      CrispClient.website.listWebsiteOperators(websiteID);
      ```
      </details>

  * **List Last Active Website Operators**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-last-active-website-operators)
    * `CrispClient.website.listLastActiveWebsiteOperators(websiteID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

      CrispClient.website.listLastActiveWebsiteOperators(websiteID);
      ```
      </details>

  * **Send Email To Website Operators**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#send-email-to-website-operators)
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

  * **Get A Website Operator**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-a-website-operator)
    * `CrispClient.website.getWebsiteOperator(websiteID, userID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var userID = "a4c32c68-be91-4e29-8a05-976e93abbe3f";

      CrispClient.website.getWebsiteOperator(websiteID, userID);
      ```
      </details>


* #### **Website Visitors**
  * **Count Visitors**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#count-visitors)
    * `CrispClient.website.countVisitors(websiteID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

      CrispClient.website.countVisitors(websiteID);
      ```
      </details>

  * **List Visitors**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-visitors)
    * `CrispClient.website.listVisitors(websiteID, pageNumber)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var pageNumber = 1;

      CrispClient.website.listVisitors(websiteID, pageNumber);
      ```
      </details>

  * **Pinpoint Visitors On A Map**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#pinpoint-visitors-on-a-map)
    * `CrispClient.website.pinpointVisitorsOnMap(websiteID, centerLongitude, centerLatitude, centerRadius)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

      CrispClient.website.pinpointVisitorsOnMap(websiteID, centerLongitude, centerLatitude, centerRadius);
      ```
      </details>

  * **Get Session Identifier From Token**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-session-identifier-from-token)
    * `CrispClient.website.getSessionIdentifierFromToken(websiteID, tokenID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var tokenID = "d3c17241-1327-47d7-9d8e-b89ff7bd2904";

      CrispClient.website.getSessionIdentifierFromToken(websiteID, tokenID);
      ```
      </details>


* #### **Website Availability**
  * **Get Website Availability Status**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-website-availability-status)
    * `CrispClient.website.getWebsiteAvailabilityStatus(websiteID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

      CrispClient.website.getWebsiteAvailabilityStatus(websiteID);
      ```
      </details>

  * **List Website Operator Availabilities**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-website-operator-availabilities)
    * `CrispClient.website.listWebsiteOperatorAvailabilities(websiteID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

      CrispClient.website.listWebsiteOperatorAvailabilities(websiteID);
      ```
      </details>


* #### **Website Analytics**
  * **Generate Analytics**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#generate-analytics)
    * `CrispClient.website.generateAnalytics(websiteID, query)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

      CrispClient.website.generateAnalytics(websiteID, query);
      ```
      </details>


* #### **Website Inbox**
  * **List Inboxes**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-website-inboxes)
    * `CrispClient.website.listInboxes(websiteID, pageNumber)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var pageNumber = 1;

      CrispClient.website.listInboxes(websiteID, pageNumber);
      ```
      </details>

  * **Check If Inbox Exists**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#check-if-website-inbox-exists)
    * `CrispClient.website.checkInboxExists(websiteID, inboxID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var inboxID = "d42e8b3b-ea8f-4e79-a9f8-d0e467fc1c31";

      CrispClient.website.checkInboxExists(websiteID, inboxID);
      ```
      </details>

  * **Get Inbox**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-website-inbox)
    * `CrispClient.website.getInbox(websiteID, inboxID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var inboxID = "d42e8b3b-ea8f-4e79-a9f8-d0e467fc1c31";

      CrispClient.website.getInbox(websiteID, inboxID);
      ```
      </details>


* #### **Website Teams**
  * **List Teams**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-teams)
    * `CrispClient.website.listTeams(websiteID, pageNumber)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var pageNumber = 1;

      CrispClient.website.listTeams(websiteID, pageNumber);
      ```
      </details>

  * **Check If Team Exists**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#check-if-team-exists)
    * `CrispClient.website.checkTeamExists(websiteID, teamID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var teamID = "d09fbd42-e517-45a4-9776-ba8226e00ba8";

      CrispClient.website.checkTeamExists(websiteID, teamID);
      ```
      </details>

  * **Get Team**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-a-team)
    * `CrispClient.website.getTeam(websiteID, teamID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var teamID = "d09fbd42-e517-45a4-9776-ba8226e00ba8";

      CrispClient.website.getTeam(websiteID, teamID);
      ```
      </details>


* #### **Website Verify**
  * **Get Verify Settings**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-verify-settings)
    * `CrispClient.website.getVerifySettings(websiteID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

      CrispClient.website.getVerifySettings(websiteID);
      ```
      </details>

  * **Update Verify Settings**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#update-verify-settings)
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

  * **Get Verify Key**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-verify-key)
    * `CrispClient.website.getVerifyKey(websiteID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

      CrispClient.website.getVerifyKey(websiteID);
      ```
      </details>

  * **Roll Verify Key**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#roll-verify-key)
    * `CrispClient.website.rollVerifyKey(websiteID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

      CrispClient.website.rollVerifyKey(websiteID);
      ```
      </details>


* #### **Website Campaigns**
  * **List Campaign Templates**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-campaign-templates)
    * `CrispClient.website.listCampaignTemplates(websiteID, pageNumber)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var pageNumber = 1;

      CrispClient.website.listCampaignTemplates(websiteID, pageNumber);
      ```
      </details>

  * **Create A New Campaign Template**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#create-a-new-campaign-template)
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

  * **Check If Campaign Template Exists**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#check-if-campaign-template-exists)
    * `CrispClient.website.checkCampaignTemplateExists(websiteID, templateID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var templateID = "a4876300-4dae-47f7-8599-3bf9283f36c2";

      CrispClient.website.checkCampaignTemplateExists(websiteID, templateID);
      ```
      </details>

  * **Get A Campaign Template**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-a-campaign-template)
    * `CrispClient.website.getCampaignTemplate(websiteID, templateID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var templateID = "a4876300-4dae-47f7-8599-3bf9283f36c2";

      CrispClient.website.getCampaignTemplate(websiteID, templateID);
      ```
      </details>

  * **Save A Campaign Template**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#save-a-campaign-template)
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

  * **Update A Campaign Template**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#update-a-campaign-template)
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

  * **Remove A Campaign Template**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#remove-a-campaign-template)
    * `CrispClient.website.removeCampaignTemplate(websiteID, templateID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var templateID = "a4876300-4dae-47f7-8599-3bf9283f36c2";

      CrispClient.website.removeCampaignTemplate(websiteID, templateID);
      ```
      </details>


* #### **Website Connect**
  * **Get Connect Endpoints**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-website-connect-endpoints)
    * `CrispClient.website.getConnectEndpoints(websiteID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

      CrispClient.website.getConnectEndpoints(websiteID);
      ```
      </details>


### Plugin


* #### **Plugin Connect**
  * **⭐ Get Connect Account**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-connect-account)
    * `CrispClient.plugin.getConnectAccount()`
    * <details>
      <summary>See Example</summary>

      ```javascript
      CrispClient.plugin.getConnectAccount();
      ```
      </details>

  * **⭐ Check Connect Session Validity**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#check-connect-session-validity)
    * `CrispClient.plugin.checkConnectSessionValidity()`
    * <details>
      <summary>See Example</summary>

      ```javascript
      CrispClient.plugin.checkConnectSessionValidity();
      ```
      </details>

  * **⭐ List All Connect Websites**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-all-connect-websites)
    * `CrispClient.plugin.listAllConnectWebsites(pageNumber, filterConfigured, includePlan)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var pageNumber = 1;

      CrispClient.plugin.listAllConnectWebsites(pageNumber, filterConfigured, includePlan);
      ```
      </details>

  * **⭐ List Connect Websites Since**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-connect-websites-since)
    * `CrispClient.plugin.listConnectWebsitesSince(dateSince, filterConfigured, includePlan)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var dateSince = "2023-08-16T09:00:00Z";

      CrispClient.plugin.listConnectWebsitesSince(dateSince, filterConfigured, includePlan);
      ```
      </details>

  * **⭐ Get Connect Endpoints**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-connect-endpoints)
    * `CrispClient.plugin.getConnectEndpoints()`
    * <details>
      <summary>See Example</summary>

      ```javascript
      CrispClient.plugin.getConnectEndpoints();
      ```
      </details>


* #### **Plugin Subscription**
  * **Get Subscription Details**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-subscription-details)
    * `CrispClient.plugin.getSubscriptionDetails(websiteID, pluginID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var pluginID = "c64f3595-adee-425a-8d3a-89d47f7ed6bb";

      CrispClient.plugin.getSubscriptionDetails(websiteID, pluginID);
      ```
      </details>

  * **Get Subscription Settings**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-subscription-settings)
    * `CrispClient.plugin.getSubscriptionSettings(websiteID, pluginID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var pluginID = "c64f3595-adee-425a-8d3a-89d47f7ed6bb";

      CrispClient.plugin.getSubscriptionSettings(websiteID, pluginID);
      ```
      </details>

  * **Save Subscription Settings**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#save-subscription-settings)
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

  * **Update Subscription Settings**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#update-subscription-settings)
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

  * **Get Plugin Usage Bills**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-plugin-usage-bills)
    * `CrispClient.plugin.getPluginUsageBills(websiteID, pluginID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var pluginID = "c64f3595-adee-425a-8d3a-89d47f7ed6bb";

      CrispClient.plugin.getPluginUsageBills(websiteID, pluginID);
      ```
      </details>

  * **Report Plugin Usage To Bill**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#report-plugin-usage-to-bill)
    * `CrispClient.plugin.reportPluginUsageToBill(websiteID, pluginID, usage)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var pluginID = "c64f3595-adee-425a-8d3a-89d47f7ed6bb";

      var usage = {
        "name": "Paid messages sent",
        "units": 250,
        "price": 0.10
      };

      CrispClient.plugin.reportPluginUsageToBill(websiteID, pluginID, usage);
      ```
      </details>

  * **Get Plugin Attest Provenance**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-plugin-attest-provenance)
    * `CrispClient.plugin.getPluginAttestProvenance(websiteID, pluginID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
      var pluginID = "c64f3595-adee-425a-8d3a-89d47f7ed6bb";

      CrispClient.plugin.getPluginAttestProvenance(websiteID, pluginID);
      ```
      </details>

  * **Forward Plugin Payload To Channel**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#forward-plugin-payload-to-channel)
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

  * **Dispatch Plugin Event**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#dispatch-plugin-event)
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


### Plan


* #### **Plan Subscription**
  * **Get Plan Subscription For A Website**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-plan-subscription-for-a-website)
    * `CrispClient.plan.getPlanSubscriptionForWebsite(websiteID)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

      CrispClient.plan.getPlanSubscriptionForWebsite(websiteID);
      ```
      </details>


### Bucket


* #### **Bucket URL**
  * **Generate Bucket URL**: [Reference](https://docs.crisp.chat/references/rest-api/v1/#bucket-url)
    * `CrispClient.bucket.generateBucketURL(data)`
    * <details>
      <summary>See Example</summary>

      ```javascript
      CrispClient.bucket.generateBucketURL(data);
      ```
      </details>


## Realtime Events

You can bind to realtime events from Crisp, in order to get notified of incoming messages and updates in websites.

You won't receive any event if you don't explicitly subscribe to realtime events, as the library doesn't connect to the realtime backend automatically.

**There are two ways to receive realtime events:**

1. Using Web Hooks (**⭐ recommended**)
2. Using WebSockets with the RTM API

**Before you start with RTM events, please consider the following:**

* You won't receive any event if you don't explicitly subscribe to realtime events using `CrispClient.on()`, as the library doesn't connect to the realtime backend automatically. This method returns a `Promise` object.
* Whenever the list of websites that your authentication token is entitled to receive events for changes, you will need to call `CrispClient.rebindSocket()`. This method also returns a `Promise` object. _This only applies to WebSockets with the RTM API_.

### Receive realtime events

#### Receive events over Web Hooks

To start listening for events and bind a handler, check out the [events over Web Hooks example](https://github.com/crisp-im/node-crisp-api/blob/master/examples/events_webhooks.js).

You will need to adjust your code so that:

1. The RTM events mode is set to Web Hooks: `CrispClient.setRtmMode("webhooks")`
2. Your HTTP endpoint mounts a route listening for POST requests, and upon receiving requests:
    1. It verifies the requests with: `CrispClient.verifyHook(secret, body, timestamp, signature)`
    2. It receives the Web Hook with: `CrispClient.receiveHook(body)`

Plugin Web Hooks will need to be configured first for this to work. Check out our [Web Hooks Quickstart guide](https://docs.crisp.chat/guides/web-hooks/quickstart/) and our [Web Hooks Reference](https://docs.crisp.chat/references/web-hooks/v1/) to get started.

#### Receive events over WebSockets (RTM API)

To start listening for events and bind a handler, check out the [events over WebSockets example](https://github.com/crisp-im/node-crisp-api/blob/master/examples/events_websockets.js).

You will need to adjust your code so that:

1. The RTM events mode is set to WebSockets: `CrispClient.setRtmMode("websockets")`

### Available realtime events

Available events are listed below:

* #### **Session Events**: [Reference](https://docs.crisp.chat/references/rtm-api/v1/#session-events)
  * **Session Update Availability**:
    * `session:update_availability`
  * **Session Update Verify**:
    * `session:update_verify`
  * **Session Request Initiated**:
    * `session:request:initiated`
  * **Session Set Email**:
    * `session:set_email`
  * **Session Set Phone**:
    * `session:set_phone`
  * **Session Set Address**:
    * `session:set_address`
  * **Session Set Subject**:
    * `session:set_subject`
  * **Session Set Avatar**:
    * `session:set_avatar`
  * **Session Set Nickname**:
    * `session:set_nickname`
  * **Session Set Origin**:
    * `session:set_origin`
  * **Session Set Data**:
    * `session:set_data`
  * **Session Sync Pages**:
    * `session:sync:pages`
  * **Session Sync Events**:
    * `session:sync:events`
  * **Session Sync Capabilities**:
    * `session:sync:capabilities`
  * **Session Sync Geolocation**:
    * `session:sync:geolocation`
  * **Session Sync System**:
    * `session:sync:system`
  * **Session Sync Network**:
    * `session:sync:network`
  * **Session Sync Timezone**:
    * `session:sync:timezone`
  * **Session Sync Locales**:
    * `session:sync:locales`
  * **Session Sync Rating**:
    * `session:sync:rating`
  * **Session Sync Topic**:
    * `session:sync:topic`
  * **Session Set State**:
    * `session:set_state`
  * **Session Set Block**:
    * `session:set_block`
  * **Session Set Segments**:
    * `session:set_segments`
  * **Session Set Opened**:
    * `session:set_opened`
  * **Session Set Closed**:
    * `session:set_closed`
  * **Session Set Participants**:
    * `session:set_participants`
  * **Session Set Mentions**:
    * `session:set_mentions`
  * **Session Set Routing**:
    * `session:set_routing`
  * **Session Set Inbox**:
    * `session:set_inbox`
  * **Session Removed**:
    * `session:removed`
  * **Session Error**:
    * `session:error`

* #### **Message Events**: [Reference](https://docs.crisp.chat/references/rtm-api/v1/#message-events)
  * **Message Updated**:
    * `message:updated`
  * **Message Send**:
    * `message:send`
  * **Message Received**:
    * `message:received`
  * **Message Removed**:
    * `message:removed`
  * **Message Compose Send**:
    * `message:compose:send`
  * **Message Compose Receive**:
    * `message:compose:receive`
  * **Message Acknowledge Read Send**:
    * `message:acknowledge:read:send`
  * **Message Acknowledge Read Received**:
    * `message:acknowledge:read:received`
  * **Message Acknowledge Unread Send**:
    * `message:acknowledge:unread:send`
  * **Message Acknowledge Delivered**:
    * `message:acknowledge:delivered`
  * **Message Acknowledge Ignored**:
    * `message:acknowledge:ignored`
  * **Message Notify Unread Send**:
    * `message:notify:unread:send`
  * **Message Notify Unread Received**:
    * `message:notify:unread:received`

* #### **Spam Events**: [Reference](https://docs.crisp.chat/references/rtm-api/v1/#spam-events)
  * **Spam Message**:
    * `spam:message`
  * **Spam Decision**:
    * `spam:decision`

* #### **People Events**: [Reference](https://docs.crisp.chat/references/rtm-api/v1/#people-events)
  * **People Profile Created**:
    * `people:profile:created`
  * **People Profile Updated**:
    * `people:profile:updated`
  * **People Profile Removed**:
    * `people:profile:removed`
  * **People Bind Session**:
    * `people:bind:session`
  * **People Sync Profile**:
    * `people:sync:profile`
  * **People Import Progress**:
    * `people:import:progress`
  * **People Import Done**:
    * `people:import:done`

* #### **Campaign Events**: [Reference](https://docs.crisp.chat/references/rtm-api/v1/#campaign-events)
  * **Campaign Progress**:
    * `campaign:progress`
  * **Campaign Dispatched**:
    * `campaign:dispatched`
  * **Campaign Running**:
    * `campaign:running`

* #### **Browsing Events**: [Reference](https://docs.crisp.chat/references/rtm-api/v1/#browsing-events)
  * **Browsing Request Initiated**:
    * `browsing:request:initiated`
  * **Browsing Request Rejected**:
    * `browsing:request:rejected`

* #### **Call Events**: [Reference](https://docs.crisp.chat/references/rtm-api/v1/#call-events)
  * **Call Request Initiated**:
    * `call:request:initiated`
  * **Call Request Rejected**:
    * `call:request:rejected`

* #### **Identity Events**: [Reference](https://docs.crisp.chat/references/rtm-api/v1/#identity-events)
  * **Identity Verify Request**:
    * `identity:verify:request`

* #### **Widget Events**: [Reference](https://docs.crisp.chat/references/rtm-api/v1/#widget-events)
  * **Widget Action Processed**:
    * `widget:action:processed`

* #### **Status Events**: [Reference](https://docs.crisp.chat/references/rtm-api/v1/#status-events)
  * **Status Health Changed**:
    * `status:health:changed`

* #### **Website Events**: [Reference](https://docs.crisp.chat/references/rtm-api/v1/#website-events)
  * **Website Update Visitors Count**:
    * `website:update_visitors_count`
  * **Website Update Operators Availability**:
    * `website:update_operators_availability`
  * **Website Users Available**:
    * `website:users:available`

* #### **Bucket Events**: [Reference](https://docs.crisp.chat/references/rtm-api/v1/#bucket-events)
  * **Bucket URL Upload Generated**:
    * `bucket:url:upload:generated`
  * **Bucket URL Avatar Generated**:
    * `bucket:url:avatar:generated`
  * **Bucket URL Website Generated**:
    * `bucket:url:website:generated`
  * **Bucket URL Campaign Generated**:
    * `bucket:url:campaign:generated`
  * **Bucket URL Helpdesk Generated**:
    * `bucket:url:helpdesk:generated`
  * **Bucket URL Status Generated**:
    * `bucket:url:status:generated`
  * **Bucket URL Processing Generated**:
    * `bucket:url:processing:generated`

* #### **Media Events**: [Reference](https://docs.crisp.chat/references/rtm-api/v1/#media-events)
  * **Media Animation Listed**:
    * `media:animation:listed`

* #### **Email Events**: [Reference](https://docs.crisp.chat/references/rtm-api/v1/#email-events)
  * **Email Subscribe**:
    * `email:subscribe`
  * **Email Track View**:
    * `email:track:view`

* #### **Plugin Events**: [Reference](https://docs.crisp.chat/references/rtm-api/v1/#plugin-events)
  * **Plugin Channel**:
    * `plugin:channel`
  * **Plugin Event**:
    * `plugin:event`
  * **Plugin Subscription Updated**:
    * `plugin:subscription:updated`
  * **Plugin Settings Saved**:
    * `plugin:settings:saved`

* #### **Plan Events**: [Reference](https://docs.crisp.chat/references/rtm-api/v1/#plan-events)
  * **Plan Subscription Updated**:
    * `plan:subscription:updated`
