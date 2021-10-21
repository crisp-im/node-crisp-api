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
CrispClient.authenticateTier("plugin", identifier, key);

// Now, you can use authenticated API sections.
```

## Overview

You may follow the [REST API Quickstart](https://docs.crisp.chat/guides/rest-api/quickstart/) guide, which will get you running with the REST API in minutes.

```javascript
var Crisp = require("node-crisp-api");
var CrispClient = new Crisp();

CrispClient.authenticateTier("plugin", identifier, key);

CrispClient.websiteConversation.getList().then(function(conversations) {
  console.log("Latest conversations:", conversations);
});
```

## Examples

### Create your own bot!

```javascript
var Crisp = require("node-crisp-api");
var CrispClient = new Crisp();

CrispClient.authenticateTier("plugin", identifier, key);

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

All the available Crisp API resources are fully implemented. **Programmatic methods names are named after their label name in the [REST API Reference](https://docs.crisp.chat/references/rest-api/v1/)**.

Thus, it is straightforward to look for them in the library while reading the [REST API Reference](https://docs.crisp.chat/references/rest-api/v1/).

**⚠️ Note that, depending on your authentication token tier, which is either `user` or `plugin`, you may not be allowed to use all methods from the library. When in doubt, refer to the library method descriptions below. Most likely, you are using a `plugin` token.**

### Website

* **Website Conversations**
  * **Get Conversations List** [`user`, `plugin`]: `CrispClient.websiteConversation.getList(websiteId, page)`
  * **Find Conversations With Search** [`user`, `plugin`]: `CrispClient.websiteConversation.findWithSearch(websiteId, page, { searchQuery, searchType, searchOperator, includeEmpty, filterUnread, filterResolved, filterNotResolved, filterMention, filterAssigned, filterUnassigned, filterDateStart, filterDateEnd, orderDateCreated, orderDateUpdated })`

* **Website Conversation**
  * **Get A Conversation** [`user`, `plugin`]: `CrispClient.websiteConversation.getOne(websiteId, sessionId)`
  * **Get Conversation Metadata** [`user`, `plugin`]: `CrispClient.websiteConversation.getMeta(websiteId, sessionId)`
  * **Update Conversation Metadata**:`CrispClient.websiteConversation.updateMeta(websiteId, sessionId, params)`
  * **Get Conversation Messages** [`user`, `plugin`]: `CrispClient.websiteConversation.getMessages(websiteId, sessionId, timestampBefore)`
  * **Create a Conversation** [`user`, `plugin`]: `CrispClient.websiteConversation.create(websiteId)`
  * **Initiate a Conversation** [`user`, `plugin`]: `CrispClient.websiteConversation.initiateOne(websiteId, sessionId)`
  * **Send a Conversation** [`user`, `plugin`]: `CrispClient.websiteConversation.sendMessage(websiteId, sessionId, message)`
  * **Compose Message:** [`user`, `plugin`]: `CrispClient.websiteConversation.composeMessage(websiteId, sessionId, params)`
  * **Set Conversation State:** [`user`, `plugin`]: `CrispClient.websiteConversation.setState(websiteId, sessionId, state)`
  * **Get Conversation Routing Assign** [`user`, `plugin`]: `CrispClient.websiteConversation.getRouting(websiteId, sessionId)`
  * **Set Conversation Routing Assign:** [`user`, `plugin`]: `CrispClient.websiteConversation.setRouting(websiteId, sessionId, assign)`
  * **Block Conversation:** [`user`, `plugin`]: `CrispClient.websiteConversation.setBlock(websiteId, sessionId, blocked)`
  * **Delete Conversation:**:`CrispClient.websiteConversation.deleteOne(websiteId, sessionId)`
  * **Mark messages as read:** [`user`, `plugin`]: `CrispClient.websiteConversation.readMessages(websiteId, sessionId, from, origin, fingerprints)`
  * **Mark messages as delivered:** [`user`, `plugin`]: `CrispClient.websiteConversation.deliveredMessages(websiteId, sessionId, from, origin, fingerprints)`

* **Website People** _(these are your end-users)_
  *  **Find By Email** [`user`, `plugin`]: `CrispClient.websitePeople.findByEmail(websiteId, email)`
  *  **Find With Search Text (Name, Email, Segments)** [`user`, `plugin`]: `CrispClient.websitePeople.findWithSearchText(websiteId, searchText)`
  *  **Create A New Profile** [`user`, `plugin`]: `CrispClient.websitePeople.createNewPeopleProfile(websiteId, params)`
  *  **Check If Exists** [`user`, `plugin`]: `CrispClient.websitePeople.checkPeopleProfileExists(websiteId, peopleId)`
  *  **Get People Profile** [`user`, `plugin`]: `CrispClient.websitePeople.getPeopleProfile(websiteId, peopleId)`
  *  **List People Profiles** [`user`, `plugin`]: `CrispClient.websitePeople.listPeopleProfiles(websiteId, page)`
  *  **Remove A Profile** [`user`, `plugin`]: `CrispClient.websitePeople.removePeopleProfile(websiteId, peopleId)`
  *  **Save A Profile** [`user`, `plugin`]: `CrispClient.websitePeople.savePeopleProfile(websiteId, peopleId, params)`
  *  **Update A Profile** [`user`, `plugin`]: `CrispClient.websitePeople.updatePeopleProfile(websiteId, peopleId, params)`
  *  **List Segments** [`user`, `plugin`]: `CrispClient.websitePeople.listPeopleSegments(websiteId, peopleId, page)`
  *  **List Conversations** [`user`, `plugin`]: `CrispClient.websitePeople.listPeopleConversations(websiteId, peopleId, page)`
  *  **Add Event** [`user`, `plugin`]: `CrispClient.websitePeople.addPeopleEvent(websiteId, peopleId, params)`
  *  **List Events** [`user`, `plugin`]: `CrispClient.websitePeople.listPeopleEvent(websiteId, peopleId, page)`
  *  **Get Data** [`user`, `plugin`]: `CrispClient.websitePeople.getPeopleData(websiteId, peopleId)`
  *  **Update Data** [`user`, `plugin`]: `CrispClient.websitePeople.updatePeopleData(websiteId, peopleId, params)`
  *  **Get Subscription Status** [`user`, `plugin`]: `CrispClient.websitePeople.getPeopleSubscriptionStatus(websiteId, peopleId)`
  *  **Update Subscription Status** [`user`, `plugin`]: `CrispClient.websitePeople.updatePeopleSubscriptionStatus(websiteId, peopleId, params)`

_👉 Notice: The `peopleId` argument can be an email or the `peopleId`._

* **Website Base**
  * **Check If Website Exists** [`user`, `plugin`]: `CrispClient.websiteBase.checkWebsiteExists(domain)`
  * **Create Website** [`user`]: `CrispClient.websiteBase.createWebsite(websiteData)`
  * **Get A Website** [`user`, `plugin`]: `CrispClient.websiteBase.getWebsite(websiteID)`
  * **Delete A Website** [`user`]: `CrispClient.websiteBase.deleteWebsite(websiteID, verify)`

* **Website Settings**
  * **Get Website Settings** [`user`, `plugin`]: `CrispClient.websiteSettings.getWebsiteSettings(websiteId)`
  * **Update Website Settings** [`user`, `plugin`]: `CrispClient.websiteSettings.updateWebsiteSettings(websiteId, settings)`

* **Website Operator**
  * **List Website Operators** [`user`, `plugin`]: `CrispClient.websiteOperator.listWebsiteOperators(websiteId)`
  * **List Last Active Website Operators** [`user`, `plugin`]: `CrispClient.websiteOperator.listLastActiveWebsiteOperators(websiteID)`
  * **Flush Last Active Website Operators** [`user`]: `CrispClient.websiteOperator.flushLastActiveWebsiteOperators(websiteID)`
  * **Send Email To Website Operators** [`user`, `plugin`]: `CrispClient.websiteOperator.sendEmailToWebsiteOperators(websiteID, emailData)`
  * **Get A Website Operator** [`user`, `plugin`]: `CrispClient.websiteOperator.getWebsiteOperator(websiteId, userId)`
  * **Invite A Website Operator** [`user`]: `CrispClient.websiteOperator.inviteWebsiteOperator(websiteID, email, role, verify)`
  * **Change Operator Membership** [`user`]: `CrispClient.websiteOperator.changeOperatorMembership(websiteID, userID, role, title)`
  * **Unlink Operator From Website** [`user`]: `CrispClient.websiteOperator.unlinkOperatorFromWebsite(websiteID, userID)`

* **Website Visitors**
  * **Count Visitors** [`user`, `plugin`]: `CrispClient.websiteVisitors.countVisitors(websiteID)`
  * **List Visitors** [`user`, `plugin`]: `CrispClient.websiteVisitors.listVisitors(websiteID, pageNumber)`
  * **Pinpoint Visitors On A Map** [`user`, `plugin`]: `CrispClient.websiteVisitors.pinpointVisitorsOnMap(websiteID, centerLongitude, centerLatitude, centerRadius)`
  * **Get Session Identifier From Token** [`user`, `plugin`]: `CrispClient.websiteVisitors.getSessionIdentifierFromToken(websiteID, tokenID)`
  * **Count Blocked Visitors** [`user`]: `CrispClient.websiteVisitors.countBlockedVisitors(websiteID)`
  * **Count Blocked Visitors In Rule** [`user`]: `CrispClient.websiteVisitors.countBlockedVisitorsInRule(websiteID, rule)`
  * **Clear Blocked Visitors In Rule** [`user`]: `CrispClient.websiteVisitors.clearBlockedVisitorsInRule(websiteID, rule)`

* **Website Availability**
  * **Get Website Availability Status** [`user`, `plugin`]: `CrispClient.websiteAvailability.getWebsiteAvailabilityStatus(websiteID)`
  * **List Website Operator Availabilities** [`user`, `plugin`]: `CrispClient.websiteAvailability.listWebsiteOperatorAvailabilities(websiteID)`

* **Website Analytics**
  * **Acquire Analytics Points** [`user`]: `CrispClient.websiteAnalytics.acquireAnalyticsPoints(websiteID, pointType, pointMetric, dateFrom, dateTo, dateSplit, classifier, filterPrimary, filterSecondary, filterTertiary)`
  * **List Analytics Filters** [`user`]: `CrispClient.websiteAnalytics.listAnalyticsFilters(websiteID, pageNumber, pointType, pointMetric, dateFrom, dateTo)`
  * **List Analytics Classifiers** [`user`]: `CrispClient.websiteAnalytics.listAnalyticsClassifiers(websiteID, pageNumber, pointType, pointMetric, dateFrom, dateTo)`

* **Website Batch**
  * **Batch Resolve Conversations** [`user`]: `CrispClient.websiteBatch.batchResolveConversations(websiteID, sessions)`
  * **Batch Read Conversations** [`user`]: `CrispClient.websiteBatch.batchReadConversations(websiteID, sessions)`
  * **Batch Remove Conversations** [`user`]: `CrispClient.websiteBatch.batchRemoveConversations(websiteID, sessions)`
  * **Batch Remove People** [`user`]: `CrispClient.websiteBatch.batchRemovePeople(websiteID, people)`

* **Website Verify**
  * **Get Verify Settings** [`user`, `plugin`]: `CrispClient.websiteVerify.getVerifySettings(websiteID)`
  * **Update Verify Settings** [`user`, `plugin`]: `CrispClient.websiteVerify.updateVerifySettings(websiteID, settings)`
  * **Get Verify Key** [`user`, `plugin`]: `CrispClient.websiteVerify.getVerifyKey(websiteID)`
  * **Roll Verify Key** [`user`, `plugin`]: `CrispClient.websiteVerify.rollVerifyKey(websiteID)`

* **Website Campaigns**
  * **List Campaigns** [`user`]: `CrispClient.websiteCampaign.listCampaigns(websiteID, pageNumber)`
  * **List Campaign Tags** [`user`]: `CrispClient.websiteCampaign.listCampaignTags(websiteID)`
  * **List Campaign Templates** [`user`]: `CrispClient.websiteCampaign.listCampaignTemplates(websiteID, pageNumber)`
  * **Create A New Campaign Template** [`user`]: `CrispClient.websiteCampaign.createNewCampaignTemplate(websiteID, templateFormat, templateName)`
  * **Check If Campaign Template Exists** [`user`]: `CrispClient.websiteCampaign.checkCampaignTemplateExists(websiteID, templateID)`
  * **Get A Campaign Template** [`user`]: `CrispClient.websiteCampaign.getCampaignTemplate(websiteID, templateID)`
  * **Save A Campaign Template** [`user`]: `CrispClient.websiteCampaign.saveCampaignTemplate(websiteID, templateID, websiteCampaignTemplateItem)`
  * **Update A Campaign Template** [`user`]: `CrispClient.websiteCampaign.updateCampaignTemplate(websiteID, templateID, websiteCampaignTemplateItem)`
  * **Remove A Campaign Template** [`user`]: `CrispClient.websiteCampaign.removeCampaignTemplate(websiteID, templateID)`

* **Website Campaign**
  * **Create A New Campaign** [`user`]: `CrispClient.websiteCampaign.createNewCampaign(websiteID, campaignType, campaignName)`
  * **Check If Campaign Exists** [`user`]: `CrispClient.websiteCampaign.checkCampaignExists(websiteID, campaignID)`
  * **Get A Campaign** [`user`]: `CrispClient.websiteCampaign.getCampaign(websiteID, campaignID)`
  * **Save A Campaign** [`user`]: `CrispClient.websiteCampaign.saveCampaign(websiteID, campaignID, websiteCampaignItem)`
  * **Update A Campaign** [`user`]: `CrispClient.websiteCampaign.updateCampaign(websiteID, campaignID, websiteCampaignItem)`
  * **Remove A Campaign** [`user`]: `CrispClient.websiteCampaign.removeCampaign(websiteID, campaignID)`
  * **Dispatch A Campaign** [`user`]: `CrispClient.websiteCampaign.dispatchCampaign(websiteID, campaignID)`
  * **Resume A Campaign** [`user`]: `CrispClient.websiteCampaign.resumeCampaign(websiteID, campaignID)`
  * **Pause A Campaign** [`user`]: `CrispClient.websiteCampaign.pauseCampaign(websiteID, campaignID)`
  * **Test A Campaign** [`user`]: `CrispClient.websiteCampaign.testCampaign(websiteID, campaignID)`
  * **List Campaign Recipients** [`user`]: `CrispClient.websiteCampaign.listCampaignRecipients(websiteID, campaignID, pageNumber)`
  * **List Campaign Statistics** [`user`]: `CrispClient.websiteCampaign.listCampaignStatistics(websiteID, campaignID, action, pageNumber)`

### Plugin

* **Plugin Connect**
  * **Get Connect Account** [`user`, `plugin`]: `CrispClient.pluginConnect.getConnectAccount()`
  * **Check Connect Session Validity** [`user`, `plugin`]: `CrispClient.pluginConnect.checkConnectSessionValidity()`
  * **List All Connect Websites** [`user`, `plugin`]: `CrispClient.pluginConnect.listAllConnectWebsites(pageNumber, filterConfigured, dateSince)`

* **Plugin Subscription**
  * **List All Active Subscriptions** [`user`]: `CrispClient.pluginSubscription.listAllActiveSubscriptions()`
  * **List Subscriptions For A Website** [`user`]: `CrispClient.pluginSubscription.listSubscriptionsForWebsite(websiteId)`
  * **Get Subscription Details** [`user`]: `CrispClient.pluginSubscription.getSubscriptionDetails(websiteId, pluginId)`
  * **Subscribe Website To Plugin** [`user`]: `CrispClient.pluginSubscription.subscribeWebsiteToPlugin(websiteId, pluginId)`
  * **Unsubscribe Plugin From Website** [`user`]: `CrispClient.pluginSubscription.unsubscribePluginFromWebsite(websiteId, pluginId)`
  * **Get Subscription Settings** [`user`, `plugin`]: `CrispClient.pluginSubscription.getSubscriptionSettings(websiteId, pluginId)`
  * **Save Subscription Settings** [`user`, `plugin`]: `CrispClient.pluginSubscription.saveSubscriptionSettings(websiteId, pluginId, settings)`
  * **Update Subscription Settings** [`user`, `plugin`]: `CrispClient.pluginSubscription.updateSubscriptionSettings(websiteId, pluginId, settings)`
  * **Forward Plugin Payload To Channel** [`user`, `plugin`]: `CrispClient.pluginSubscription.forwardPluginPayloadToChannel(websiteID, pluginID, payload)`
  * **Dispatch Plugin Event** [`user`, `plugin`]: `CrispClient.pluginSubscription.dispatchPluginEvent(websiteID, pluginID, payload)`

### Media

* **MediaAnimation**
  * **List Animation Medias** [`user`]: `CrispClient.mediaAnimation.listAnimationMedias(pageNumber, listId, searchQuery)`

### Bucket

* **BucketURL**
  * **Generate Bucket URL** [`user`, `plugin`]: `CrispClient.bucketUrl.generateBucketURL(data)`

## Realtime Events

Available events are listed below:

* **Session Events**
  * **Session Update Availability** [`user`, `plugin`]: `session:update_availability`
  * **Session Update Verify** [`user`, `plugin`]: `session:update_verify`
  * **Session Request Initiated** [`user`, `plugin`]: `session:request:initiated`
  * **Session Set Email** [`user`, `plugin`]: `session:set_email`
  * **Session Set Phone** [`user`, `plugin`]: `session:set_phone`
  * **Session Set Address** [`user`, `plugin`]: `session:set_address`
  * **Session Set Avatar** [`user`, `plugin`]: `session:set_avatar`
  * **Session Set Nickname** [`user`, `plugin`]: `session:set_nickname`
  * **Session Set Data** [`user`, `plugin`]: `session:set_data`
  * **Session Sync Pages** [`user`, `plugin`]: `session:sync:pages`
  * **Session Sync Events** [`user`, `plugin`]: `session:sync:events`
  * **Session Sync Capabilities** [`user`, `plugin`]: `session:sync:capabilities`
  * **Session Sync Geolocation** [`user`, `plugin`]: `session:sync:geolocation`
  * **Session Sync System** [`user`, `plugin`]: `session:sync:system`
  * **Session Sync Network** [`user`, `plugin`]: `session:sync:network`
  * **Session Sync Timezone** [`user`, `plugin`]: `session:sync:timezone`
  * **Session Sync Locales** [`user`, `plugin`]: `session:sync:locales`
  * **Session Sync Rating** [`user`, `plugin`]: `session:sync:rating`
  * **Session Set State** [`user`, `plugin`]: `session:set_state`
  * **Session Set Block** [`user`, `plugin`]: `session:set_block`
  * **Session Set Segments** [`user`, `plugin`]: `session:set_segments`
  * **Session Set Opened** [`user`, `plugin`]: `session:set_opened`
  * **Session Set Closed** [`user`, `plugin`]: `session:set_closed`
  * **Session Set Participants** [`user`, `plugin`]: `session:set_participants`
  * **Session Set Mentions** [`user`, `plugin`]: `session:set_mentions`
  * **Session Set Routing** [`user`, `plugin`]: `session:set_routing`
  * **Session Removed** [`user`, `plugin`]: `session:removed`

* **Message Events**
  * **Message Updated** [`user`, `plugin`]: `message:updated`
  * **Message Send** [`user`, `plugin`]: `message:send`
  * **Message Received** [`user`, `plugin`]: `message:received`
  * **Message Compose Send** [`user`, `plugin`]: `message:compose:send`
  * **Message Compose Receive** [`user`, `plugin`]: `message:compose:receive`
  * **Message Acknowledge Read Send** [`user`, `plugin`]: `message:acknowledge:read:send`
  * **Message Acknowledge Read Received** [`user`, `plugin`]: `message:acknowledge:read:received`
  * **Message Acknowledge Delivered** [`user`, `plugin`]: `message:acknowledge:delivered`
  * **Message Notify Unread Send** [`user`, `plugin`]: `message:notify:unread:send`
  * **Message Notify Unread Received** [`user`, `plugin`]: `message:notify:unread:received`

* **People Events**
  * **People Profile Created** [`user`, `plugin`]: `people:profile:created`
  * **People Profile Updated** [`user`, `plugin`]: `people:profile:updated`
  * **People Profile Removed** [`user`, `plugin`]: `people:profile:removed`
  * **People Bind Session** [`user`, `plugin`]: `people:bind:session`
  * **People Sync Profile** [`user`, `plugin`]: `people:sync:profile`
  * **People Import Progress** [`user`]: `people:import:progress`
  * **People Import Done** [`user`]: `people:import:done`

* **Campaign Events**
  * **Campaign Progress** [`user`]: `campaign:progress`
  * **Campaign Dispatched** [`user`]: `campaign:dispatched`
  * **Campaign Running** [`user`]: `campaign:running`

* **Browsing Events**
  * **Browsing Request Initiated** [`user`, `plugin`]: `browsing:request:initiated`
  * **Browsing Request Rejected** [`user`, `plugin`]: `browsing:request:rejected`

* **Call Events**
  * **Call Request Initiated** [`user`, `plugin`]: `call:request:initiated`
  * **Call Request Rejected** [`user`, `plugin`]: `call:request:rejected`

* **Widget Events**
  * **Widget Action Processed** [`user`]: `widget:action:processed`

* **Status Events**
  * **Status Health Changed** [`user`]: `status:health:changed`

* **Website Events**
  * **Website Update Visitors Count** [`user`, `plugin`]: `website:update_visitors_count`
  * **Website Update Operators Availability** [`user`, `plugin`]: `website:update_operators_availability`
  * **Website Users Available** [`user`, `plugin`]: `website:users:available`

* **Bucket Events**
  * **Bucket URL Upload Generated** [`user`, `plugin`]: `bucket:url:upload:generated`
  * **Bucket URL Avatar Generated** [`user`, `plugin`]: `bucket:url:avatar:generated`
  * **Bucket URL Website Generated** [`user`, `plugin`]: `bucket:url:website:generated`
  * **Bucket URL Campaign Generated** [`user`, `plugin`]: `bucket:url:campaign:generated`
  * **Bucket URL Helpdesk Generated** [`user`, `plugin`]: `bucket:url:helpdesk:generated`
  * **Bucket URL Status Generated** [`user`, `plugin`]: `bucket:url:status:generated`
  * **Bucket URL Processing Generated** [`user`, `plugin`]: `bucket:url:processing:generated`

* **Media Events**
  * **Media Animation Listed** [`user`]: `media:animation:listed`

* **Email Events**
  * **Email Subscribe** [`user`, `plugin`]: `email:subscribe`
  * **Email Track View** [`user`, `plugin`]: `email:track:view`

* **Plugin Events**
  * **Plugin Channel** [`user`, `plugin`]: `plugin:channel`
  * **Plugin Event** [`user`, `plugin`]: `plugin:event`
  * **Plugin Settings Saved** [`user`, `plugin`]: `plugin:settings:saved`
