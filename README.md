# Crisp API Node

[![Chat on Crisp](https://storage.crisp.im/plugins/images/936925df-f37b-4ba8-bab0-70cd2edcb0be/badge.svg)](https://go.crisp.im/chat/embed/?website_id=-JzqEmX56venQuQw4YV8)

## Installation

`npm install --save node-crisp-api`

* **📝 Implements**: [Crisp Platform - API ~ v1](https://docs.crisp.im/api/v1/) at reference revision: 07/17/2016
* **😘 Maintainer**: [@mywaystar](https://github.com/mywaystar)


## API Overview


```js
var Crisp = require("node-crisp-api");
var CrispClient  = new Crisp();
```

To use Crisp, first, you have to login

```js
CrispClient.userSession.loginWithEmail(
  "youraccount@gmail.com",
  "your_password"
)
.then(function() {
  //You are now logged
});
```

When you are logged you can then use the Crisp API

```js
CrispClient.userProfile.get().then(function(myProfile) {
  console.log("Hello" + myProfile.first_name);
});
```

## Create your own bot!


```js
var Crisp = require("node-crisp-api");
var CrispClient  = new Crisp();
```

To use Crisp, first, you have to login

```js
CrispClient.userSession.loginWithEmail(
  "youraccount@gmail.com",
  "your_password"
)
.then(function() {
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
