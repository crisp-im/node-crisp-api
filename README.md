# Crisp API Wrapper

[![Test and Build](https://github.com/crisp-im/node-crisp-api/workflows/Test%20and%20Build/badge.svg?branch=master)](https://github.com/crisp-im/node-crisp-api/actions?query=workflow%3A%22Test+and+Build%22) [![NPM](https://img.shields.io/npm/v/crisp-api.svg)](https://www.npmjs.com/package/crisp-api) [![Downloads](https://img.shields.io/npm/dt/crisp-api.svg)](https://www.npmjs.com/package/crisp-api)

The Crisp API Node wrapper. Authenticate, send messages, fetch conversations, access your agent accounts from your JavaScript code.

Copyright 2021 Crisp IM SARL. See LICENSE for copying information.

* **📝 Implements**: [REST API Reference (V1)](https://docs.crisp.chat/references/rest-api/v1/) at revision: 30/11/2021
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

All methods that you will most likely need when building a Crisp integration are prefixed with a star symbol (⭐).

**⚠️ Note that, depending on your authentication token tier, which is either `user` or `plugin`, you may not be allowed to use all methods from the library. When in doubt, refer to the library method descriptions below. Most likely, you are using a `plugin` token.**

### Website

* **Website Conversations**
  * **⭐ List Conversations** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-conversations)
    * `CrispClient.website.listConversations(websiteID, pageNumber)`
  * **List Suggested Conversation Segments** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-suggested-conversation-segments)
    * `CrispClient.website.listSuggestedConversationSegments(websiteID, pageNumber)`
  * **Delete Suggested Conversation Segment** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#delete-suggested-conversation-segment)
    * `CrispClient.website.deleteSuggestedConversationSegment(websiteID, segment)`
  * **List Suggested Conversation Data Keys** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-suggested-conversation-data-keys)
    * `CrispClient.website.listSuggestedConversationDataKeys(websiteID, pageNumber)`
  * **Delete Suggested Conversation Data Key** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#delete-suggested-conversation-data-key)
    * `CrispClient.website.deleteSuggestedConversationDataKey(websiteID, key)`

* **Website Conversation**
  * **⭐ Create A New Conversation** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#create-a-new-conversation)
    * `CrispClient.website.createNewConversation(websiteID)`
  * **Check If Conversation Exists** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#check-if-conversation-exists)
    * `CrispClient.website.checkConversationExists(websiteID, sessionID)`
  * **⭐ Get A Conversation** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-a-conversation)
    * `CrispClient.website.getConversation(websiteID, sessionID)`
  * **Remove A Conversation** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#remove-a-conversation)
    * `CrispClient.website.removeConversation(websiteID, sessionID)`
  * **Initiate A Conversation With Existing Session** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#initiate-a-conversation-with-existing-session)
    * `CrispClient.website.initiateConversationWithExistingSession(websiteID, sessionID)`
  * **⭐ Get Messages In Conversation** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-messages-in-conversation)
    * `CrispClient.website.getMessagesInConversation(websiteID, sessionID, timestampBefore)`
  * **⭐ Send A Message In Conversation** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#send-a-message-in-conversation)
    * `CrispClient.website.sendMessageInConversation(websiteID, sessionID, message)`
  * **Get A Message In Conversation** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-a-message-in-conversation)
    * `CrispClient.website.getMessageInConversation(websiteID, sessionID, fingerprint)`
  * **Update A Message In Conversation** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#update-a-message-in-conversation)
    * `CrispClient.website.updateMessageInConversation(websiteID, sessionID, fingerprint, content)`
  * **Compose A Message In Conversation** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#compose-a-message-in-conversation)
    * `CrispClient.website.composeMessageInConversation(websiteID, sessionID, compose)`
  * **⭐ Mark Messages As Read In Conversation** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#mark-messages-as-read-in-conversation)
    * `CrispClient.website.markMessagesReadInConversation(websiteID, sessionID, read)`
  * **⭐ Mark Messages As Delivered In Conversation** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#mark-messages-as-delivered-in-conversation)
    * `CrispClient.website.markMessagesDeliveredInConversation(websiteID, sessionID, delivered)`
  * **Update Conversation Open State** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#update-conversation-open-state)
    * `CrispClient.website.updateConversationOpenState(websiteID, sessionID, opened)`
  * **⭐ Get Conversation Routing Assign** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-conversation-routing-assign)
    * `CrispClient.website.getConversationRoutingAssign(websiteID, sessionID)`
  * **⭐ Assign Conversation Routing** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#assign-conversation-routing)
    * `CrispClient.website.assignConversationRouting(websiteID, sessionID, assign)`
  * **⭐ Get Conversation Metas** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-conversation-metas)
    * `CrispClient.website.getConversationMetas(websiteID, sessionID)`
  * **⭐ Update Conversation Metas** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#update-conversation-metas)
    * `CrispClient.website.updateConversationMetas(websiteID, sessionID, metas)`
  * **Get An Original Message In Conversation** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-an-original-message-in-conversation)
    * `CrispClient.website.getOriginalMessageInConversation(websiteID, sessionID, originalID)`
  * **List Conversation Pages** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-conversation-pages)
    * `CrispClient.website.listConversationPages(websiteID, sessionID, pageNumber)`
  * **List Conversation Events** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-conversation-events)
    * `CrispClient.website.listConversationEvents(websiteID, sessionID, pageNumber)`
  * **Get Conversation State** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-conversation-state)
    * `CrispClient.website.getConversationState(websiteID, sessionID)`
  * **⭐ Change Conversation State** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#change-conversation-state)
    * `CrispClient.website.changeConversationState(websiteID, sessionID, state)`
  * **Get Conversation Participants** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-conversation-participants)
    * `CrispClient.website.getConversationParticipants(websiteID, sessionID)`
  * **Save Conversation Participants** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#save-conversation-participants)
    * `CrispClient.website.saveConversationParticipants(websiteID, sessionID, participants)`
  * **Get Block Status For Conversation** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-block-status-for-conversation)
    * `CrispClient.website.getBlockStatusForConversation(websiteID, sessionID)`
  * **Block Incoming Messages For Conversation** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#block-incoming-messages-for-conversation)
    * `CrispClient.website.blockIncomingMessagesForConversation(websiteID, sessionID, blocked)`
  * **Request Email Transcript For Conversation** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#request-email-transcript-for-conversation)
    * `CrispClient.website.requestEmailTranscriptForConversation(websiteID, sessionID, to, email)`
  * **Request Chatbox Binding Purge For Conversation** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#request-chatbox-binding-purge-for-conversation)
    * `CrispClient.website.requestChatboxBindingPurgeForConversation(websiteID, sessionID)`
  * **List Browsing Sessions For Conversation** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-browsing-sessions-for-conversation)
    * `CrispClient.website.listBrowsingSessionsForConversation(websiteID, sessionID)`
  * **Initiate Browsing Session For Conversation** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#initiate-browsing-session-for-conversation)
    * `CrispClient.website.initiateBrowsingSessionForConversation(websiteID, sessionID)`
  * **Send Action To An Existing Browsing Session** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#send-action-to-an-existing-browsing-session)
    * `CrispClient.website.sendActionToExistingBrowsingSession(websiteID, sessionID, browsingID, action)`
  * **Assist Existing Browsing Session** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#assist-an-existing-browsing-session)
    * `CrispClient.website.assistExistingBrowsingSession(websiteID, sessionID, browsingID, assist)`
  * **Initiate New Call Session For Conversation** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#initiate-new-call-session-for-conversation)
    * `CrispClient.website.initiateNewCallSessionForConversation(websiteID, sessionID)`
  * **Get Ongoing Call Session For Conversation** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-ongoing-call-session-for-conversation)
    * `CrispClient.website.getOngoingCallSessionForConversation(websiteID, sessionID)`
  * **Abort Ongoing Call Session For Conversation** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#abort-ongoing-call-session-for-conversation)
    * `CrispClient.website.abortOngoingCallSessionForConversation(websiteID, sessionID, callID)`
  * **Transmit Signaling On Ongoing Call Session** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#transmit-signaling-on-ongoing-call-session)
    * `CrispClient.website.transmitSignalingOnOngoingCallSession(websiteID, sessionID, callID, payload)`
  * **Deliver Widget Button Action For Conversation** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#deliver-widget-button-action-for-conversation)
    * `CrispClient.website.deliverWidgetButtonActionForConversation(websiteID, sessionID, pluginID, sectionID, itemID, data, value)`
  * **Deliver Widget Data Fetch Action For Conversation** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#deliver-widget-data-action-for-conversation)
    * `CrispClient.website.deliverWidgetDataFetchActionForConversation(websiteID, sessionID, pluginID, sectionID, itemID, data)`
  * **Deliver Widget Data Edit Action For Conversation** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#deliver-widget-data-action-for-conversation)
    * `CrispClient.website.deliverWidgetDataEditActionForConversation(websiteID, sessionID, pluginID, sectionID, itemID, value)`
  * **Schedule A Reminder For Conversation** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#schedule-a-reminder-for-conversation)
    * `CrispClient.website.scheduleReminderForConversation(websiteID, sessionID, date, note)`

* **Website People** _(these are your end-users)_
  * **Get People Statistics** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-people-statistics)
    * `CrispClient.website.getPeopleStatistics(websiteID)`
  * **List Suggested People Segments** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-suggested-people-segments)
    * `CrispClient.website.listSuggestedPeopleSegments(websiteID, pageNumber)`
  * **Delete Suggested People Segment** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#delete-suggested-people-segment)
    * `CrispClient.website.deleteSuggestedPeopleSegment(websiteID, segment)`
  * **List Suggested People Data Keys** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-suggested-people-data-keys/)
    * `CrispClient.website.listSuggestedPeopleDataKeys(websiteID, pageNumber)`
  * **Delete Suggested People Data Key** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#delete-suggested-people-data-key)
    * `CrispClient.website.deleteSuggestedPeopleDataKey(websiteID, key)`
  * **List Suggested People Events** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-suggested-people-events)
    * `CrispClient.website.listSuggestedPeopleEvents(websiteID, pageNumber)`
  * **Delete Suggested People Event** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#delete-suggested-people-event)
    * `CrispClient.website.deleteSuggestedPeopleEvent(websiteID, text)`
  * **⭐ List People Profiles** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-people-profiles)
    * `CrispClient.website.listPeopleProfiles(websiteID, pageNumber, searchField, searchOrder, searchOperator, searchFilter, searchText)`
  * **⭐ Add New People Profile** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#add-new-people-profile)
    * `CrispClient.website.addNewPeopleProfile(websiteID, peopleProfile)`
  * **⭐ Check If People Profile Exists** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#check-if-people-profile-exists)
    * `CrispClient.website.checkPeopleProfileExists(websiteID, peopleID)`
  * **⭐ Get People Profile** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-people-profile)
    * `CrispClient.website.getPeopleProfile(websiteID, peopleID)`
  * **⭐ Save People Profile** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#save-people-profile)
    * `CrispClient.website.savePeopleProfile(websiteID, peopleID, peopleProfile)`
  * **⭐ Update People Profile** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#update-people-profile)
    * `CrispClient.website.updatePeopleProfile(websiteID, peopleID, peopleProfile)`
  * **⭐ Remove People Profile** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#remove-people-profile)
    * `CrispClient.website.removePeopleProfile(websiteID, peopleID)`
  * **List People Conversations** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-people-conversations)
    * `CrispClient.website.listPeopleConversations(websiteID, peopleID, pageNumber)`
  * **List People Campaigns** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-people-campaigns)
    * `CrispClient.website.listPeopleCampaigns(websiteID, peopleID, pageNumber)`
  * **Add A People Event** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#add-a-people-event)
    * `CrispClient.website.addPeopleEvent(websiteID, peopleID, peopleEvent)`
  * **List People Events** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-people-events)
    * `CrispClient.website.listPeopleEvents(websiteID, peopleID, pageNumber)`
  * **Get People Data** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-people-data)
    * `CrispClient.website.getPeopleData(websiteID, peopleID)`
  * **Save People Data** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#save-people-data)
    * `CrispClient.website.savePeopleData(websiteID, peopleID, peopleData)`
  * **Update People Data** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#update-people-data)
    * `CrispClient.website.updatePeopleData(websiteID, peopleID, peopleData)`
  * **Get People Subscription Status** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-people-subscription-status)
    * `CrispClient.website.getPeopleSubscriptionStatus(websiteID, peopleID)`
  * **Update People Subscription Status** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#update-people-subscription-status)
    * `CrispClient.website.updatePeopleSubscriptionStatus(websiteID, peopleID, peopleSubscription)`
  * **Export People Profiles** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#export-people-profiles)
    * `CrispClient.website.exportPeopleProfiles(websiteID)`
  * **Import People Profiles** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#import-people-profiles)
    * `CrispClient.website.importPeopleProfiles(websiteID, profileImportSetup)`

_👉 Notice: The `peopleID` argument can be an email or the `peopleID`._

* **Website Base**
  * **Check If Website Exists** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#check-if-website-exists)
    * `CrispClient.website.checkWebsiteExists(domain)`
  * **Create Website** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#create-website)
    * `CrispClient.website.createWebsite(websiteData)`
  * **Get A Website** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-a-website)
    * `CrispClient.website.getWebsite(websiteID)`
  * **Delete A Website** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#delete-a-website)
    * `CrispClient.website.deleteWebsite(websiteID, verify)`

* **Website Settings**
  * **Get Website Settings** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-website-settings)
    * `CrispClient.website.getWebsiteSettings(websiteID)`
  * **Update Website Settings** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#update-website-settings)
    * `CrispClient.website.updateWebsiteSettings(websiteID, settings)`

* **Website Operator**
  * **List Website Operators** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-website-operators)
    * `CrispClient.website.listWebsiteOperators(websiteID)`
  * **List Last Active Website Operators** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-last-active-website-operators)
    * `CrispClient.website.listLastActiveWebsiteOperators(websiteID)`
  * **Flush Last Active Website Operators** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#flush-last-active-website-operators)
    * `CrispClient.website.flushLastActiveWebsiteOperators(websiteID)`
  * **Send Email To Website Operators** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#send-email-to-website-operators)
    * `CrispClient.website.sendEmailToWebsiteOperators(websiteID, emailData)`
  * **Get A Website Operator** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-a-website-operator)
    * `CrispClient.website.getWebsiteOperator(websiteID, userID)`
  * **Invite A Website Operator** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#invite-a-website-operator)
    * `CrispClient.website.inviteWebsiteOperator(websiteID, email, role, verify)`
  * **Change Operator Membership** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#change-operator-membership)
    * `CrispClient.website.changeOperatorMembership(websiteID, userID, role, title)`
  * **Unlink Operator From Website** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#unlink-operator-from-website)
    * `CrispClient.website.unlinkOperatorFromWebsite(websiteID, userID)`

* **Website Visitors**
  * **Count Visitors** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#count-visitors)
    * `CrispClient.website.countVisitors(websiteID)`
  * **List Visitors** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-visitors)
    * `CrispClient.website.listVisitors(websiteID, pageNumber)`
  * **Pinpoint Visitors On A Map** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#pinpoint-visitors-on-a-map)
    * `CrispClient.website.pinpointVisitorsOnMap(websiteID, centerLongitude, centerLatitude, centerRadius)`
  * **Get Session Identifier From Token** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-session-identifier-from-token)
    * `CrispClient.website.getSessionIdentifierFromToken(websiteID, tokenID)`
  * **Count Blocked Visitors** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#count-blocked-visitors/)
    * `CrispClient.website.countBlockedVisitors(websiteID)`
  * **Count Blocked Visitors In Rule** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#count-blocked-visitors-in-rule)
    * `CrispClient.website.countBlockedVisitorsInRule(websiteID, rule)`
  * **Clear Blocked Visitors In Rule** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#clear-blocked-visitors-in-rule)
    * `CrispClient.website.clearBlockedVisitorsInRule(websiteID, rule)`

* **Website Availability**
  * **Get Website Availability Status** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-website-availability-status)
    * `CrispClient.website.getWebsiteAvailabilityStatus(websiteID)`
  * **List Website Operator Availabilities** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-website-operator-availabilities)
    * `CrispClient.website.listWebsiteOperatorAvailabilities(websiteID)`

* **Website Analytics**
  * **Acquire Analytics Points** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#acquire-analytics-points)
    * `CrispClient.website.acquireAnalyticsPoints(websiteID, pointType, pointMetric, dateFrom, dateTo, dateSplit, classifier, filterPrimary, filterSecondary, filterTertiary)`
  * **List Analytics Filters** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-analytics-filters)
    * `CrispClient.website.listAnalyticsFilters(websiteID, pageNumber, pointType, pointMetric, dateFrom, dateTo)`
  * **List Analytics Classifiers** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-analytics-classifiers)
    * `CrispClient.website.listAnalyticsClassifiers(websiteID, pageNumber, pointType, pointMetric, dateFrom, dateTo)`

* **Website Batch**
  * **Batch Resolve Conversations** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#batch-resolve-items)
    * `CrispClient.website.batchResolveConversations(websiteID, sessions)`
  * **Batch Read Conversations** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#batch-read-items)
    * `CrispClient.website.batchReadConversations(websiteID, sessions)`
  * **Batch Remove Conversations** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#batch-remove-items)
    * `CrispClient.website.batchRemoveConversations(websiteID, sessions)`
  * **Batch Remove People** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#batch-remove-items)
    * `CrispClient.website.batchRemovePeople(websiteID, people)`

* **Website Verify**
  * **Get Verify Settings** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-verify-settings)
    * `CrispClient.website.getVerifySettings(websiteID)`
  * **Update Verify Settings** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#update-verify-settings)
    * `CrispClient.website.updateVerifySettings(websiteID, settings)`
  * **Get Verify Key** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-verify-key)
    * `CrispClient.website.getVerifyKey(websiteID)`
  * **Roll Verify Key** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#roll-verify-key)
    * `CrispClient.website.rollVerifyKey(websiteID)`

* **Website Campaigns**
  * **List Campaigns** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-campaigns)
    * `CrispClient.website.listCampaigns(websiteID, pageNumber)`
  * **List Campaign Tags** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-campaign-tags)
    * `CrispClient.website.listCampaignTags(websiteID)`
  * **List Campaign Templates** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-campaign-templates)
    * `CrispClient.website.listCampaignTemplates(websiteID, pageNumber)`
  * **Create A New Campaign Template** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#create-a-new-campaign-template)
    * `CrispClient.website.createNewCampaignTemplate(websiteID, templateFormat, templateName)`
  * **Check If Campaign Template Exists** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#check-if-campaign-template-exists)
    * `CrispClient.website.checkCampaignTemplateExists(websiteID, templateID)`
  * **Get A Campaign Template** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-a-campaign-template)
    * `CrispClient.website.getCampaignTemplate(websiteID, templateID)`
  * **Save A Campaign Template** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#save-a-campaign-template)
    * `CrispClient.website.saveCampaignTemplate(websiteID, templateID, template)`
  * **Update A Campaign Template** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#update-a-campaign-template)
    * `CrispClient.website.updateCampaignTemplate(websiteID, templateID, template)`
  * **Remove A Campaign Template** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#remove-a-campaign-template)
    * `CrispClient.website.removeCampaignTemplate(websiteID, templateID)`

* **Website Campaign**
  * **Create A New Campaign** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#create-a-new-campaign)
    * `CrispClient.website.createNewCampaign(websiteID, campaignType, campaignName)`
  * **Check If Campaign Exists** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#check-if-campaign-exists)
    * `CrispClient.website.checkCampaignExists(websiteID, campaignID)`
  * **Get A Campaign** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-a-campaign)
    * `CrispClient.website.getCampaign(websiteID, campaignID)`
  * **Save A Campaign** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#save-a-campaign)
    * `CrispClient.website.saveCampaign(websiteID, campaignID, campaign)`
  * **Update A Campaign** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#update-a-campaign)
    * `CrispClient.website.updateCampaign(websiteID, campaignID, campaign)`
  * **Remove A Campaign** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#remove-a-campaign)
    * `CrispClient.website.removeCampaign(websiteID, campaignID)`
  * **Dispatch A Campaign** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#dispatch-a-campaign)
    * `CrispClient.website.dispatchCampaign(websiteID, campaignID)`
  * **Resume A Campaign** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#resume-a-campaign)
    * `CrispClient.website.resumeCampaign(websiteID, campaignID)`
  * **Pause A Campaign** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#pause-a-campaign)
    * `CrispClient.website.pauseCampaign(websiteID, campaignID)`
  * **Test A Campaign** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#test-a-campaign)
    * `CrispClient.website.testCampaign(websiteID, campaignID)`
  * **List Campaign Recipients** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-campaign-recipients)
    * `CrispClient.website.listCampaignRecipients(websiteID, campaignID, pageNumber)`
  * **List Campaign Statistics** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-campaign-statistics)
    * `CrispClient.website.listCampaignStatistics(websiteID, campaignID, action, pageNumber)`

### Plugin

* **Plugin Connect**
  * **⭐ Get Connect Account** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-connect-account)
    * `CrispClient.plugin.getConnectAccount()`
  * **⭐ Check Connect Session Validity** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#check-connect-session-validity)
    * `CrispClient.plugin.checkConnectSessionValidity()`
  * **⭐ List All Connect Websites** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-all-connect-websites)
    * `CrispClient.plugin.listAllConnectWebsites(pageNumber, filterConfigured, dateSince)`

* **Plugin Subscription**
  * **List All Active Subscriptions** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-all-active-subscriptions)
    * `CrispClient.plugin.listAllActiveSubscriptions()`
  * **List Subscriptions For A Website** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-subscriptions-for-a-website)
    * `CrispClient.plugin.listSubscriptionsForWebsite(websiteID)`
  * **Get Subscription Details** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-subscription-details)
    * `CrispClient.plugin.getSubscriptionDetails(websiteID, pluginID)`
  * **Subscribe Website To Plugin** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#subscribe-website-to-plugin)
    * `CrispClient.plugin.subscribeWebsiteToPlugin(websiteID, pluginID)`
  * **Unsubscribe Plugin From Website** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#unsubscribe-plugin-from-website)
    * `CrispClient.plugin.unsubscribePluginFromWebsite(websiteID, pluginID)`
  * **Get Subscription Settings** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#get-subscription-settings)
    * `CrispClient.plugin.getSubscriptionSettings(websiteID, pluginID)`
  * **Save Subscription Settings** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#save-subscription-settings)
    * `CrispClient.plugin.saveSubscriptionSettings(websiteID, pluginID, settings)`
  * **Update Subscription Settings** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#update-subscription-settings)
    * `CrispClient.plugin.updateSubscriptionSettings(websiteID, pluginID, settings)`
  * **Forward Plugin Payload To Channel** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#forward-plugin-payload-to-channel)
    * `CrispClient.plugin.forwardPluginPayloadToChannel(websiteID, pluginID, payload)`
  * **Dispatch Plugin Event** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#dispatch-plugin-event)
    * `CrispClient.plugin.dispatchPluginEvent(websiteID, pluginID, payload)`

### Media

* **Media Animation**
  * **List Animation Medias** [`user`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#list-animation-medias)
    * `CrispClient.media.listAnimationMedias(pageNumber, listID, searchQuery)`

### Bucket

* **Bucket URL**
  * **Generate Bucket URL** [`user`, `plugin`]: [Reference](https://docs.crisp.chat/references/rest-api/v1/#bucket-url)
    * `CrispClient.bucket.generateBucketURL(data)`

## Realtime Events

You can bind to realtime events from Crisp, in order to get notified of incoming messages and updates in websites.

You won't receive any event if you don't explicitly subscribe to realtime events using `CrispClient.on()`, as the library doesn't connect to the realtime backend automatically.

Available events are listed below:

* **Session Events**: [Reference](https://docs.crisp.chat/references/rtm-api/v1/#session-events)
  * **Session Update Availability** [`user`, `plugin`]:
    * `session:update_availability`
  * **Session Update Verify** [`user`, `plugin`]:
    * `session:update_verify`
  * **Session Request Initiated** [`user`, `plugin`]:
    * `session:request:initiated`
  * **Session Set Email** [`user`, `plugin`]:
    * `session:set_email`
  * **Session Set Phone** [`user`, `plugin`]:
    * `session:set_phone`
  * **Session Set Address** [`user`, `plugin`]:
    * `session:set_address`
  * **Session Set Avatar** [`user`, `plugin`]:
    * `session:set_avatar`
  * **Session Set Nickname** [`user`, `plugin`]:
    * `session:set_nickname`
  * **Session Set Data** [`user`, `plugin`]:
    * `session:set_data`
  * **Session Sync Pages** [`user`, `plugin`]:
    * `session:sync:pages`
  * **Session Sync Events** [`user`, `plugin`]: 
    * `session:sync:events`
  * **Session Sync Capabilities** [`user`, `plugin`]:
    * `session:sync:capabilities`
  * **Session Sync Geolocation** [`user`, `plugin`]:
    * `session:sync:geolocation`
  * **Session Sync System** [`user`, `plugin`]:
    * `session:sync:system`
  * **Session Sync Network** [`user`, `plugin`]:
    * `session:sync:network`
  * **Session Sync Timezone** [`user`, `plugin`]:
    * `session:sync:timezone`
  * **Session Sync Locales** [`user`, `plugin`]:
    * `session:sync:locales`
  * **Session Sync Rating** [`user`, `plugin`]:
    * `session:sync:rating`
  * **Session Set State** [`user`, `plugin`]:
    * `session:set_state`
  * **Session Set Block** [`user`, `plugin`]:
    * `session:set_block`
  * **Session Set Segments** [`user`, `plugin`]:
    * `session:set_segments`
  * **Session Set Opened** [`user`, `plugin`]:
    * `session:set_opened`
  * **Session Set Closed** [`user`, `plugin`]:
    * `session:set_closed`
  * **Session Set Participants** [`user`, `plugin`]:
    * `session:set_participants`
  * **Session Set Mentions** [`user`, `plugin`]:
    * `session:set_mentions`
  * **Session Set Routing** [`user`, `plugin`]:
    * `session:set_routing`
  * **Session Removed** [`user`, `plugin`]:
    * `session:removed`

* **Message Events**: [Reference](https://docs.crisp.chat/references/rtm-api/v1/#message-events)
  * **Message Updated** [`user`, `plugin`]:
    * `message:updated`
  * **Message Send** [`user`, `plugin`]:
    * `message:send`
  * **Message Received** [`user`, `plugin`]:
    * `message:received`
  * **Message Compose Send** [`user`, `plugin`]:
    * `message:compose:send`
  * **Message Compose Receive** [`user`, `plugin`]:
    * `message:compose:receive`
  * **Message Acknowledge Read Send** [`user`, `plugin`]:
    * `message:acknowledge:read:send`
  * **Message Acknowledge Read Received** [`user`, `plugin`]:
    * `message:acknowledge:read:received`
  * **Message Acknowledge Delivered** [`user`, `plugin`]:
    * `message:acknowledge:delivered`
  * **Message Notify Unread Send** [`user`, `plugin`]:
    * `message:notify:unread:send`
  * **Message Notify Unread Received** [`user`, `plugin`]:
    * `message:notify:unread:received`

* **People Events**: [Reference](https://docs.crisp.chat/references/rtm-api/v1/#people-events)
  * **People Profile Created** [`user`, `plugin`]:
    * `people:profile:created`
  * **People Profile Updated** [`user`, `plugin`]:
    * `people:profile:updated`
  * **People Profile Removed** [`user`, `plugin`]:
    * `people:profile:removed`
  * **People Bind Session** [`user`, `plugin`]:
    * `people:bind:session`
  * **People Sync Profile** [`user`, `plugin`]:
    * `people:sync:profile`
  * **People Import Progress** [`user`]:
    * `people:import:progress`
  * **People Import Done** [`user`]:
    * `people:import:done`

* **Campaign Events**: [Reference](https://docs.crisp.chat/references/rtm-api/v1/#campaign-events)
  * **Campaign Progress** [`user`]:
    * `campaign:progress`
  * **Campaign Dispatched** [`user`]:
    * `campaign:dispatched`
  * **Campaign Running** [`user`]:
    * `campaign:running`

* **Browsing Events**: [Reference](https://docs.crisp.chat/references/rtm-api/v1/#browsing-events)
  * **Browsing Request Initiated** [`user`, `plugin`]:
    * `browsing:request:initiated`
  * **Browsing Request Rejected** [`user`, `plugin`]:
    * `browsing:request:rejected`

* **Call Events**: [Reference](https://docs.crisp.chat/references/rtm-api/v1/#call-events)
  * **Call Request Initiated** [`user`, `plugin`]:
    * `call:request:initiated`
  * **Call Request Rejected** [`user`, `plugin`]:
    * `call:request:rejected`

* **Widget Events**: [Reference](https://docs.crisp.chat/references/rtm-api/v1/#widget-events)
  * **Widget Action Processed** [`user`]:
    * `widget:action:processed`

* **Status Events**: [Reference](https://docs.crisp.chat/references/rtm-api/v1/#status-events)
  * **Status Health Changed** [`user`]:
    * `status:health:changed`

* **Website Events**: [Reference](https://docs.crisp.chat/references/rtm-api/v1/#website-events)
  * **Website Update Visitors Count** [`user`, `plugin`]:
    * `website:update_visitors_count`
  * **Website Update Operators Availability** [`user`, `plugin`]:
    * `website:update_operators_availability`
  * **Website Users Available** [`user`, `plugin`]: 
    * `website:users:available`

* **Bucket Events**: [Reference](https://docs.crisp.chat/references/rtm-api/v1/#bucket-events)
  * **Bucket URL Upload Generated** [`user`, `plugin`]:
    * `bucket:url:upload:generated`
  * **Bucket URL Avatar Generated** [`user`, `plugin`]:
    * `bucket:url:avatar:generated`
  * **Bucket URL Website Generated** [`user`, `plugin`]:
    * `bucket:url:website:generated`
  * **Bucket URL Campaign Generated** [`user`, `plugin`]:
    * `bucket:url:campaign:generated`
  * **Bucket URL Helpdesk Generated** [`user`, `plugin`]:
    * `bucket:url:helpdesk:generated`
  * **Bucket URL Status Generated** [`user`, `plugin`]:
    * `bucket:url:status:generated`
  * **Bucket URL Processing Generated** [`user`, `plugin`]:
    * `bucket:url:processing:generated`

* **Media Events**: [Reference](https://docs.crisp.chat/references/rtm-api/v1/#media-events)
  * **Media Animation Listed** [`user`]:
    * `media:animation:listed`

* **Email Events**: [Reference](https://docs.crisp.chat/references/rtm-api/v1/#email-events)
  * **Email Subscribe** [`user`, `plugin`]:
    * `email:subscribe`
  * **Email Track View** [`user`, `plugin`]:
    * `email:track:view`

* **Plugin Events**: [Reference](https://docs.crisp.chat/references/rtm-api/v1/#plugin-events)
  * **Plugin Channel** [`user`, `plugin`]: 
    * `plugin:channel`
  * **Plugin Event** [`user`, `plugin`]:
    * `plugin:event`
  * **Plugin Settings Saved** [`user`, `plugin`]: 
    * `plugin:settings:saved`
