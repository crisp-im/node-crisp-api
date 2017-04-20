# Crisp API Node

## Installation

`npm install --save node-crisp-api`

* **📝 Implements**: [Crisp Platform - API ~ v1](https://docs.crisp.im/api/v1/) at reference revision: 07/17/2016
* **😘 Maintainer**: [@mywaystar](https://github.com/mywaystar)

## Authentication

To authenticate against the API, generate your session identifier and session key **once** using the following cURL request in your terminal (replace `YOUR_ACCOUNT_EMAIL` and `YOUR_ACCOUNT_PASSWORD`):

```bash
curl -H "Content-Type: application/json" -X POST -d '{"email":"YOUR_ACCOUNT_EMAIL","password":"YOUR_ACCOUNT_PASSWORD"}' https://api.crisp.im/v1/user/session/login
```

If authentication succeeds, you will get a JSON response containing your authentication keys: `identifier` and `key`. **Keep those 2 values private, and store them safely for long-term use**.

Then, add authentication parameters to your `client` instance right after you create it:

```js
var Crisp = require("node-crisp-api");
var CrispClient  = new Crisp();

// Authenticate to API (identifier, key)
// eg. CrispClient.authenticate("7c3ef21c-1e04-41ce-8c06-5605c346f73e", "cc29e1a5086e428fcc6a697d5837a66d82808e65c5cce006fbf2191ceea80a0a");
CrispClient.authenticate(identifier, key);

// Now, you can use authenticated API sections.
```

**🔴 Important: Be sure to login once, and re-use the same authentication keys (same `identifier` + `key`) in all your subsequent requests to the API. Do not generate new tokens from your code for every new request to the API (you will be heavily rate-limited; that will induce HTTP failures for some of your API calls).**

## API Overview


```js
var Crisp = require("node-crisp-api");
var CrispClient  = new Crisp();

CrispClient.authenticate(identifier, key);

CrispClient.userProfile.get().then(function(myProfile) {
  console.log("Hello" + myProfile.first_name);
});
```

## Create your own bot!


```js
var Crisp = require("node-crisp-api");
var CrispClient  = new Crisp();

CrispClient.authenticate(identifier, key);

CrispClient.on("message:send", function(message) {
  CrispClient.websiteConversations.sendMessage(
    message.website_id,
    message.session_id, {
      type : "text",
      content : "I'm a bot",
      from : "operator", //or user
      origin : "chat"
    }
  );
});
```

### Available resources & methods

*Where you see `params` it is a plain JavaScript object, e.g. `{ email: 'foo@example.com' }`*

  * on(event, callback)
  * userSession
    * `loginWithEmail(email, password)`
    * `recoverPassword(email)`
    * `logout()`
  * userAccount
    * `get()`
    * `create(params)`
  * userNotification
    * `get()`
    * `update(params)`
  * userProfile
    * `get()`
    * `update(params)`
  * userSchedule
    * `get()`
    * `update(params)`
  * userWebsites
    * `get()`
  * website
    * `create(params)`
    * `delete(websiteId)`
  * websiteSettings
    * `get(websiteId)`
    * `update(websiteId)`
  * websiteStats
    * `get(websiteId)`
  * websiteConversations
    * `getList(websiteId, page)`
    * `getOne(websiteId, sessionId)`
    * `getMeta(websiteId, sessionId)`
    * `getMessages(websiteId, sessionId, query)`
    * `create(websiteId)`
    * `initiateOne(websiteId, sessionId)`
    * `sendMessage(websiteId, sessionId, message)`
    * `setState(websiteId, sessionId, state)`
    * `updateMeta(websiteId, sessionId, update)`
    * `setBlock(websiteId, sessionId, blocked)`
    * `deleteOne(websiteId, sessionId)`
    * `acknowledgeMessages(websiteId, sessionId, fingerprints)`
  * websiteOperators
    * `getList(websiteId)`
    * `getOne(websiteId, operatorId)`
    * `deleteOne(websiteId, operatorId)`
    * `createOne(websiteId, parameters)`
    * `updateOne(websiteId, operatorId, parameters)`

### Available events

  * `message:send` Message from visitor
  * `message:received` Message from operator
  * `message:compose:send` Visitor is writing something
  * `message:acknowledge:read:send` Message is read from visitor
  * `message:acknowledge:read:received` Message is read from operator
  * `message:acknowledge:delivered` Message is delivered
  * `session:update_availability` Visitor is now online or offline
  * `session:request:initiated` You tried to initiate a message to someone
  * `session:set_email` Email is updated
  * `session:set_nickname` Nickname is updated
  * `session:set_avatar` Avatar is updated
  * `session:set_cover` Cover picture is updated
  * `session:set_block` User blocked updated
  * `session:set_state` Conversation state updated
  * `session:set_data` Conversation custom data updated
  * `session:set_tags` Conversation new tags
  * `session:sync:pages` Visitor visited some pages
  * `session:sync:geolocation` Visitor new geolocation
  * `session:sync:system` Visitor new system (Useragent, etc)
  * `session:sync:extended_informations` Visitor new extended informations
  * `session:sync:removed` Conversation removed
