# node-crisp-api

[![Test and Build](https://github.com/crisp-im/node-crisp-api/workflows/Test%20and%20Build/badge.svg?branch=master)](https://github.com/crisp-im/node-crisp-api/actions?query=workflow%3A%22Test+and+Build%22) [![NPM](https://img.shields.io/npm/v/crisp-api.svg)](https://www.npmjs.com/package/crisp-api) [![Downloads](https://img.shields.io/npm/dt/crisp-api.svg)](https://www.npmjs.com/package/crisp-api)

The Crisp API NodeJS wrapper. Authenticate, send messages, fetch conversations, access your agent accounts from your JavaScript code.

Copyright 2021 Crisp IM SARL. See LICENSE for copying information.

* **📝 Implements**: [REST API Reference (V1)](https://docs.crisp.chat/references/rest-api/v1/) at revision: 08/11/2021
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

Thus, it is straightforward to look for them in the library while reading the [REST API Reference](https://docs.crisp.chat/references/rest-api/v1/).

**⚠️ Note that, depending on your authentication token tier, which is either `user` or `plugin`, you may not be allowed to use all methods from the library. When in doubt, refer to the library method descriptions below. Most likely, you are using a `plugin` token.**

### Website

* **Website Conversations**
  * **List Conversations** [`user`, `plugin`]: `CrispClient.website.listConversations(websiteID, pageNumber)`
  * **List Suggested Conversation Segments** [`user`, `plugin`]: `CrispClient.website.listSuggestedConversationSegments(websiteID, pageNumber)`
  * **Delete Suggested Conversation Segment** [`user`, `plugin`]: `CrispClient.website.deleteSuggestedConversationSegment(websiteID, segment)`
  * **List Suggested Conversation Data Keys** [`user`, `plugin`]: `CrispClient.website.listSuggestedConversationDataKeys(websiteID, pageNumber)`
  * **Delete Suggested Conversation Data Key** [`user`, `plugin`]: `CrispClient.website.deleteSuggestedConversationDataKey(websiteID, key)`

* **Website Conversation**
  * **Create A New Conversation** [`user`, `plugin`]: `CrispClient.website.createNewConversation(websiteID)`
  * **Check If Conversation Exists** [`user`, `plugin`]: `CrispClient.website.checkConversationExists(websiteID, sessionID)`
  * **Get A Conversation** [`user`, `plugin`]: `CrispClient.website.getConversation(websiteID, sessionID)`
  * **Remove A Conversation** [`user`, `plugin`]: `CrispClient.website.removeConversation(websiteID, sessionID)`
  * **Initiate A Conversation With Existing Session** [`user`, `plugin`]: `CrispClient.website.initiateConversationWithExistingSession(websiteID, sessionID)`
  * **Get Messages In Conversation** [`user`, `plugin`]: `CrispClient.website.getMessagesInConversation(websiteID, sessionID, timestampBefore)`
  * **Send A Message In Conversation** [`user`, `plugin`]: `CrispClient.website.sendMessageInConversation(websiteID, sessionID, message)`
  * **Get A Message In Conversation** [`user`, `plugin`]: `CrispClient.website.getMessageInConversation(websiteID, sessionID, fingerprint)`
  * **Update A Message In Conversation** [`user`, `plugin`]: `CrispClient.website.updateMessageInConversation(websiteID, sessionID, fingerprint, content)`
  * **Compose A Message In Conversation** [`user`, `plugin`]: `CrispClient.website.composeMessageInConversation(websiteID, sessionID, compose)`
  * **Mark Messages As Read In Conversation** [`user`, `plugin`]: `CrispClient.website.markMessagesReadInConversation(websiteID, sessionID, read)`
  * **Mark Messages As Delivered In Conversation** [`user`, `plugin`]: `CrispClient.website.markMessagesDeliveredInConversation(websiteID, sessionID, delivered)`
  * **Update Conversation Open State** [`user`, `plugin`]: `CrispClient.website.updateConversationOpenState(websiteID, sessionID, opened)`
  * **Get Conversation Routing Assign** [`user`, `plugin`]: `CrispClient.website.getConversationRoutingAssign(websiteID, sessionID)`
  * **Assign Conversation Routing** [`user`, `plugin`]: `CrispClient.website.assignConversationRouting(websiteID, sessionID, assign)`
  * **Get Conversation Metas** [`user`, `plugin`]: `CrispClient.website.getConversationMetas(websiteID, sessionID)`
  * **Update Conversation Metas** [`user`, `plugin`]: `CrispClient.website.updateConversationMetas(websiteID, sessionID, metas)`
  * **Get An Original Message In Conversation** [`user`, `plugin`]: `CrispClient.website.getOriginalMessageInConversation(websiteID, sessionID, originalID)`
  * **List Conversation Pages** [`user`, `plugin`]: `CrispClient.website.listConversationPages(websiteID, sessionID, pageNumber)`
  * **List Conversation Events** [`user`, `plugin`]: `CrispClient.website.listConversationEvents(websiteID, sessionID, pageNumber)`
  * **Get Conversation State** [`user`, `plugin`]: `CrispClient.website.getConversationState(websiteID, sessionID)`
  * **Change Conversation State** [`user`, `plugin`]: `CrispClient.website.changeConversationState(websiteID, sessionID, state)`
  * **Get Conversation Participants** [`user`, `plugin`]: `CrispClient.website.getConversationParticipants(websiteID, sessionID)`
  * **Save Conversation Participants** [`user`, `plugin`]: `CrispClient.website.saveConversationParticipants(websiteID, sessionID, participants)`
  * **Get Block Status For Conversation** [`user`, `plugin`]: `CrispClient.website.getBlockStatusForConversation(websiteID, sessionID)`
  * **Block Incoming Messages For Conversation** [`user`, `plugin`]: `CrispClient.website.blockIncomingMessagesForConversation(websiteID, sessionID, blocked)`
  * **Request Email Transcript For Conversation** [`user`, `plugin`]: `CrispClient.website.requestEmailTranscriptForConversation(websiteID, sessionID, to, email)`
  * **Request Chatbox Binding Purge For Conversation** [`user`, `plugin`]: `CrispClient.website.requestChatboxBindingPurgeForConversation(websiteID, sessionID)`
  * **List Browsing Sessions For Conversation** [`user`, `plugin`]: `CrispClient.website.listBrowsingSessionsForConversation(websiteID, sessionID)`
  * **Initiate Browsing Session For Conversation** [`user`, `plugin`]: `CrispClient.website.initiateBrowsingSessionForConversation(websiteID, sessionID)`
  * **Send Action To An Existing Browsing Session** [`user`, `plugin`]: `CrispClient.website.sendActionToExistingBrowsingSession(websiteID, sessionID, browsingID, action)`
  * **Assist Existing Browsing Session** [`user`, `plugin`]: `CrispClient.website.assistExistingBrowsingSession(websiteID, sessionID, browsingID, assist)`
  * **Initiate New Call Session For Conversation** [`user`, `plugin`]: `CrispClient.website.initiateNewCallSessionForConversation(websiteID, sessionID)`
  * **Get Ongoing Call Session For Conversation** [`user`, `plugin`]: `CrispClient.website.getOngoingCallSessionForConversation(websiteID, sessionID)`
  * **Abort Ongoing Call Session For Conversation** [`user`, `plugin`]: `CrispClient.website.abortOngoingCallSessionForConversation(websiteID, sessionID, callID)`
  * **Transmit Signaling On Ongoing Call Session** [`user`, `plugin`]: `CrispClient.website.transmitSignalingOnOngoingCallSession(websiteID, sessionID, callID, payload)`
  * **Deliver Widget Button Action For Conversation** [`user`]: `CrispClient.website.deliverWidgetButtonActionForConversation(websiteID, sessionID, pluginID, sectionID, itemID, data, value)`
  * **Deliver Widget Data Fetch Action For Conversation** [`user`]: `CrispClient.website.deliverWidgetDataFetchActionForConversation(websiteID, sessionID, pluginID, sectionID, itemID)`
  * **Deliver Widget Data Edit Action For Conversation** [`user`]: `CrispClient.website.deliverWidgetDataEditActionForConversation(websiteID, sessionID, pluginID, sectionID, itemID, value)`
  * **Schedule A Reminder For Conversation** [`user`, `plugin`]: `CrispClient.website.scheduleReminderForConversation(websiteID, sessionID, date, note)`

* **Website People** _(these are your end-users)_
  * **Get People Statistics** [`user`, `plugin`]: `CrispClient.website.getPeopleStatistics(websiteID)`
  * **List Suggested People Segments** [`user`, `plugin`]: `CrispClient.website.listSuggestedPeopleSegments(websiteID, pageNumber)`
  * **Delete Suggested People Segment** [`user`, `plugin`]: `CrispClient.website.deleteSuggestedPeopleSegment(websiteID, segment)`
  * **List Suggested People Data Keys** [`user`, `plugin`]: `CrispClient.website.listSuggestedPeopleDataKeys(websiteID, pageNumber)`
  * **Delete Suggested People Data Key** [`user`, `plugin`]: `CrispClient.website.deleteSuggestedPeopleDataKey(websiteID, key)`
  * **List Suggested People Events** [`user`, `plugin`]: `CrispClient.website.listSuggestedPeopleEvents(websiteID, pageNumber)`
  * **Delete Suggested People Event** [`user`, `plugin`]: `CrispClient.website.deleteSuggestedPeopleEvent(websiteID, text)`
  * **List People Profiles** [`user`, `plugin`]: `CrispClient.website.listPeopleProfiles(websiteID, pageNumber, searchField, searchOrder, searchOperator, searchFilter, searchText)`
  * **Add New People Profile** [`user`, `plugin`]: `CrispClient.website.addNewPeopleProfile(websiteID, peopleProfile)`
  * **Check If People Profile Exists** [`user`, `plugin`]: `CrispClient.website.checkPeopleProfileExists(websiteID, peopleID)`
  * **Get People Profile** [`user`, `plugin`]: `CrispClient.website.getPeopleProfile(websiteID, peopleID)`
  * **Save People Profile** [`user`, `plugin`]: `CrispClient.website.savePeopleProfile(websiteID, peopleID, peopleProfile)`
  * **Update People Profile** [`user`, `plugin`]: `CrispClient.website.updatePeopleProfile(websiteID, peopleID, peopleProfile)`
  * **Remove People Profile** [`user`, `plugin`]: `CrispClient.website.removePeopleProfile(websiteID, peopleID)`
  * **List People Conversations** [`user`, `plugin`]: `CrispClient.website.listPeopleConversations(websiteID, peopleID, pageNumber)`
  * **List People Campaigns** [`user`]: `CrispClient.website.listPeopleCampaigns(websiteID, peopleID, pageNumber)`
  + **Add A People Event** [`user`, `plugin`]: `CrispClient.website.addPeopleEvent(websiteID, peopleID, peopleEvent)`
  + **List People Events** [`user`, `plugin`]: `CrispClient.website.listPeopleEvents(websiteID, peopleID, pageNumber)`
  + **Get People Data** [`user`, `plugin`]: `CrispClient.website.getPeopleData(websiteID, peopleID)`
  + **Save People Data** [`user`, `plugin`]: `CrispClient.website.savePeopleData(websiteID, peopleID, peopleData)`
  + **Update People Data** [`user`, `plugin`]: `CrispClient.website.updatePeopleData(websiteID, peopleID, peopleData)`
  + **Get People Subscription Status** [`user`, `plugin`]: `CrispClient.website.getPeopleSubscriptionStatus(websiteID, peopleID)`
  + **Update People Subscription Status** [`user`, `plugin`]: `CrispClient.website.updatePeopleSubscriptionStatus(websiteID, peopleID, peopleSubscription)`
  * **Export People Profiles** [`user`]: `CrispClient.website.exportPeopleProfiles(websiteID)`
  * **Import People Profiles** [`user`]: `CrispClient.website.importPeopleProfiles(websiteID, profileImportSetup)`

_👉 Notice: The `peopleID` argument can be an email or the `peopleID`._

* **Website Base**
  * **Check If Website Exists** [`user`, `plugin`]: `CrispClient.website.checkWebsiteExists(domain)`
  * **Create Website** [`user`]: `CrispClient.website.createWebsite(websiteData)`
  * **Get A Website** [`user`, `plugin`]: `CrispClient.website.getWebsite(websiteID)`
  * **Delete A Website** [`user`]: `CrispClient.website.deleteWebsite(websiteID, verify)`

* **Website Settings**
  * **Get Website Settings** [`user`, `plugin`]: `CrispClient.website.getWebsiteSettings(websiteID)`
  * **Update Website Settings** [`user`, `plugin`]: `CrispClient.website.updateWebsiteSettings(websiteID, settings)`

* **Website Operator**
  * **List Website Operators** [`user`, `plugin`]: `CrispClient.website.listWebsiteOperators(websiteID)`
  * **List Last Active Website Operators** [`user`, `plugin`]: `CrispClient.website.listLastActiveWebsiteOperators(websiteID)`
  * **Flush Last Active Website Operators** [`user`]: `CrispClient.website.flushLastActiveWebsiteOperators(websiteID)`
  * **Send Email To Website Operators** [`user`, `plugin`]: `CrispClient.website.sendEmailToWebsiteOperators(websiteID, emailData)`
  * **Get A Website Operator** [`user`, `plugin`]: `CrispClient.website.getWebsiteOperator(websiteID, userID)`
  * **Invite A Website Operator** [`user`]: `CrispClient.website.inviteWebsiteOperator(websiteID, email, role, verify)`
  * **Change Operator Membership** [`user`]: `CrispClient.website.changeOperatorMembership(websiteID, userID, role, title)`
  * **Unlink Operator From Website** [`user`]: `CrispClient.website.unlinkOperatorFromWebsite(websiteID, userID)`

* **Website Visitors**
  * **Count Visitors** [`user`, `plugin`]: `CrispClient.website.countVisitors(websiteID)`
  * **List Visitors** [`user`, `plugin`]: `CrispClient.website.listVisitors(websiteID, pageNumber)`
  * **Pinpoint Visitors On A Map** [`user`, `plugin`]: `CrispClient.website.pinpointVisitorsOnMap(websiteID, centerLongitude, centerLatitude, centerRadius)`
  * **Get Session Identifier From Token** [`user`, `plugin`]: `CrispClient.website.getSessionIdentifierFromToken(websiteID, tokenID)`
  * **Count Blocked Visitors** [`user`]: `CrispClient.website.countBlockedVisitors(websiteID)`
  * **Count Blocked Visitors In Rule** [`user`]: `CrispClient.website.countBlockedVisitorsInRule(websiteID, rule)`
  * **Clear Blocked Visitors In Rule** [`user`]: `CrispClient.website.clearBlockedVisitorsInRule(websiteID, rule)`

* **Website Availability**
  * **Get Website Availability Status** [`user`, `plugin`]: `CrispClient.website.getWebsiteAvailabilityStatus(websiteID)`
  * **List Website Operator Availabilities** [`user`, `plugin`]: `CrispClient.website.listWebsiteOperatorAvailabilities(websiteID)`

* **Website Analytics**
  * **Acquire Analytics Points** [`user`]: `CrispClient.website.acquireAnalyticsPoints(websiteID, pointType, pointMetric, dateFrom, dateTo, dateSplit, classifier, filterPrimary, filterSecondary, filterTertiary)`
  * **List Analytics Filters** [`user`]: `CrispClient.website.listAnalyticsFilters(websiteID, pageNumber, pointType, pointMetric, dateFrom, dateTo)`
  * **List Analytics Classifiers** [`user`]: `CrispClient.website.listAnalyticsClassifiers(websiteID, pageNumber, pointType, pointMetric, dateFrom, dateTo)`

* **Website Batch**
  * **Batch Resolve Conversations** [`user`]: `CrispClient.website.batchResolveConversations(websiteID, sessions)`
  * **Batch Read Conversations** [`user`]: `CrispClient.website.batchReadConversations(websiteID, sessions)`
  * **Batch Remove Conversations** [`user`]: `CrispClient.website.batchRemoveConversations(websiteID, sessions)`
  * **Batch Remove People** [`user`]: `CrispClient.website.batchRemovePeople(websiteID, people)`

* **Website Verify**
  * **Get Verify Settings** [`user`, `plugin`]: `CrispClient.website.getVerifySettings(websiteID)`
  * **Update Verify Settings** [`user`, `plugin`]: `CrispClient.website.updateVerifySettings(websiteID, settings)`
  * **Get Verify Key** [`user`, `plugin`]: `CrispClient.website.getVerifyKey(websiteID)`
  * **Roll Verify Key** [`user`, `plugin`]: `CrispClient.website.rollVerifyKey(websiteID)`

* **Website Campaigns**
  * **List Campaigns** [`user`]: `CrispClient.website.listCampaigns(websiteID, pageNumber)`
  * **List Campaign Tags** [`user`]: `CrispClient.website.listCampaignTags(websiteID)`
  * **List Campaign Templates** [`user`]: `CrispClient.website.listCampaignTemplates(websiteID, pageNumber)`
  * **Create A New Campaign Template** [`user`]: `CrispClient.website.createNewCampaignTemplate(websiteID, templateFormat, templateName)`
  * **Check If Campaign Template Exists** [`user`]: `CrispClient.website.checkCampaignTemplateExists(websiteID, templateID)`
  * **Get A Campaign Template** [`user`]: `CrispClient.website.getCampaignTemplate(websiteID, templateID)`
  * **Save A Campaign Template** [`user`]: `CrispClient.website.saveCampaignTemplate(websiteID, templateID, template)`
  * **Update A Campaign Template** [`user`]: `CrispClient.website.updateCampaignTemplate(websiteID, templateID, template)`
  * **Remove A Campaign Template** [`user`]: `CrispClient.website.removeCampaignTemplate(websiteID, templateID)`

* **Website Campaign**
  * **Create A New Campaign** [`user`]: `CrispClient.website.createNewCampaign(websiteID, campaignType, campaignName)`
  * **Check If Campaign Exists** [`user`]: `CrispClient.website.checkCampaignExists(websiteID, campaignID)`
  * **Get A Campaign** [`user`]: `CrispClient.website.getCampaign(websiteID, campaignID)`
  * **Save A Campaign** [`user`]: `CrispClient.website.saveCampaign(websiteID, campaignID, campaign)`
  * **Update A Campaign** [`user`]: `CrispClient.website.updateCampaign(websiteID, campaignID, campaign)`
  * **Remove A Campaign** [`user`]: `CrispClient.website.removeCampaign(websiteID, campaignID)`
  * **Dispatch A Campaign** [`user`]: `CrispClient.website.dispatchCampaign(websiteID, campaignID)`
  * **Resume A Campaign** [`user`]: `CrispClient.website.resumeCampaign(websiteID, campaignID)`
  * **Pause A Campaign** [`user`]: `CrispClient.website.pauseCampaign(websiteID, campaignID)`
  * **Test A Campaign** [`user`]: `CrispClient.website.testCampaign(websiteID, campaignID)`
  * **List Campaign Recipients** [`user`]: `CrispClient.website.listCampaignRecipients(websiteID, campaignID, pageNumber)`
  * **List Campaign Statistics** [`user`]: `CrispClient.website.listCampaignStatistics(websiteID, campaignID, action, pageNumber)`

### Plugin

* **Plugin Connect**
  * **Get Connect Account** [`user`, `plugin`]: `CrispClient.plugin.getConnectAccount()`
  * **Check Connect Session Validity** [`user`, `plugin`]: `CrispClient.plugin.checkConnectSessionValidity()`
  * **List All Connect Websites** [`user`, `plugin`]: `CrispClient.plugin.listAllConnectWebsites(pageNumber, filterConfigured, dateSince)`

* **Plugin Subscription**
  * **List All Active Subscriptions** [`user`]: `CrispClient.plugin.listAllActiveSubscriptions()`
  * **List Subscriptions For A Website** [`user`]: `CrispClient.plugin.listSubscriptionsForWebsite(websiteID)`
  * **Get Subscription Details** [`user`]: `CrispClient.plugin.getSubscriptionDetails(websiteID, pluginID)`
  * **Subscribe Website To Plugin** [`user`]: `CrispClient.plugin.subscribeWebsiteToPlugin(websiteID, pluginID)`
  * **Unsubscribe Plugin From Website** [`user`]: `CrispClient.plugin.unsubscribePluginFromWebsite(websiteID, pluginID)`
  * **Get Subscription Settings** [`user`, `plugin`]: `CrispClient.plugin.getSubscriptionSettings(websiteID, pluginID)`
  * **Save Subscription Settings** [`user`, `plugin`]: `CrispClient.plugin.saveSubscriptionSettings(websiteID, pluginID, settings)`
  * **Update Subscription Settings** [`user`, `plugin`]: `CrispClient.plugin.updateSubscriptionSettings(websiteID, pluginID, settings)`
  * **Forward Plugin Payload To Channel** [`user`, `plugin`]: `CrispClient.plugin.forwardPluginPayloadToChannel(websiteID, pluginID, payload)`
  * **Dispatch Plugin Event** [`user`, `plugin`]: `CrispClient.plugin.dispatchPluginEvent(websiteID, pluginID, payload)`

### Media

* **MediaAnimation**
  * **List Animation Medias** [`user`]: `CrispClient.media.listAnimationMedias(pageNumber, listID, searchQuery)`

### Bucket

* **BucketURL**
  * **Generate Bucket URL** [`user`, `plugin`]: `CrispClient.bucket.generateBucketURL(data)`

## Realtime Events

You can bind to realtime events from Crisp, in order to get notified of incoming messages and updates in websites.

You won't receive any event if you don't explicitly subscribe to realtime events using `CrispClient.on()`, as the library doesn't connect to the realtime backend automatically.

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
