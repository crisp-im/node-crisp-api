# node-crisp-api

The Crisp API NodeJS wrapper. Authenticate, send messages, fetch conversations, access your agent accounts from your JavaScript code.

Copyright 2021 Crisp IM SARL. See LICENSE for copying information.

* **📝 Implements**: [REST API Reference (V1)](https://docs.crisp.chat/references/rest-api/v1/) at revision: 01/30/2019
* **😘 Maintainers**: [@baptistejamin](https://github.com/baptistejamin), [@eliottvincent](https://github.com/eliottvincent), [@valeriansaliou](https://github.com/valeriansaliou)

## Installation

`npm install --save node-crisp-api`

## Authentication

To authenticate against the API, obtain your authentication token keypair by following the [REST API Authentication](https://docs.crisp.chat/guides/rest-api/authentication/) guide. You'll get a token keypair made of 2 values.

**Keep your token keypair values private, and store them safely for long-term use.**

Then, add authentication parameters to your `client` instance right after you create it:

```javascript
var Crisp = require("node-crisp-api");
var CrispClient = new Crisp();

// Authenticate to API with your plugin token (identifier, key)
// eg. CrispClient.authenticate("7c3ef21c-1e04-41ce-8c06-5605c346f73e", "cc29e1a5086e428fcc6a697d5837a66d82808e65c5cce006fbf2191ceea80a0a");
CrispClient.setTier("plugin");
CrispClient.authenticate(identifier, key);

// Now, you can use authenticated API sections.
```

## Overview

You may follow the [REST API Quickstart](https://docs.crisp.chat/guides/rest-api/quickstart/) guide, which will get you running with the REST API in minutes.

```javascript
var Crisp = require("node-crisp-api");
var CrispClient = new Crisp();

CrispClient.setTier("plugin");
CrispClient.authenticate(identifier, key);

CrispClient.websiteConversation.getList().then(function(conversations) {
  console.log("Latest conversations:", conversations);
});
```

## Examples

### Create your own bot!

```javascript
var Crisp = require("node-crisp-api");
var CrispClient = new Crisp();

CrispClient.setTier("plugin");
CrispClient.authenticate(identifier, key);

// Notice: make sure to authenticate before listening for an event
CrispClient.on("message:send", function(message) {
  CrispClient.websiteConversation.sendMessage(
    message.website_id, message.session_id,

    {
      type : "text",
      content : "I'm a bot",
      from : "operator", // or user
      origin : "chat"
    }
  );
});
```

## Resource Methods

*Where you see `params` it is a plain JavaScript object, e.g. `{ email: 'foo@example.com' }`*

### Website

* **Website Conversations**
  * **Get Conversations List**: `CrispClient.websiteConversation.getList(websiteId, page)`
  * **Find Conversations With Search**: `CrispClient.websiteConversation.findWithSearch(websiteId, page, { searchQuery, searchType, searchOperator, includeEmpty, filterUnread, filterResolved, filterNotResolved, filterMention, filterAssigned, filterUnassigned, filterDateStart, filterDateEnd, orderDateCreated, orderDateUpdated })`

* **Website Conversation**
  * **Get A Conversation**: `CrispClient.websiteConversation.getOne(websiteId, sessionId)`
  * **Get Conversation Metadata**: `CrispClient.websiteConversation.getMeta(websiteId, sessionId)`
  * **Update Conversation Metadata**:`CrispClient.websiteConversation.updateMeta(websiteId, sessionId, params)`
  * **Get Conversation Messages**: `CrispClient.websiteConversation.getMessages(websiteId, sessionId, timestampBefore)`
  * **Create a Conversation**: `CrispClient.websiteConversation.create(websiteId)`
  * **Initiate a Conversation**: `CrispClient.websiteConversation.initiateOne(websiteId, sessionId)`
  * **Send a Conversation**: `CrispClient.websiteConversation.sendMessage(websiteId, sessionId, message)`
  * **Compose Message:**: `CrispClient.websiteConversation.composeMessage(websiteId, sessionId, params)`
  * **Set Conversation State:**: `CrispClient.websiteConversation.setState(websiteId, sessionId, state)`
  * **Get Conversation Routing Assign**: `CrispClient.websiteConversation.getRouting(websiteId, sessionId)`
  * **Set Conversation Routing Assign:**: `CrispClient.websiteConversation.setRouting(websiteId, sessionId, assign)`
  * **Block Conversation:**: `CrispClient.websiteConversation.setBlock(websiteId, sessionId, blocked)`
  * **Delete Conversation:**:`CrispClient.websiteConversation.deleteOne(websiteId, sessionId)`
  * **Mark messages as read:**: `CrispClient.websiteConversation.readMessages(websiteId, sessionId, from, origin, fingerprints)`
  * **Mark messages as delivered:**: `CrispClient.websiteConversation.deliveredMessages(websiteId, sessionId, from, origin, fingerprints)`

* **Website People** _(these are your end-users)_
  *  **Find By Email**: `CrispClient.websitePeople.findByEmail(websiteId, email)`
  *  **Find With Search Text (Name, Email, Segments)**: `CrispClient.websitePeople.findWithSearchText(websiteId, searchText)`
  *  **Create A New Profile**: `CrispClient.websitePeople.createNewPeopleProfile(websiteId, params)`
  *  **Check If Exists**: `CrispClient.websitePeople.checkPeopleProfileExists(websiteId, peopleId)`
  *  **Get People Profile**: `CrispClient.websitePeople.getPeopleProfile(websiteId, peopleId)`
  *  **List People Profiles**: `CrispClient.websitePeople.listPeopleProfiles(websiteId, page)`
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

_👉 Notice: The `peopleId` argument can be an email or the `peopleId`._

* **Website Base**
  * **Check If Website Exists**: `CrispClient.websiteBase.checkWebsiteExists(domain)`
  * **Create Website**: `CrispClient.websiteBase.createWebsite(websiteData)`
  * **Get A Website**: `CrispClient.websiteBase.getWebsite(websiteID)`
  * **Delete A Website**: `CrispClient.websiteBase.deleteWebsite(websiteID, verify)`

* **Website Settings**
  * **Get Website Settings**: `CrispClient.websiteSettings.getWebsiteSettings(websiteId)`
  * **Update Website Settings**: `CrispClient.websiteSettings.updateWebsiteSettings(params)`

* **Website Operator**
  * **List Website Operators**: `CrispClient.websiteOperator.listWebsiteOperators(websiteId)`
  * **List Last Active Website Operators**: `CrispClient.websiteOperator.listLastActiveWebsiteOperators(websiteID)`
  * **Flush Last Active Website Operators**: `CrispClient.websiteOperator.flushLastActiveWebsiteOperators(websiteID)`
  * **Send Email To Website Operators**: `CrispClient.websiteOperator.sendEmailToWebsiteOperators(websiteID, emailData)`
  * **Get A Website Operator**: `CrispClient.websiteOperator.getWebsiteOperator(websiteId, userId)`
  * **Invite A Website Operator**: `CrispClient.websiteOperator.inviteWebsiteOperator(websiteID, email, role, verify)`
  * **Change Operator Membership**: `CrispClient.websiteOperator.changeOperatorMembership(websiteID, userID, role, title)`
  * **Unlink Operator From Website**: `CrispClient.websiteOperator.unlinkOperatorFromWebsite(websiteID, userID)`

* **Website Visitors**
  * `TODO`

* **Website Availability**
  * `TODO`

* **Website Analytics**
  * `TODO`

* **Website Batch**
  * `TODO`

* **Website Verify**
  * `TODO`

* **Website Campaigns**
  * `TODO`

* **Website Campaign**
  * `TODO`

### Plugin

* **Plugin Connect**
  * **Get Connect Account**: `CrispClient.pluginConnect.getConnectAccount()`
  * **Check Connect Session Validity**: `CrispClient.pluginConnect.checkConnectSessionValidity()`
  * **List All Connect Websites**: `CrispClient.pluginConnect.listAllConnectWebsites(pageNumber, filterConfigured, dateSince)`

* **Plugin Subscription**
  * **List All Active Subscriptions**: `CrispClient.pluginSubscription.listAllActiveSubscriptions()`
  * **List Subscriptions For A Website**: `CrispClient.pluginSubscription.listSubscriptionsForWebsite(websiteId)`
  * **Get Subscription Details**: `CrispClient.pluginSubscription.getSubscriptionDetails(websiteId, pluginId)`
  * **Subscribe Website To Plugin**: `CrispClient.pluginSubscription.subscribeWebsiteToPlugin(websiteId, pluginId)`
  * **Unsubscribe Plugin From Website**: `CrispClient.pluginSubscription.unsubscribePluginFromWebsite(websiteId, pluginId)`
  * **Get Subscription Settings**: `CrispClient.pluginSubscription.getSubscriptionSettings(websiteId, pluginId)`
  * **Save Subscription Settings**: `CrispClient.pluginSubscription.saveSubscriptionSettings(websiteId, pluginId, settings)`
  * **Update Subscription Settings**: `CrispClient.pluginSubscription.updateSubscriptionSettings(websiteId, pluginId, settings)`
  * **Forward Plugin Payload To Channel**: `CrispClient.pluginSubscription.forwardPluginPayloadToChannel(websiteID, pluginID, payload)`
  * **Dispatch Plugin Event**: `CrispClient.pluginSubscription.dispatchPluginEvent(websiteID, pluginID, payload)`

### Media

* **MediaAnimation**
  * **List Animation Medias**: `CrispClient.mediaAnimation.listAnimationMedias(pageNumber, listId, searchQuery)`

### Bucket

* **BucketURL**
  * **Generate Bucket URL**: `CrispClient.bucketUrl.generateBucketURL(data)`

## Realtime Events

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
