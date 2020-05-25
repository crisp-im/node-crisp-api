# Crisp API Node

## Installation

`npm install --save node-crisp-api`

* **📝 Implements**: [Crisp Platform - API ~ v1](https://docs.crisp.chat/api/v1/) at reference revision: 01/30/2019
* **😘 Maintainer**: [@mywaystar](https://github.com/mywaystar)

## Authentication

To authenticate against the API, generate your session identifier and session key **once** using the [Crisp token generation utility](https://go.crisp.chat/account/token/). You'll get a token keypair made of 2 values.

**Keep your token keypair values private, and store them safely for long-term use.**

Then, add authentication parameters to your `client` instance right after you create it:

```js
var Crisp = require("node-crisp-api");
var CrispClient  = new Crisp();

// Authenticate to API (identifier, key)
// eg. CrispClient.authenticate("7c3ef21c-1e04-41ce-8c06-5605c346f73e", "cc29e1a5086e428fcc6a697d5837a66d82808e65c5cce006fbf2191ceea80a0a");
CrispClient.authenticate(identifier, key);

// Now, you can use authenticated API sections.
```

**🔴 Important: Make sure to generate your token once, and use the same token keys in all your subsequent requests to the API. Do not generate too many tokens, as we may invalidate your older tokens to make room for newer tokens.**

## API Overview


```js
var Crisp = require("node-crisp-api");
var CrispClient  = new Crisp();

CrispClient.authenticate(identifier, key);

CrispClient.userProfile.get().then(function(myProfile) {
  console.log("Hello " + myProfile.first_name);
});
```

## Create your own bot!


```js
var Crisp = require("node-crisp-api");
var CrispClient  = new Crisp();

CrispClient.authenticate(identifier, key);

// Notice: make sure to authenticate before listening for an event
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
  * **Compose Message:**: `CrispClient.websiteConversations.composeMessage(websiteId, sessionId, params)`
  * **Set Conversation State:**: `CrispClient.websiteConversations.setState(websiteId, sessionId, state)`
  * **Get Conversation Routing Assign**: `CrispClient.websiteConversations.getRouting(websiteId, sessionId)`
  * **Set Conversation Routing Assign:**: `CrispClient.websiteConversations.setRouting(websiteId, sessionId, assign)`
  * **Block Conversation:**: `CrispClient.websiteConversations.setBlock(websiteId, sessionId, blocked)`
  * **Delete Conversation:**:`CrispClient.websiteConversations.deleteOne(websiteId, sessionId)`
  * **Acknowledge Messages:**: `CrispClient.websiteConversations.acknowledgeMessages(websiteId, sessionId, from, origin, fingerprints)`

* **Website People** (These are your End Users).

The **PeopleID** argument can be an **email** or the **PeopleID**.

  *  **Find By Email**: `CrispClient.websitePeople.findByEmail(websiteId, email)`
  *  **Find With Search Text (Name, Email, Segments)**: `CrispClient.websitePeople.findWithSearchText(websiteId, searchText)`
  *  **Create A New Profile**: `CrispClient.websitePeople.createNewPeopleProfile(websiteId, params)`
  *  **Check  If Exists**: `CrispClient.websitePeople.checkPeopleProfileExists(websiteId, peopleId)`
  *  **Get People Profile**: `CrispClient.websitePeople.getPeopleProfile(websiteId, peopleId)`
  *  **List People Profiles**: `CrispClient.websitePeople.listPeopleProfiles(websiteId, peopleId, page)`
  *  **Remove A Profile**: `CrispClient.websitePeople.removePeopleProfile(websiteId, peopleId)`
  *  **Save A Profile**: `CrispClient.websitePeople.savePeopleProfile(websiteId, peopleId, params)`
  *  **Update A Profile**: `CrispClient.websitePeople.updatePeopleProfile(websiteId, peopleId, params)`
  *  **List Segments**: `CrispClient.websitePeople.listPeopleSegments(websiteId, peopleId, page)`
  *  **List Conversations**: `CrispClient.websitePeople.listPeopleConversations(websiteId, peopleId, page)`
  *  **Add Event**: `CrispClient.websitePeople.addPeopleEvent(websiteId, peopleId, params)`
  *  **List Events**: `CrispClient.websitePeople.listPeopleEvent(websiteId, peopleId, page)`
  *  **Get Data**: `CrispClient.websitePeople.getPeopleData(websiteId, peopleId)`
  *  **Update Data**: `CrispClient.websitePeople.updatePeopleData(websiteId, peopleId, params)`
  *  **Get Subscription Status**: `CrispClient.websitePeople.getPeopleSubscriptionStatus(websiteId, peopleId)`
  *  **Update Subscription Status**: `CrispClient.websitePeople.updatePeopleSubscriptionStatus(websiteId, peopleId, params)`

* **Website Base**
  * **Create A Website**: `CrispClient.website.create(params)`
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
  * **Session Update Verify**: `session:update_verify`
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
  * **Session Set Routing**: `session:set_routing`
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
  * **Message Notify Unread Send**: `message:notify:unread:send`
  * **Message Notify Unread Received**: `message:notify:unread:received`

* **People Events**
  * **People Profile Created**: `people:profile:created`
  * **People Profile Removed**: `people:profile:removed`
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

* **Call Events**
  * **Call Request Initiated**: `call:request:initiated`
  * **Call Request Rejected**: `call:request:rejected`

* **Status Events**

  * **Status Health Changed**: `status:health:changed`

* **Website Events**
  * **Website Update Visitors Count**: `website:update_visitors_count`
  * **Website Update Operators Availability**: `website:update_operators_availability`
  * **Website Users Available**: `website:users:available`

* **Bucket Events**
  * **Bucket URL Upload Generated**: `bucket:url:upload:generated`
  * **Bucket URL Avatar Generated**: `bucket:url:avatar:generated`
  * **Bucket URL Website Generated**: `bucket:url:website:generated`
  * **Bucket URL Campaign Generated**: `bucket:url:campaign:generated`
  * **Bucket URL Helpdesk Generated**: `bucket:url:helpdesk:generated`
  * **Bucket URL Status Generated**: `bucket:url:status:generated`
  * **Bucket URL Processing Generated**: `bucket:url:processing:generated`

* **Media Events**
  * **Media Animation Listed**: `media:animation:listed`

* **Email Events**
  * **Email Subscribe**: `email:subscribe`
  * **Email Track View**: `email:track:view`

* **Plugin Events**
  * **Plugin Channel**: `plugin:channel`
  * **Plugin Event**: `plugin:event`
  * **Plugin Settings Saved**: `plugin:settings:saved`
