# Crisp API Node

## Installation

`npm install --save node-crisp-api`

* **📝 Implements**: [Crisp Platform - API ~ v1](https://docs.crisp.chat/api/v1/) at reference revision: 07/17/2016
* **😘 Maintainer**: [@mywaystar](https://github.com/mywaystar)

## Authentication

To authenticate against the API, generate your session identifier and session key **once** using the following cURL request in your terminal (replace `YOUR_ACCOUNT_EMAIL` and `YOUR_ACCOUNT_PASSWORD`):

```bash
curl -H "Content-Type: application/json" -X POST -d '{"email":"YOUR_ACCOUNT_EMAIL","password":"YOUR_ACCOUNT_PASSWORD"}' https://api.crisp.chat/v1/user/session/login
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
  * websitePeople
    * `createNewPeopleProfile(websiteId)`
    * `checkPeopleProfileExists(websiteId, peopleId)`
    * `getPeopleProfile(websiteId, peopleId)`
    * `listPeopleProfiles(websiteId, peopleId, page)`
    * `removePeopleProfile(websiteId, peopleId)`
    * `savePeopleProfile(websiteId, peopleId, data)`
    * `updatePeopleProfile(websiteId, peopleId, data)`
    * `listPeopleSegments(websiteId, peopleId, page)`
    * `listPeopleEvent(websiteId, peopleId, page)`
    * `getPeopleData(websiteId, peopleId)`
    * `updatePeopleData(websiteId, peopleId, data)`
  * websiteOperators
    * `getList(websiteId)`
    * `getOne(websiteId, operatorId)`
    * `deleteOne(websiteId, operatorId)`
    * `createOne(websiteId, parameters)`
    * `updateOne(websiteId, operatorId, parameters)`

## Available events

Available events are listed below:

* **Session Events**
  * **Session Update Availability**: `session:update_availability`
  * **Session Request Initiated**: `session:request:initiated`
  * **Session Set Email**: `session:set_email`
  * **Session Set Phone**: `session:set_phone`
  * **Session Set Address**: `session:set_address`
  * **Session Set Avatar**: `session:set_avatar`
  * **Session Set Nickname**: `session:set_nickname`
  * **Session Set Data**: `session:set_data`
  * **Session Sync Pages**: `session:sync:pages`
  * **Session Sync Events**: `session:sync:events`
  * **Session Sync Capabilities**: `session:sync:capabilities`
  * **Session Sync Geolocation**: `session:sync:geolocation`
  * **Session Sync System**: `session:sync:system`
  * **Session Sync Network**: `session:sync:network`
  * **Session Sync Timezone**: `session:sync:timezone`
  * **Session Sync Locales**: `session:sync:locales`
  * **Session Set State**: `session:set_state`
  * **Session Set Block**: `session:set_block`
  * **Session Set Segments**: `session:set_segments`
  * **Session Set Opened**: `session:set_opened`
  * **Session Set Closed**: `session:set_closed`
  * **Session Set Mention**: `session:set_mentions`
  * **Session Removed**: `session:removed`

* **Message Events**
  * **Message Updated**: `message:updated`
  * **Message Send**: `message:send`
  * **Message Received**: `message:received`
  * **Message Compose Send**: `message:compose:send`
  * **Message Compose Receive**: `message:compose:receive`
  * **Message Acknowledge Read Send**: `message:acknowledge:read:send`
  * **Message Acknowledge Read Received**: `message:acknowledge:read:received`
  * **Message Acknowledge Delivered**: `message:acknowledge:delivered`

* **People Events**
  * **People Bind Session**: `people:bind:session`
  * **People Sync Profile**: `people:sync:profile`
  * **People Import Progress**: `people:import:progress`
  * **People Import Done**: `people:import:done`

* **Campaign Events**
  * **Campaign Progress**: `campaign:progress`
  * **Campaign Dispatched**: `campaign:dispatched`
  * **Campaign Running**: `campaign:running`

* **Browsing Events**
  * **Browsing Request Initiated**: `browsing:request:initiated`
  * **Browsing Request Rejected**: `browsing:request:rejected`
  * **Browsing Action Started**: `browsing:action:started`
  * **Browsing Action Stopped**: `browsing:action:stopped`
  * **Browsing Stream Mirror**: `browsing:stream:mirror`
  * **Browsing Stream Mouse**: `browsing:stream:mouse`
  * **Browsing Stream Tab**: `browsing:stream:tab`
  * **Browsing Stream Scroll**: `browsing:stream:scroll`
  * **Browsing Debug Started**: `browsing:debug:started`
  * **Browsing Debug Stopped**: `browsing:debug:stopped`
  * **Browsing Debug Executed**: `browsing:debug:executed`
  * **Browsing Debug Stream**: `browsing:debug:stream`
  * **Browsing Assist Started**: `browsing:assist:started`
  * **Browsing Assist Stopped**: `browsing:assist:stopped`

* **Call Events**
  * **Call Request Initiated**: `call:request:initiated`
  * **Call Request Rejected**: `call:request:rejected`
  * **Call Action Started**: `call:action:started`
  * **Call Action Stopped**: `call:action:stopped`
  * **Call Signaling SDP**: `call:signaling:sdp`
  * **Call Signaling Candidate**: `call:signaling:candidate`

* **Website Events**
  * **Website Update Visitors Count**: `website:update_visitors_count`
  * **Website Update Operators Availability**: `website:update_operators_availability`
  * **Website Users Available**: `website:users:available`

* **Bucket Events**
  * **Bucket URL Upload Generated**: `bucket:url:upload:generated`
  * **Bucket URL Avatar Generated**: `bucket:url:avatar:generated`
  * **Bucket URL Campaign Generated**: `bucket:url:campaign:generated`
  * **Bucket URL Processing Generated**: `bucket:url:processing:generated`

* **Media Events**
  * **Media Animation Listed**: `media:animation:listed`

* **Billing Events**
  * **Billing Link Redirect**: `billing:link:redirect`

