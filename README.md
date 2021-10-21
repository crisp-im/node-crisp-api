# node-crisp-api

[![Test and Build](https://github.com/crisp-im/node-crisp-api/workflows/Test%20and%20Build/badge.svg?branch=master)](https://github.com/crisp-im/node-crisp-api/actions?query=workflow%3A%22Test+and+Build%22) [![NPM](https://img.shields.io/npm/v/node-crisp-api.svg)](https://www.npmjs.com/package/node-crisp-api) [![Downloads](https://img.shields.io/npm/dt/node-crisp-api.svg)](https://www.npmjs.com/package/node-crisp-api)

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

CrispClient.websiteConversation.listConversations(websiteID, 1)
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
var Crisp = require("node-crisp-api");
var CrispClient = new Crisp();

CrispClient.authenticateTier("plugin", identifier, key);

// Notice: make sure to authenticate before listening for an event
CrispClient.on("message:send", function(message) {
  CrispClient.websiteConversation.sendMessageInConversation(
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
  * **List Conversations** [`user`, `plugin`]: `CrispClient.websiteConversation.listConversations(websiteID, pageNumber)`
  * **List Suggested Conversation Segments** [`user`, `plugin`]: `CrispClient.websiteConversation.listSuggestedConversationSegments(websiteID, pageNumber)`
  * **Delete Suggested Conversation Segment** [`user`, `plugin`]: `CrispClient.websiteConversation.deleteSuggestedConversationSegment(websiteID, segment)`
  * **List Suggested Conversation Data Keys** [`user`, `plugin`]: `CrispClient.websiteConversation.listSuggestedConversationDataKeys(websiteID, pageNumber)`
  * **Delete Suggested Conversation Data Key** [`user`, `plugin`]: `CrispClient.websiteConversation.deleteSuggestedConversationDataKey(websiteID, key)`

* **Website Conversation**
  * **Create A New Conversation** [`user`, `plugin`]: `CrispClient.websiteConversation.createNewConversation(websiteID)`
  * **Check If Conversation Exists** [`user`, `plugin`]: `CrispClient.websiteConversation.checkConversationExists(websiteID, sessionID)`
  * **Get A Conversation** [`user`, `plugin`]: `CrispClient.websiteConversation.getConversation(websiteID, sessionID)`
  * **Remove A Conversation** [`user`, `plugin`]: `CrispClient.websiteConversation.removeConversation(websiteID, sessionID)`
  * **Initiate A Conversation With Existing Session** [`user`, `plugin`]: `CrispClient.websiteConversation.initiateConversationWithExistingSession(websiteID, sessionID)`
  * **Get Messages In Conversation** [`user`, `plugin`]: `CrispClient.websiteConversation.getMessagesInConversation(websiteID, sessionID, timestampBefore)`
  * **Send A Message In Conversation** [`user`, `plugin`]: `CrispClient.websiteConversation.sendMessageInConversation(websiteID, sessionID, message)`
  * **Get A Message In Conversation** [`user`, `plugin`]: `CrispClient.websiteConversation.getMessageInConversation(websiteID, sessionID, fingerprint)`
  * **Update A Message In Conversation** [`user`, `plugin`]: `CrispClient.websiteConversation.updateMessageInConversation(websiteID, sessionID, fingerprint, content)`
  * **Compose A Message In Conversation** [`user`, `plugin`]: `CrispClient.websiteConversation.composeMessageInConversation(websiteID, sessionID, compose)`
  * **Mark Messages As Read In Conversation** [`user`, `plugin`]: `CrispClient.websiteConversation.markMessagesReadInConversation(websiteID, sessionID, read)`
  * **Mark Messages As Delivered In Conversation** [`user`, `plugin`]: `CrispClient.websiteConversation.markMessagesDeliveredInConversation(websiteID, sessionID, delivered)`
  * **Update Conversation Open State** [`user`, `plugin`]: `CrispClient.websiteConversation.updateConversationOpenState(websiteID, sessionID, opened)`
  * **Get Conversation Routing Assign** [`user`, `plugin`]: `CrispClient.websiteConversation.getConversationRoutingAssign(websiteID, sessionID)`
  * **Assign Conversation Routing** [`user`, `plugin`]: `CrispClient.websiteConversation.assignConversationRouting(websiteID, sessionID, assign)`
  * **Get Conversation Metas** [`user`, `plugin`]: `CrispClient.websiteConversation.getConversationMetas(websiteID, sessionID)`
  * **Update Conversation Metas** [`user`, `plugin`]: `CrispClient.websiteConversation.updateConversationMetas(websiteID, sessionID, metas)`
  * **Get An Original Message In Conversation** [`user`, `plugin`]: `CrispClient.websiteConversation.getOriginalMessageInConversation(websiteID, sessionID, originalID)`
  * **List Conversation Pages** [`user`, `plugin`]: `CrispClient.websiteConversation.listConversationPages(websiteID, sessionID, pageNumber)`
  * **List Conversation Events** [`user`, `plugin`]: `CrispClient.websiteConversation.listConversationEvents(websiteID, sessionID, pageNumber)`
  * **Get Conversation State** [`user`, `plugin`]: `CrispClient.websiteConversation.getConversationState(websiteID, sessionID)`
  * **Change Conversation State** [`user`, `plugin`]: `CrispClient.websiteConversation.changeConversationState(websiteID, sessionID, state)`
  * **Get Conversation Participants** [`user`, `plugin`]: `CrispClient.websiteConversation.getConversationParticipants(websiteID, sessionID)`
  * **Save Conversation Participants** [`user`, `plugin`]: `CrispClient.websiteConversation.saveConversationParticipants(websiteID, sessionID, participants)`
  * **Get Block Status For Conversation** [`user`, `plugin`]: `CrispClient.websiteConversation.getBlockStatusForConversation(websiteID, sessionID)`
  * **Block Incoming Messages For Conversation** [`user`, `plugin`]: `CrispClient.websiteConversation.blockIncomingMessagesForConversation(websiteID, sessionID, blocked)`
  * **Request Email Transcript For Conversation** [`user`, `plugin`]: `CrispClient.websiteConversation.requestEmailTranscriptForConversation(websiteID, sessionID, to, email)`
  * **Request Chatbox Binding Purge For Conversation** [`user`, `plugin`]: `CrispClient.websiteConversation.requestChatboxBindingPurgeForConversation(websiteID, sessionID)`
  * **List Browsing Sessions For Conversation** [`user`, `plugin`]: `CrispClient.websiteConversation.listBrowsingSessionsForConversation(websiteID, sessionID)`
  * **Initiate Browsing Session For Conversation** [`user`, `plugin`]: `CrispClient.websiteConversation.initiateBrowsingSessionForConversation(websiteID, sessionID)`
  * **Send Action To An Existing Browsing Session** [`user`, `plugin`]: `CrispClient.websiteConversation.sendActionToExistingBrowsingSession(websiteID, sessionID, browsingID, action)`
  * **Debug Existing Browsing Session** [`user`, `plugin`]: `CrispClient.websiteConversation.debugExistingBrowsingSession(websiteID, sessionID, browsingID, debug)`
  * **Assist Existing Browsing Session** [`user`, `plugin`]: `CrispClient.websiteConversation.assistExistingBrowsingSession(websiteID, sessionID, browsingID, assist)`
  * **Initiate New Call Session For Conversation** [`user`, `plugin`]: `CrispClient.websiteConversation.initiateNewCallSessionForConversation(websiteID, sessionID)`
  * **Get Ongoing Call Session For Conversation** [`user`, `plugin`]: `CrispClient.websiteConversation.getOngoingCallSessionForConversation(websiteID, sessionID)`
  * **Abort Ongoing Call Session For Conversation** [`user`, `plugin`]: `CrispClient.websiteConversation.abortOngoingCallSessionForConversation(websiteID, sessionID, callID)`
  * **Transmit Signaling On Ongoing Call Session** [`user`, `plugin`]: `CrispClient.websiteConversation.transmitSignalingOnOngoingCallSession(websiteID, sessionID, callID, payload)`
  * **Deliver Widget Button Action For Conversation** [`user`]: `CrispClient.websiteConversation.deliverWidgetButtonActionForConversation(websiteID, sessionID, pluginID, sectionID, itemID, data, value)`
  * **Deliver Widget Data Fetch Action For Conversation** [`user`]: `CrispClient.websiteConversation.deliverWidgetDataFetchActionForConversation(websiteID, sessionID, pluginID, sectionID, itemID)`
  * **Deliver Widget Data Edit Action For Conversation** [`user`]: `CrispClient.websiteConversation.deliverWidgetDataEditActionForConversation(websiteID, sessionID, pluginID, sectionID, itemID, value)`
  * **Schedule A Reminder For Conversation** [`user`, `plugin`]: `CrispClient.websiteConversation.scheduleReminderForConversation(websiteID, sessionID, date, note)`

* **Website People** _(these are your end-users)_
  * **Get People Statistics** [`user`, `plugin`]: `CrispClient.websitePeople.getPeopleStatistics(websiteID)`
  * **List Suggested People Segments** [`user`, `plugin`]: `CrispClient.websitePeople.listSuggestedPeopleSegments(websiteID, pageNumber)`
  * **Delete Suggested People Segment** [`user`, `plugin`]: `CrispClient.websitePeople.deleteSuggestedPeopleSegment(websiteID, segment)`
  * **List Suggested People Data Keys** [`user`, `plugin`]: `CrispClient.websitePeople.listSuggestedPeopleDataKeys(websiteID, pageNumber)`
  * **Delete Suggested People Data Key** [`user`, `plugin`]: `CrispClient.websitePeople.deleteSuggestedPeopleDataKey(websiteID, key)`
  * **List Suggested People Events** [`user`, `plugin`]: `CrispClient.websitePeople.listSuggestedPeopleEvents(websiteID, pageNumber)`
  * **Delete Suggested People Event** [`user`, `plugin`]: `CrispClient.websitePeople.deleteSuggestedPeopleEvent(websiteID, text)`
  * **List People Profiles** [`user`, `plugin`]: `CrispClient.websitePeople.listPeopleProfiles(websiteID, pageNumber, searchField, searchOrder, searchOperator, searchFilter, searchText)`
  * **Add New People Profile** [`user`, `plugin`]: `CrispClient.websitePeople.addNewPeopleProfile(websiteID, peopleProfile)`
  * **Check If People Profile Exists** [`user`, `plugin`]: `CrispClient.websitePeople.checkPeopleProfileExists(websiteID, peopleID)`
  * **Get People Profile** [`user`, `plugin`]: `CrispClient.websitePeople.getPeopleProfile(websiteID, peopleID)`
  * **Save People Profile** [`user`, `plugin`]: `CrispClient.websitePeople.savePeopleProfile(websiteID, peopleID, peopleProfile)`
  * **Update People Profile** [`user`, `plugin`]: `CrispClient.websitePeople.updatePeopleProfile(websiteID, peopleID, peopleProfile)`
  * **Remove People Profile** [`user`, `plugin`]: `CrispClient.websitePeople.removePeopleProfile(websiteID, peopleID)`
  * **List People Conversations** [`user`, `plugin`]: `CrispClient.websitePeople.listPeopleConversations(websiteID, peopleID, pageNumber)`
  * **List People Campaigns** [`user`]: `CrispClient.websitePeople.listPeopleCampaigns(websiteID, peopleID, pageNumber)`
  + **Add A People Event** [`user`, `plugin`]: `CrispClient.websitePeople.addPeopleEvent(websiteID, peopleID, peopleEvent)`
  + **List People Events** [`user`, `plugin`]: `CrispClient.websitePeople.listPeopleEvents(websiteID, peopleID, pageNumber)`
  + **Get People Data** [`user`, `plugin`]: `CrispClient.websitePeople.getPeopleData(websiteID, peopleID)`
  + **Save People Data** [`user`, `plugin`]: `CrispClient.websitePeople.savePeopleData(websiteID, peopleID, peopleData)`
  + **Get People Subscription Status** [`user`, `plugin`]: `CrispClient.websitePeople.getPeopleSubscriptionStatus(websiteID, peopleID)`
  + **Update People Subscription Status** [`user`, `plugin`]: `CrispClient.websitePeople.updatePeopleSubscriptionStatus(websiteID, peopleID, peopleSubscription)`
  * **Export People Profiles** [`user`]: `CrispClient.websitePeople.exportPeopleProfiles(websiteID)`
  * **Import People Profiles** [`user`]: `CrispClient.websitePeople.importPeopleProfiles(websiteID, profileImportSetup)`

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
  * **Save A Campaign Template** [`user`]: `CrispClient.websiteCampaign.saveCampaignTemplate(websiteID, templateID, template)`
  * **Update A Campaign Template** [`user`]: `CrispClient.websiteCampaign.updateCampaignTemplate(websiteID, templateID, template)`
  * **Remove A Campaign Template** [`user`]: `CrispClient.websiteCampaign.removeCampaignTemplate(websiteID, templateID)`

* **Website Campaign**
  * **Create A New Campaign** [`user`]: `CrispClient.websiteCampaign.createNewCampaign(websiteID, campaignType, campaignName)`
  * **Check If Campaign Exists** [`user`]: `CrispClient.websiteCampaign.checkCampaignExists(websiteID, campaignID)`
  * **Get A Campaign** [`user`]: `CrispClient.websiteCampaign.getCampaign(websiteID, campaignID)`
  * **Save A Campaign** [`user`]: `CrispClient.websiteCampaign.saveCampaign(websiteID, campaignID, campaign)`
  * **Update A Campaign** [`user`]: `CrispClient.websiteCampaign.updateCampaign(websiteID, campaignID, campaign)`
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
