# Crisp API Node

## Installation

`npm install --save node-crisp-api`


## API Overview


```js
var Crisp = require("node-crisp-api");
var ClispClient  = new Crisp();
```

To use Crisp, first, you have to login

```js
ClispClient.userSession.loginWithEmail(
  "youraccount@gmail.com",
  "your_password"
)
.then(function() {
  //You are now logged
});
```

When you are logged you can then use the Crisp API

```js
ClispClient.userProfile.get().then(function(myProfile) {
  console.log("Hello" + myProfile.first_name);
});
```

## Create your own bot!


```js
var Crisp = require("node-crisp-api");
var ClispClient  = new Crisp();
```

To use Crisp, first, you have to login

```js
ClispClient.userSession.loginWithEmail(
  "youraccount@gmail.com",
  "your_password"
)
.then(function() {
  ClispClient.on("message:send", function(message) {
    ClispClient.websiteConversations.sendTextMessage(
      message.website_id,
      message.session_id,
      "I'm a bot"
    )
  });
});
```

When you are logged you can then use the Crisp API

```js
ClispClient.userProfile.get().then(function(myProfile) {
  console.log("Hello" + myProfile.first_name);
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
  * websiteConversations
    * `getList(websiteId, page)`
    * `getOne(websiteId, sessionId)`
    * `sendTextMessage(websiteId, sessionId, text)`
    * `setState(websiteId, sessionId, state)`
    * `setEmail(websiteId, sessionId, email)`
    * `setEmail(websiteId, sessionId, nickname)`
    * `setBlock(websiteId, sessionId, blocked)`
    * `deleteOne(websiteId, sessionId)`
    * `acknowledgeMessages(websiteId, sessionId, fingerprints)`
  * websiteOperators
    * `getList(websiteId)`
    * `getOne(websiteId, operatorId)`
    * `deleteOne(websiteId, operatorId)`
    * `createOne(websiteId, parameters)`

### Available events

  * `message:send` Message from visitor
  * `message:received` Message from operator
  * `message:compose:send` Visitor is writing something
  * `message:acknowledge:read:send` Message is read from visitor
  * `message:acknowledge:read:received` Message is read from operator
  * `message:acknowledge:delivered` Message is delivered
  * `session:update_availability` Visitor is now online or offline
  * `session:request:initiatedy` You tried to initiate a message to someone
  * `session:set_email` Email is updated
  * `session:set_nickname` Nickname is updated
  * `session:set_avatar` Avatar is updated
  * `session:set_cover` Cover picture is updated
  * `session:set_block` User blocked updated
  * `session:set_state` Conversation state updated
  * `session:set_tags` Conversation new tags
  * `session:sync:pages` Visitor visited some pages
  * `session:sync:geolocation` Visitor new geolocation
  * `session:sync:system` Visitor new system (Useragent, etc)
  * `session:sync:extended_informations` Visitor new extended informations
  * `session:sync:removed` Conversation removed
