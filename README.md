# Crisp API Node

## Installation

`npm install --save node-crisp-api`

* **📝 Implements**: [Crisp Platform - API ~ v1](https://docs.crisp.chat/api/v1/) at reference revision: 09/05/2017
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


### User

From the API side, Users are Crisp Users, not your end users

* **User Account**
  * **Get User Account**: `CrispClient.userAccount.get()`
  * **Create User Account**: `CrispClient.userAccount.create(params)`
* **User Session**
  * **Create A New Sessiont**: `CrispClient.userSession.loginWithEmail(email, password)`
  * **Recover the Password**: `CrispClient.userSession.recoverPassword(email)`
  * **Logout**: `CrispClient.userSession.logout()`
* **User Notifications**
  * **Get User Notifications**: `CrispClient.userNotification.get()`
  * **Update User Notifications**: `CrispClient.userNotification.update(params)`
* **User Profile**
  * **Get User Profile**: `CrispClient.userProfile.get()`
  * **Update User Profile**: `CrispClient.userProfile.update(params)`
* **User Websites**
  * **Get**: `CrispClient.userWebsites.get()`

### Website

* **Website Conversations**
  * **Get Conversation List**: `CrispClient.websiteConversations.getList(websiteId, page)`
  * **Get A Conversation**: `CrispClient.websiteConversations.getOne(websiteId, sessionId)`
  * **Get Conversation Metadata**: `CrispClient.websiteConversations.getMeta(websiteId, sessionId)`
  * **Update Conversation Metadata**:`CrispClient.websiteConversations.updateMeta(websiteId, sessionId, params)`
  * **Get Conversation Messages**: `CrispClient.websiteConversations.getMessages(websiteId, sessionId, query)`
  * **Create a Conversation**: `CrispClient.websiteConversations.create(websiteId)`
  * **Initiate a Conversation**: `CrispClient.websiteConversations.initiateOne(websiteId, sessionId)`
  * **Send a Conversation**: `CrispClient.websiteConversations.sendMessage(websiteId, sessionId, message)`
  * **Set Conversation State:**: `CrispClient.websiteConversations.setState(websiteId, sessionId, state)`
  * **Block Conversation:**: `CrispClient.websiteConversations.setBlock(websiteId, sessionId, blocked)`
  * **Delete Conversation:**:`CrispClient.websiteConversations.deleteOne(websiteId, sessionId)`
  * **Acknowledge Messages:**: `CrispClient.websiteConversations.acknowledgeMessages(websiteId, sessionId, fingerprints)`

* **Website People** (These are your End Users)
  *  **Find By Email**: `CrispClient.websitePeople.findByEmail(websiteId, email)`
  *  **Check By Segments**: `CrispClient.websitePeople.findBySegments(websiteId, segments)`
  *  **Create A New Profile**: `CrispClient.websitePeople.createNewPeopleProfile(websiteId, params)`
  *  **Check  If Exists**: `CrispClient.websitePeople.checkPeopleProfileExists(websiteId, peopleId)`
  *  **Get People Profile**: `CrispClient.websitePeople.getPeopleProfile(websiteId, peopleId)`
  *  **List People Profiles**: `CrispClient.websitePeople.listPeopleProfiles(websiteId, peopleId, page)`
  *  **Remove A Profile**: `CrispClient.websitePeople.removePeopleProfile(websiteId, peopleId)`
  *  **Save A Profile**: `CrispClient.websitePeople.savePeopleProfile(websiteId, peopleId, params)`
  *  **Update A Profile**: `CrispClient.websitePeople.updatePeopleProfile(websiteId, peopleId, params)`
  *  **List Segments**: `CrispClient.websitePeople.listPeopleSegments(websiteId, peopleId, page)`
  *  **Add Event**: `CrispClient.websitePeople.addPeopleEvent(websiteId, peopleId, params)`
  *  **List Events**: `CrispClient.websitePeople.listPeopleEvent(websiteId, peopleId, page)`
  *  **Get Data**: `CrispClient.websitePeople.getPeopleData(websiteId, peopleId)`
  *  **Update Data**: `CrispClient.websitePeople.updatePeopleData(websiteId, peopleId, params)`
  
* **Website Base**
  * **Create A Website**: `CrispClient.website.create(params)`
  * **Create User Account**: `CrispClient.website.delete(websiteId)`
* **Website Settings**
  * **Get Website Settings**: `CrispClient.websiteSettings.get(websiteId)`
  * **Update Website Settings**: `CrispClient.websiteSettings.get(params)`
* **Website Operators**
  * **Get All Operators**: `CrispClient.websiteOperators.getList(websiteId)`
  * **Get One Operators**: `CrispClient.websiteOperators.getOne(websiteId, operatorId)`
  * **Delete One Operators**: `CrispClient.websiteOperators.deleteOne(websiteId, operatorId)`
  * **Create An Operator**: `CrispClient.websiteOperators.createOne(websiteId, parameters)`
  * **Update An Operator**: `CrispClient.websiteOperators.updateOne(websiteId, operatorId, parameters)`

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

