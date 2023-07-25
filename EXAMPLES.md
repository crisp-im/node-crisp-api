https://docs.crisp.chat/references/rest-api/v1/#list-conversations

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var pageNumber = 1;

CrispClient.website.listConversations(websiteID, pageNumber);

=========================

https://docs.crisp.chat/references/rest-api/v1/#list-suggested-conversation-segments

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var pageNumber = 1;

CrispClient.website.listSuggestedConversationSegments(websiteID, pageNumber);

=========================

https://docs.crisp.chat/references/rest-api/v1/#delete-suggested-conversation-segment

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

var segment = "bug";

CrispClient.website.deleteSuggestedConversationSegment(websiteID, segment);

=========================

https://docs.crisp.chat/references/rest-api/v1/#list-suggested-conversation-data-keys

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var pageNumber = 1;

CrispClient.website.listSuggestedConversationDataKeys(websiteID, pageNumber);

=========================

https://docs.crisp.chat/references/rest-api/v1/#delete-suggested-conversation-data-key

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

var key = "price";

CrispClient.website.deleteSuggestedConversationDataKey(websiteID, key);

=========================

https://docs.crisp.chat/references/rest-api/v1/#create-a-new-conversation

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

CrispClient.website.createNewConversation(websiteID);

=========================

https://docs.crisp.chat/references/rest-api/v1/#check-if-conversation-exists

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";

CrispClient.website.checkConversationExists(websiteID, sessionID);

=========================

https://docs.crisp.chat/references/rest-api/v1/#get-a-conversation

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";

CrispClient.website.getConversation(websiteID, sessionID);

=========================

https://docs.crisp.chat/references/rest-api/v1/#remove-a-conversation

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";

CrispClient.website.removeConversation(websiteID, sessionID);

=========================

https://docs.crisp.chat/references/rest-api/v1/#initiate-a-conversation-with-existing-session

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";

CrispClient.website.initiateConversationWithExistingSession(websiteID, sessionID);

=========================

https://docs.crisp.chat/references/rest-api/v1/#get-messages-in-conversation

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";
var timestampBefore = 1641206011000;

CrispClient.website.getMessagesInConversation(websiteID, sessionID, timestampBefore);

=========================

https://docs.crisp.chat/references/rest-api/v1/#send-a-message-in-conversation

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";

var message = {
  "type": "text",
  "from": "operator",
  "origin": "chat",
  "content": "Hey there! Need help?"
};

CrispClient.website.sendMessageInConversation(websiteID, sessionID, message);

=========================

https://docs.crisp.chat/references/rest-api/v1/#get-a-message-in-conversation

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";
var fingerprint = 524653764345;

CrispClient.website.getMessageInConversation(websiteID, sessionID, fingerprint);

=========================

https://docs.crisp.chat/references/rest-api/v1/#update-a-message-in-conversation

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";
var fingerprint = 524653764345;

var content = "Hey there! Need help?";

CrispClient.website.updateMessageInConversation(websiteID, sessionID, fingerprint, content);

=========================

https://docs.crisp.chat/references/rest-api/v1/#remove-a-message-in-conversation

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";
var fingerprint = 524653764345;

CrispClient.website.removeMessageInConversation(websiteID, sessionID, fingerprint);

=========================

https://docs.crisp.chat/references/rest-api/v1/#compose-a-message-in-conversation

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";

var compose = {
  "type": "start",
  "from": "operator"
};

CrispClient.website.composeMessageInConversation(websiteID, sessionID, compose);

=========================

https://docs.crisp.chat/references/rest-api/v1/#mark-messages-as-read-in-conversation

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";

var read = {
  "from": "operator",
  "origin": "urn:crisp.im:slack:0",
  "fingerprints": [
    "5719231201"
  ]
};

CrispClient.website.markMessagesReadInConversation(websiteID, sessionID, read);

=========================

https://docs.crisp.chat/references/rest-api/v1/#mark-messages-as-delivered-in-conversation

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";

var delivered = {
  "from": "operator",
  "origin": "urn:crisp.im:slack:0",
  "fingerprints": [
    "5719231201"
  ]
};

CrispClient.website.markMessagesDeliveredInConversation(websiteID, sessionID, delivered);

=========================

https://docs.crisp.chat/references/rest-api/v1/#update-conversation-open-state

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";

var opened = true;

CrispClient.website.updateConversationOpenState(websiteID, sessionID, opened);

=========================

https://docs.crisp.chat/references/rest-api/v1/#get-conversation-routing-assign

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";

CrispClient.website.getConversationRoutingAssign(websiteID, sessionID);

=========================

https://docs.crisp.chat/references/rest-api/v1/#assign-conversation-routing

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";

var assign = {
  "assigned": {
    "user_id": "a4c32c68-be91-4e29-8a05-976e93abbe3f"
  }
};

CrispClient.website.assignConversationRouting(websiteID, sessionID, assign);

=========================

https://docs.crisp.chat/references/rest-api/v1/#get-conversation-metas

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";

CrispClient.website.getConversationMetas(websiteID, sessionID);

=========================

https://docs.crisp.chat/references/rest-api/v1/#update-conversation-metas

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";

var metas = {
  "nickname": "John Doe",
  "email": "john.doe@acme-inc.com",
  "segments": [
    "happy",
    "customer",
    "love"
  ],
  "data": {
    "type": "customer",
    "signup": "finished"
  }
};

CrispClient.website.updateConversationMetas(websiteID, sessionID, metas);

=========================

https://docs.crisp.chat/references/rest-api/v1/#get-an-original-message-in-conversation

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";
var originalID = "2325a3c0-9b47-4fc6-b00e-111b752e44cd";

CrispClient.website.getOriginalMessageInConversation(websiteID, sessionID, originalID);

=========================

https://docs.crisp.chat/references/rest-api/v1/#list-conversation-pages

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";
var pageNumber = 1;

CrispClient.website.listConversationPages(websiteID, sessionID, pageNumber);

=========================

https://docs.crisp.chat/references/rest-api/v1/#list-conversation-events

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";
var pageNumber = 1;

CrispClient.website.listConversationEvents(websiteID, sessionID, pageNumber);

=========================

https://docs.crisp.chat/references/rest-api/v1/#list-conversation-files

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";
var pageNumber = 1;

CrispClient.website.listConversationFiles(websiteID, sessionID, pageNumber);

=========================

https://docs.crisp.chat/references/rest-api/v1/#get-conversation-state

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";

CrispClient.website.getConversationState(websiteID, sessionID);

=========================

https://docs.crisp.chat/references/rest-api/v1/#change-conversation-state

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";

var state = "unresolved";

CrispClient.website.changeConversationState(websiteID, sessionID, state);

=========================

https://docs.crisp.chat/references/rest-api/v1/#get-conversation-participants

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";

CrispClient.website.getConversationParticipants(websiteID, sessionID);

=========================

https://docs.crisp.chat/references/rest-api/v1/#save-conversation-participants

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";

var participants = {
  "participants": [
    {
      "type": "email",
      "target": "jane.doe@acme-inc.com"
    }
  ]
};

CrispClient.website.saveConversationParticipants(websiteID, sessionID, participants);

=========================

https://docs.crisp.chat/references/rest-api/v1/#get-block-status-for-conversation

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";

CrispClient.website.getBlockStatusForConversation(websiteID, sessionID);

=========================

https://docs.crisp.chat/references/rest-api/v1/#block-incoming-messages-for-conversation

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";

var blocked = true;

CrispClient.website.blockIncomingMessagesForConversation(websiteID, sessionID, blocked);

=========================

https://docs.crisp.chat/references/rest-api/v1/#get-verify-status-for-conversation

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";

CrispClient.website.getVerifyStatusForConversation(websiteID, sessionID);

=========================

https://docs.crisp.chat/references/rest-api/v1/#update-verify-status-for-conversation

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";

var verified = true;

CrispClient.website.updateVerifyStatusForConversation(websiteID, sessionID, verified);

=========================

https://docs.crisp.chat/references/rest-api/v1/#request-email-transcript-for-conversation

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";

var email = {
  "to": "operator",
  "email": "valerian@crisp.chat"
};

CrispClient.website.requestEmailTranscriptForConversation(websiteID, sessionID, to, email);

=========================

https://docs.crisp.chat/references/rest-api/v1/#request-chatbox-binding-purge-for-conversation

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";

CrispClient.website.requestChatboxBindingPurgeForConversation(websiteID, sessionID);

=========================

https://docs.crisp.chat/references/rest-api/v1/#request-user-feedback-for-conversation

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";

CrispClient.website.requestUserFeedbackForConversation(websiteID, sessionID);

=========================

https://docs.crisp.chat/references/rest-api/v1/#list-browsing-sessions-for-conversation

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";

CrispClient.website.listBrowsingSessionsForConversation(websiteID, sessionID);

=========================

https://docs.crisp.chat/references/rest-api/v1/#initiate-browsing-session-for-conversation

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";

CrispClient.website.initiateBrowsingSessionForConversation(websiteID, sessionID);

=========================

https://docs.crisp.chat/references/rest-api/v1/#send-action-to-an-existing-browsing-session

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";
var browsingID = "browsing_05a9392d-ff3f-45e7-b021-1179c45668fa";

var action = "start";

CrispClient.website.sendActionToExistingBrowsingSession(websiteID, sessionID, browsingID, action);

=========================

https://docs.crisp.chat/references/rest-api/v1/#assist-an-existing-browsing-session

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";
var browsingID = "browsing_05a9392d-ff3f-45e7-b021-1179c45668fa";

var assist = {
  "action": "mouse",
  "mouse": {
    "x": 0,
    "y": 784
  }
};

CrispClient.website.assistExistingBrowsingSession(websiteID, sessionID, browsingID, assist);

=========================

https://docs.crisp.chat/references/rest-api/v1/#initiate-new-call-session-for-conversation

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";

var mode = "audio";

CrispClient.website.initiateNewCallSessionForConversation(websiteID, sessionID, mode);

=========================

https://docs.crisp.chat/references/rest-api/v1/#get-ongoing-call-session-for-conversation

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";

CrispClient.website.getOngoingCallSessionForConversation(websiteID, sessionID);

=========================

https://docs.crisp.chat/references/rest-api/v1/#abort-ongoing-call-session-for-conversation

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";
var callID = "call_35a0c062-72fa-4095-a2a0-f9911d47ee56";

CrispClient.website.abortOngoingCallSessionForConversation(websiteID, sessionID, callID);

=========================

https://docs.crisp.chat/references/rest-api/v1/#transmit-signaling-on-ongoing-call-session

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";
var callID = "call_35a0c062-72fa-4095-a2a0-f9911d47ee56";

var payload = {
  "type": "sdp",
  "payload": {}
};

CrispClient.website.transmitSignalingOnOngoingCallSession(websiteID, sessionID, callID, payload);

=========================

https://docs.crisp.chat/references/rest-api/v1/#deliver-widget-button-action-for-conversation

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";
var pluginID = "c64f3595-adee-425a-8d3a-89d47f7ed6bb";
var sectionID = "8f8d3041-6698-43b8-a559-ae93211e6292";
var itemID = "7631d7d8-4fe7-4ef8-9a36-31183dcd4785";

var value = {
  "section_id": "payments",
  "item_id": "refund_on_stripe",
  "data": {
    "invoice": "D-1929-X"
  }
};

CrispClient.website.deliverWidgetButtonActionForConversation(websiteID, sessionID, pluginID, sectionID, itemID, data, value);

=========================

https://docs.crisp.chat/references/rest-api/v1/#deliver-widget-data-action-for-conversation

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";
var pluginID = "c64f3595-adee-425a-8d3a-89d47f7ed6bb";
var sectionID = "8f8d3041-6698-43b8-a559-ae93211e6292";
var itemID = "7631d7d8-4fe7-4ef8-9a36-31183dcd4785";

var data = {
  "section_id": "payments",
  "item_id": "unpaid_balance",
  "action": "fetch",
  "data": {}
};

CrispClient.website.deliverWidgetDataFetchActionForConversation(websiteID, sessionID, pluginID, sectionID, itemID, data);

=========================

https://docs.crisp.chat/references/rest-api/v1/#deliver-widget-data-action-for-conversation

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";
var pluginID = "c64f3595-adee-425a-8d3a-89d47f7ed6bb";
var sectionID = "8f8d3041-6698-43b8-a559-ae93211e6292";
var itemID = "7631d7d8-4fe7-4ef8-9a36-31183dcd4785";

var value = {
  "section_id": "payments",
  "item_id": "unpaid_balance",
  "action": "fetch",
  "data": {}
};

CrispClient.website.deliverWidgetDataEditActionForConversation(websiteID, sessionID, pluginID, sectionID, itemID, value);

=========================

https://docs.crisp.chat/references/rest-api/v1/#schedule-a-reminder-for-conversation

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";

var note = {
  "date": "2018-05-29T09:00:00Z",
  "note": "Call this customer."
};

CrispClient.website.scheduleReminderForConversation(websiteID, sessionID, date, note);

=========================

https://docs.crisp.chat/references/rest-api/v1/#get-people-statistics

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

CrispClient.website.getPeopleStatistics(websiteID);

=========================

https://docs.crisp.chat/references/rest-api/v1/#list-suggested-people-segments

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var pageNumber = 1;

CrispClient.website.listSuggestedPeopleSegments(websiteID, pageNumber);

=========================

https://docs.crisp.chat/references/rest-api/v1/#delete-suggested-people-segment

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

var segment = "poweruser";

CrispClient.website.deleteSuggestedPeopleSegment(websiteID, segment);

=========================

https://docs.crisp.chat/references/rest-api/v1/#list-suggested-people-data-keys/

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var pageNumber = 1;

CrispClient.website.listSuggestedPeopleDataKeys(websiteID, pageNumber);

=========================

https://docs.crisp.chat/references/rest-api/v1/#delete-suggested-people-data-key

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

var key = "price";

CrispClient.website.deleteSuggestedPeopleDataKey(websiteID, key);

=========================

https://docs.crisp.chat/references/rest-api/v1/#list-suggested-people-events

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var pageNumber = 1;

CrispClient.website.listSuggestedPeopleEvents(websiteID, pageNumber);

=========================

https://docs.crisp.chat/references/rest-api/v1/#delete-suggested-people-event

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

var text = "Removed item from basket";

CrispClient.website.deleteSuggestedPeopleEvent(websiteID, text);

=========================

https://docs.crisp.chat/references/rest-api/v1/#list-people-profiles

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var pageNumber = 1;

CrispClient.website.listPeopleProfiles(websiteID, pageNumber, searchField, searchOrder, searchOperator, searchFilter, searchText);

=========================

https://docs.crisp.chat/references/rest-api/v1/#add-new-people-profile

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

var peopleProfile = {
  "email": "valerian@crisp.chat",
  "person": {
    "nickname": "Valerian Saliou"
  }
};

CrispClient.website.addNewPeopleProfile(websiteID, peopleProfile);

=========================

https://docs.crisp.chat/references/rest-api/v1/#check-if-people-profile-exists

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var peopleID = "c5a2f70c-f605-4648-b47f-8c39d4b03a50";

CrispClient.website.checkPeopleProfileExists(websiteID, peopleID);

=========================

https://docs.crisp.chat/references/rest-api/v1/#get-people-profile

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var peopleID = "c5a2f70c-f605-4648-b47f-8c39d4b03a50";

CrispClient.website.getPeopleProfile(websiteID, peopleID);

=========================

https://docs.crisp.chat/references/rest-api/v1/#save-people-profile

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var peopleID = "c5a2f70c-f605-4648-b47f-8c39d4b03a50";

var peopleProfile = {
  "email": "valerian@crisp.chat",
  "person": {
    "nickname": "Valerian Saliou"
  }
};

CrispClient.website.savePeopleProfile(websiteID, peopleID, peopleProfile);

=========================

https://docs.crisp.chat/references/rest-api/v1/#update-people-profile

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var peopleID = "c5a2f70c-f605-4648-b47f-8c39d4b03a50";

var peopleProfile = {
  "email": "valerian@crisp.chat",
  "person": {
    "nickname": "Valerian Saliou"
  }
};

CrispClient.website.updatePeopleProfile(websiteID, peopleID, peopleProfile);

=========================

https://docs.crisp.chat/references/rest-api/v1/#remove-people-profile

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var peopleID = "c5a2f70c-f605-4648-b47f-8c39d4b03a50";

CrispClient.website.removePeopleProfile(websiteID, peopleID);

=========================

https://docs.crisp.chat/references/rest-api/v1/#list-people-conversations

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var peopleID = "c5a2f70c-f605-4648-b47f-8c39d4b03a50";
var pageNumber = 1;

CrispClient.website.listPeopleConversations(websiteID, peopleID, pageNumber);

=========================

https://docs.crisp.chat/references/rest-api/v1/#list-people-campaigns

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var peopleID = "c5a2f70c-f605-4648-b47f-8c39d4b03a50";
var pageNumber = 1;

CrispClient.website.listPeopleCampaigns(websiteID, peopleID, pageNumber);

=========================

https://docs.crisp.chat/references/rest-api/v1/#add-a-people-event

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var peopleID = "c5a2f70c-f605-4648-b47f-8c39d4b03a50";

var peopleEvent = {
  "text": "Added item to basket",
  "data": {
    "price": 10.99,
    "currency": "USD"
  },
  "color": "red"
};

CrispClient.website.addPeopleEvent(websiteID, peopleID, peopleEvent);

=========================

https://docs.crisp.chat/references/rest-api/v1/#list-people-events

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var peopleID = "c5a2f70c-f605-4648-b47f-8c39d4b03a50";
var pageNumber = 1;

CrispClient.website.listPeopleEvents(websiteID, peopleID, pageNumber);

=========================

https://docs.crisp.chat/references/rest-api/v1/#get-people-data

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var peopleID = "c5a2f70c-f605-4648-b47f-8c39d4b03a50";

CrispClient.website.getPeopleData(websiteID, peopleID);

=========================

https://docs.crisp.chat/references/rest-api/v1/#save-people-data

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var peopleID = "c5a2f70c-f605-4648-b47f-8c39d4b03a50";

var peopleData = {
  "data": {
    "type": "customer",
    "signup": "finished"
  }
};

CrispClient.website.savePeopleData(websiteID, peopleID, peopleData);

=========================

https://docs.crisp.chat/references/rest-api/v1/#update-people-data

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var peopleID = "c5a2f70c-f605-4648-b47f-8c39d4b03a50";

var peopleData = {
  "data": {
    "signup": "finished"
  }
};

CrispClient.website.updatePeopleData(websiteID, peopleID, peopleData);

=========================

https://docs.crisp.chat/references/rest-api/v1/#get-people-subscription-status

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var peopleID = "c5a2f70c-f605-4648-b47f-8c39d4b03a50";

CrispClient.website.getPeopleSubscriptionStatus(websiteID, peopleID);

=========================

https://docs.crisp.chat/references/rest-api/v1/#update-people-subscription-status

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var peopleID = "c5a2f70c-f605-4648-b47f-8c39d4b03a50";

var peopleSubscription = {
  "email": true
};

CrispClient.website.updatePeopleSubscriptionStatus(websiteID, peopleID, peopleSubscription);

=========================

https://docs.crisp.chat/references/rest-api/v1/#export-people-profiles

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

CrispClient.website.exportPeopleProfiles(websiteID);

=========================

https://docs.crisp.chat/references/rest-api/v1/#import-people-profiles

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

var profileImportSetup = {
  "url": "https://storage.crisp.chat/users/processing/import/aa0b64dd-9fb4-4db9-80d6-5a49eb84087b/19d956c7-0294-45ad-89e1-58ce45e7008f.csv",
  "mapping": [
    {
      "column": 1,
      "field": "email"
    },
    {
      "column": 2,
      "field": "person.nickname"
    }
  ],
  "options": {
    "column_separator": ";",
    "skip_header": true
  }
};

CrispClient.website.importPeopleProfiles(websiteID, profileImportSetup);

=========================

https://docs.crisp.chat/references/rest-api/v1/#check-if-helpdesk-exists

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

CrispClient.website.checkHelpdeskExists(websiteID);

=========================

https://docs.crisp.chat/references/rest-api/v1/#resolve-helpdesk

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

CrispClient.website.resolveHelpdesk(websiteID);

=========================

https://docs.crisp.chat/references/rest-api/v1/#initialize-helpdesk

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

var name = "Valerian Helpdesk";
var domainBasic = "valerian";

CrispClient.website.initializeHelpdesk(websiteID, name, domainBasic);

=========================

https://docs.crisp.chat/references/rest-api/v1/#delete-helpdesk

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

var verify = "MySuperSecurePassword";

CrispClient.website.deleteHelpdesk(websiteID, verify);

=========================

https://docs.crisp.chat/references/rest-api/v1/#list-helpdesk-locales

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var pageNumber = 1;

CrispClient.website.listHelpdeskLocales(websiteID, pageNumber);

=========================

https://docs.crisp.chat/references/rest-api/v1/#add-helpdesk-locale

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

var locale = "en";

CrispClient.website.addHelpdeskLocale(websiteID, locale);

=========================

https://docs.crisp.chat/references/rest-api/v1/#check-if-helpdesk-locale-exists

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

var locale = "en";

CrispClient.website.checkHelpdeskLocaleExists(websiteID, locale);

=========================

https://docs.crisp.chat/references/rest-api/v1/#resolve-helpdesk-locale

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

var locale = "en";

CrispClient.website.resolveHelpdeskLocale(websiteID, locale);

=========================

https://docs.crisp.chat/references/rest-api/v1/#delete-helpdesk-locale

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

var locale = "en";

CrispClient.website.deleteHelpdeskLocale(websiteID, locale);

=========================

https://docs.crisp.chat/references/rest-api/v1/#list-helpdesk-locale-articles

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

var locale = "en";
var pageNumber = 1;

CrispClient.website.listHelpdeskLocaleArticles(websiteID, locale, pageNumber);

=========================

https://docs.crisp.chat/references/rest-api/v1/#add-a-new-helpdesk-locale-article

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

var locale = "en";
var title = "How to use $crisp JavaScript SDK?";

CrispClient.website.addNewHelpdeskLocaleArticle(websiteID, locale, title);

=========================

https://docs.crisp.chat/references/rest-api/v1/#check-if-helpdesk-locale-article-exists

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

var locale = "en";
var articleId = "fd036d68-c619-4c63-9deb-e2ce91733dd6";

CrispClient.website.checkHelpdeskLocaleArticleExists(websiteID, locale, articleId);

=========================

https://docs.crisp.chat/references/rest-api/v1/#resolve-helpdesk-locale-article

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

var locale = "en";
var articleId = "fd036d68-c619-4c63-9deb-e2ce91733dd6";

CrispClient.website.resolveHelpdeskLocaleArticle(websiteID, locale, articleId);

=========================

https://docs.crisp.chat/references/rest-api/v1/#save-helpdesk-locale-article

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

var locale = "en";
var articleId = "fd036d68-c619-4c63-9deb-e2ce91733dd6";

var article = {
  "title": "How to use $crisp JavaScript SDK?",
  "description": null,
  "content": "Crisp lets you create your customized chatbox easily. **It's easy to setup**.",
  "featured": false,
  "order": 1
};

CrispClient.website.saveHelpdeskLocaleArticle(websiteID, locale, articleId, article);

=========================

https://docs.crisp.chat/references/rest-api/v1/#update-helpdesk-locale-article

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

var locale = "en";
var articleId = "fd036d68-c619-4c63-9deb-e2ce91733dd6";

var article = {
  "content": "Crisp lets you create your customized chatbox easily. **It's easy to setup**."
};

CrispClient.website.updateHelpdeskLocaleArticle(websiteID, locale, articleId, article);

=========================

https://docs.crisp.chat/references/rest-api/v1/#delete-helpdesk-locale-article

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

var locale = "en";
var articleId = "fd036d68-c619-4c63-9deb-e2ce91733dd6";

CrispClient.website.deleteHelpdeskLocaleArticle(websiteID, locale, articleId);

=========================

https://docs.crisp.chat/references/rest-api/v1/#resolve-helpdesk-locale-article-category

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

var locale = "en";
var articleId = "fd036d68-c619-4c63-9deb-e2ce91733dd6";

CrispClient.website.resolveHelpdeskLocaleArticleCategory(websiteID, locale, articleId);

=========================

https://docs.crisp.chat/references/rest-api/v1/#update-helpdesk-locale-article-category

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

var locale = "en";
var articleId = "fd036d68-c619-4c63-9deb-e2ce91733dd6";
var categoryId = "00d344a3-8948-45b5-9bc4-82ec249fcd44";

CrispClient.website.updateHelpdeskLocaleArticleCategory(websiteID, locale, articleId, categoryId);

=========================

https://docs.crisp.chat/references/rest-api/v1/#list-helpdesk-locale-article-alternates

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

var locale = "en";
var articleId = "fd036d68-c619-4c63-9deb-e2ce91733dd6";

CrispClient.website.listHelpdeskLocaleArticleAlternates(websiteID, locale, articleId);

=========================

https://docs.crisp.chat/references/rest-api/v1/#check-if-helpdesk-locale-article-alternate-exists

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

var locale = "en";
var articleId = "fd036d68-c619-4c63-9deb-e2ce91733dd6";
var localeLinked = "fr";

CrispClient.website.checkHelpdeskLocaleArticleAlternateExists(websiteID, locale, articleId, localeLinked);

=========================

https://docs.crisp.chat/references/rest-api/v1/#resolve-helpdesk-locale-article-alternate

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

var locale = "en";
var articleId = "fd036d68-c619-4c63-9deb-e2ce91733dd6";
var localeLinked = "fr";

CrispClient.website.resolveHelpdeskLocaleArticleAlternate(websiteID, locale, articleId, localeLinked);

=========================

https://docs.crisp.chat/references/rest-api/v1/#save-helpdesk-locale-article-alternate

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

var locale = "en";
var articleId = "fd036d68-c619-4c63-9deb-e2ce91733dd6";
var localeLinked = "fr";
var articleIdLinked = "9dc0e823-56b0-43ca-9ca3-47e25a8eb543";

CrispClient.website.saveHelpdeskLocaleArticleAlternate(websiteID, locale, articleId, localeLinked, articleIdLinked);

=========================

https://docs.crisp.chat/references/rest-api/v1/#delete-helpdesk-locale-article-alternate

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

var locale = "en";
var articleId = "fd036d68-c619-4c63-9deb-e2ce91733dd6";
var localeLinked = "fr";

CrispClient.website.deleteHelpdeskLocaleArticleAlternate(websiteID, locale, articleId, localeLinked);

=========================

https://docs.crisp.chat/references/rest-api/v1/#publish-helpdesk-locale-article

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

var locale = "en";
var articleId = "fd036d68-c619-4c63-9deb-e2ce91733dd6";

CrispClient.website.publishHelpdeskLocaleArticle(websiteID, locale, articleId);

=========================

https://docs.crisp.chat/references/rest-api/v1/#unpublish-helpdesk-locale-article

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

var locale = "en";
var articleId = "fd036d68-c619-4c63-9deb-e2ce91733dd6";

CrispClient.website.unpublishHelpdeskLocaleArticle(websiteID, locale, articleId);

=========================

https://docs.crisp.chat/references/rest-api/v1/#list-helpdesk-locale-categories

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

var locale = "en";
var pageNumber = 1;

CrispClient.website.listHelpdeskLocaleCategories(websiteID, locale, pageNumber);

=========================

https://docs.crisp.chat/references/rest-api/v1/#add-helpdesk-locale-category

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

var locale = "en";
var name = "Chatbox";

CrispClient.website.addHelpdeskLocaleCategory(websiteID, locale, name);

=========================

https://docs.crisp.chat/references/rest-api/v1/#check-if-helpdesk-locale-category-exists

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

var locale = "en";
var categoryId = "33bc73b7-b7db-40a9-80fc-fcba8ebd1067";

CrispClient.website.checkHelpdeskLocaleCategoryExists(websiteID, locale, categoryId);

=========================

https://docs.crisp.chat/references/rest-api/v1/#resolve-helpdesk-locale-category

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

var locale = "en";
var categoryId = "33bc73b7-b7db-40a9-80fc-fcba8ebd1067";

CrispClient.website.resolveHelpdeskLocaleCategory(websiteID, locale, categoryId);

=========================

https://docs.crisp.chat/references/rest-api/v1/#save-helpdesk-locale-category

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

var locale = "en";
var categoryId = "33bc73b7-b7db-40a9-80fc-fcba8ebd1067";

var category = {
  "name": "Chatbox",
  "description": "Help on how to setup and use the Crisp chatbox.",
  "color": "#377FEA",
  "image": null,
  "order": 1
};

CrispClient.website.saveHelpdeskLocaleCategory(websiteID, locale, categoryId, category);

=========================

https://docs.crisp.chat/references/rest-api/v1/#update-helpdesk-locale-category

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

var locale = "en";
var categoryId = "33bc73b7-b7db-40a9-80fc-fcba8ebd1067";

var category = {
  "color": "#377FEA"
};

CrispClient.website.updateHelpdeskLocaleCategory(websiteID, locale, categoryId, category);

=========================

https://docs.crisp.chat/references/rest-api/v1/#delete-helpdesk-locale-category

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

var locale = "en";
var categoryId = "33bc73b7-b7db-40a9-80fc-fcba8ebd1067";

CrispClient.website.deleteHelpdeskLocaleCategory(websiteID, locale, categoryId);

=========================

https://docs.crisp.chat/references/rest-api/v1/#list-helpdesk-locale-sections

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

var locale = "en";
var categoryId = "33bc73b7-b7db-40a9-80fc-fcba8ebd1067";
var pageNumber = 1;

CrispClient.website.listHelpdeskLocaleSections(websiteID, locale, categoryId, pageNumber);

=========================

https://docs.crisp.chat/references/rest-api/v1/#add-helpdesk-locale-section

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

var locale = "en";
var categoryId = "33bc73b7-b7db-40a9-80fc-fcba8ebd1067";
var name = "Integrate with our SDKs";

CrispClient.website.addHelpdeskLocaleSection(websiteID, locale, categoryId, name);

=========================

https://docs.crisp.chat/references/rest-api/v1/#check-if-helpdesk-locale-section-exists

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

var locale = "en";
var categoryId = "33bc73b7-b7db-40a9-80fc-fcba8ebd1067";
var sectionID = "14886b8c-faf6-4967-af0a-2d90b3419263";

CrispClient.website.checkHelpdeskLocaleSectionExists(websiteID, locale, categoryId, sectionId);

=========================

https://docs.crisp.chat/references/rest-api/v1/#resolve-helpdesk-locale-section

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

var locale = "en";
var categoryId = "33bc73b7-b7db-40a9-80fc-fcba8ebd1067";
var sectionID = "14886b8c-faf6-4967-af0a-2d90b3419263";

CrispClient.website.resolveHelpdeskLocaleSection(websiteID, locale, categoryId, sectionId);

=========================

https://docs.crisp.chat/references/rest-api/v1/#save-helpdesk-locale-section

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

var locale = "en";
var categoryId = "33bc73b7-b7db-40a9-80fc-fcba8ebd1067";
var sectionID = "14886b8c-faf6-4967-af0a-2d90b3419263";

var section = {
  "name": "Integrate with our SDKs",
  "order": 1
};

CrispClient.website.saveHelpdeskLocaleSection(websiteID, locale, categoryId, sectionId, section);

=========================

https://docs.crisp.chat/references/rest-api/v1/#update-helpdesk-locale-section

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

var locale = "en";
var categoryId = "33bc73b7-b7db-40a9-80fc-fcba8ebd1067";
var sectionID = "14886b8c-faf6-4967-af0a-2d90b3419263";

var section = {
  "name": "Integrate with our SDKs",
  "order": 1
};

CrispClient.website.updateHelpdeskLocaleSection(websiteID, locale, categoryId, sectionId, section);

=========================

https://docs.crisp.chat/references/rest-api/v1/#delete-helpdesk-locale-section

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

var locale = "en";
var categoryId = "33bc73b7-b7db-40a9-80fc-fcba8ebd1067";
var sectionID = "14886b8c-faf6-4967-af0a-2d90b3419263";

CrispClient.website.deleteHelpdeskLocaleSection(websiteID, locale, categoryId, sectionId);

=========================

https://docs.crisp.chat/references/rest-api/v1/#map-helpdesk-locale-feedback-ratings

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

var locale = "en";

CrispClient.website.mapHelpdeskLocaleFeedbackRatings(websiteID, locale);

=========================

https://docs.crisp.chat/references/rest-api/v1/#list-helpdesk-locale-feedbacks

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

var locale = "en";
var pageNumber = 1;

CrispClient.website.listHelpdeskLocaleFeedbacks(websiteID, locale, pageNumber);

=========================

https://docs.crisp.chat/references/rest-api/v1/#import-external-helpdesk-to-locale

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

var locale = "en";
var helpdeskUrl = "https://docs.acme.com/";

CrispClient.website.importExternalHelpdeskToLocale(websiteID, locale, helpdeskUrl);

=========================

https://docs.crisp.chat/references/rest-api/v1/#export-helpdesk-locale-articles

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

var locale = "en";

CrispClient.website.exportHelpdeskLocaleArticles(websiteID, locale);

=========================

https://docs.crisp.chat/references/rest-api/v1/#list-helpdesk-redirections

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var pageNumber = 1;

CrispClient.website.listHelpdeskRedirections(websiteID, pageNumber);

=========================

https://docs.crisp.chat/references/rest-api/v1/#add-helpdesk-redirection

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

var redirectionPath = "/en/article/how-can-i-automatically-set-custom-user-data/";
var redirectionTarget = "/en/article/how-can-i-automatically-set-custom-user-data-1xh7pqk/";

CrispClient.website.addHelpdeskRedirection(websiteID, redirectionPath, redirectionTarget);

=========================

https://docs.crisp.chat/references/rest-api/v1/#check-if-helpdesk-redirection-exists

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var redirectionId = "7ebf2e39-1780-45c9-aa81-fa7a7078cb25";

CrispClient.website.checkHelpdeskRedirectionExists(websiteID, redirectionId);

=========================

https://docs.crisp.chat/references/rest-api/v1/#resolve-helpdesk-redirection

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var redirectionId = "7ebf2e39-1780-45c9-aa81-fa7a7078cb25";

CrispClient.website.resolveHelpdeskRedirection(websiteID, redirectionId);

=========================

https://docs.crisp.chat/references/rest-api/v1/#delete-helpdesk-redirection

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var redirectionId = "7ebf2e39-1780-45c9-aa81-fa7a7078cb25";

CrispClient.website.deleteHelpdeskRedirection(websiteID, redirectionId);

=========================

https://docs.crisp.chat/references/rest-api/v1/#resolve-helpdesk-settings

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

CrispClient.website.resolveHelpdeskSettings(websiteID);

=========================

https://docs.crisp.chat/references/rest-api/v1/#save-helpdesk-settings

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

var settings = {
  "name": "Valerian Helpdesk",

  "appearance": {
    "logos": {
      "header": null,
      "footer": null
    },

    "banner": null
  },

  "behavior": {
    "frequently_read": true,
    "show_category_images": true,
    "show_chatbox": true,
    "ask_feedback": false,
    "locale_picker": false,
    "refer_link": true,
    "forbid_indexing": false,
    "status_health_dead": true
  },

  "include": {
    "html": null
  },

  "access": {
    "password": null
  }
};

CrispClient.website.saveHelpdeskSettings(websiteID, settings);

=========================

https://docs.crisp.chat/references/rest-api/v1/#resolve-helpdesk-domain

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

CrispClient.website.resolveHelpdeskDomain(websiteID);

=========================

https://docs.crisp.chat/references/rest-api/v1/#request-helpdesk-domain-change

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

var basic = "valerian";
var custom = "help.valeriansaliou.name";

CrispClient.website.requestHelpdeskDomainChange(websiteID, basic, custom);

=========================

https://docs.crisp.chat/references/rest-api/v1/#generate-helpdesk-domain-setup-flow

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

var custom = "help.valeriansaliou.name";

CrispClient.website.generateHelpdeskDomainSetupFlow(websiteID, custom);

=========================

https://docs.crisp.chat/references/rest-api/v1/#check-if-website-exists

CrispClient.website.checkWebsiteExists(domain);

=========================

https://docs.crisp.chat/references/rest-api/v1/#create-website

CrispClient.website.createWebsite(websiteData);

=========================

https://docs.crisp.chat/references/rest-api/v1/#get-a-website

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

CrispClient.website.getWebsite(websiteID);

=========================

https://docs.crisp.chat/references/rest-api/v1/#delete-a-website

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

var verify = "MySuperSecurePassword";

CrispClient.website.deleteWebsite(websiteID, verify);

=========================

https://docs.crisp.chat/references/rest-api/v1/#get-website-settings

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

CrispClient.website.getWebsiteSettings(websiteID);

=========================

https://docs.crisp.chat/references/rest-api/v1/#update-website-settings

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

var settings = {
  "name": "Crisp",
  "domain": "crisp.chat",
  "logo": "https://storage.crisp.chat/users/avatar/website/8c842203-7ed8-4e29-a608-7cf78a7d2fcc/b6c2948d-b061-405e-91a9-2fdf855d1cc0.png",
  "contact": {
    "email": "contact@crisp.chat",
    "phone": "+33757905447"
  },
  "inbox": {
    "lock_removal": false,
    "force_operator_token": false
  },
  "emails": {
    "rating": true,
    "transcript": true,
    "enrich": true,
    "junk_filter": true
  },
  "chatbox": {
    "tile": "default",
    "wait_game": false,
    "last_operator_face": false,
    "ongoing_operator_face": true,
    "activity_metrics": true,
    "operator_privacy": false,
    "availability_tooltip": true,
    "hide_vacation": false,
    "hide_on_away": false,
    "hide_on_mobile": false,
    "position_reverse": false,
    "email_visitors": false,
    "phone_visitors": false,
    "force_identify": false,
    "ignore_privacy": false,
    "visitor_compose": false,
    "file_transfer": true,
    "helpdesk_link": true,
    "helpdesk_only": false,
    "status_health_dead": true,
    "check_domain": false,
    "color_theme": "blue",
    "text_theme": "default",
    "welcome_message": "default",
    "locale": "en",
    "allowed_pages": [],
    "blocked_pages": [
      "status/*/",
      "docs.crisp.chat/*",
      "crisp.chat/terms/",
      "https://crisp.chat/privacy/"
    ],
    "blocked_countries": [
      "IT"
    ],
    "blocked_locales": [
      "fa",
      "he"
    ],
    "blocked_ips": [
      "8.8.8.8",
      "2001:0db8:85a3:0000:0000:8a2e:0370:7334",
      "192.168.1.1/24"
    ]
  }
};

CrispClient.website.updateWebsiteSettings(websiteID, settings);

=========================

https://docs.crisp.chat/references/rest-api/v1/#list-website-operators

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

CrispClient.website.listWebsiteOperators(websiteID);

=========================

https://docs.crisp.chat/references/rest-api/v1/#list-last-active-website-operators

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

CrispClient.website.listLastActiveWebsiteOperators(websiteID);

=========================

https://docs.crisp.chat/references/rest-api/v1/#flush-last-active-website-operators

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

CrispClient.website.flushLastActiveWebsiteOperators(websiteID);

=========================

https://docs.crisp.chat/references/rest-api/v1/#send-email-to-website-operators

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

var emailData = {
  "recipient": "owners",
  "subject": "Plugin limits reached",
  "message": "Hi, you've reached the Slack plugin limits. Please contact our support team."
};

CrispClient.website.sendEmailToWebsiteOperators(websiteID, emailData);

=========================

https://docs.crisp.chat/references/rest-api/v1/#get-a-website-operator

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var userID = "a4c32c68-be91-4e29-8a05-976e93abbe3f";

CrispClient.website.getWebsiteOperator(websiteID, userID);

=========================

https://docs.crisp.chat/references/rest-api/v1/#invite-a-website-operator

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

var verify = {
  "email": "julien@crisp.chat",
  "role": "member",
  "verify": "MySuperSecurePassword"
};

CrispClient.website.inviteWebsiteOperator(websiteID, email, role, verify);

=========================

https://docs.crisp.chat/references/rest-api/v1/#change-operator-membership

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var userID = "a4c32c68-be91-4e29-8a05-976e93abbe3f";

var title = {
  "role": "owner",
  "title": "CTO"
};

CrispClient.website.changeOperatorMembership(websiteID, userID, role, title);

=========================

https://docs.crisp.chat/references/rest-api/v1/#unlink-operator-from-website

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var userID = "a4c32c68-be91-4e29-8a05-976e93abbe3f";

CrispClient.website.unlinkOperatorFromWebsite(websiteID, userID);

=========================

https://docs.crisp.chat/references/rest-api/v1/#count-visitors

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

CrispClient.website.countVisitors(websiteID);

=========================

https://docs.crisp.chat/references/rest-api/v1/#list-visitors

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var pageNumber = 1;

CrispClient.website.listVisitors(websiteID, pageNumber);

=========================

https://docs.crisp.chat/references/rest-api/v1/#pinpoint-visitors-on-a-map

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

CrispClient.website.pinpointVisitorsOnMap(websiteID, centerLongitude, centerLatitude, centerRadius);

=========================

https://docs.crisp.chat/references/rest-api/v1/#get-session-identifier-from-token

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var tokenID = "d3c17241-1327-47d7-9d8e-b89ff7bd2904";

CrispClient.website.getSessionIdentifierFromToken(websiteID, tokenID);

=========================

https://docs.crisp.chat/references/rest-api/v1/#count-blocked-visitors/

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

CrispClient.website.countBlockedVisitors(websiteID);

=========================

https://docs.crisp.chat/references/rest-api/v1/#count-blocked-visitors-in-rule

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

CrispClient.website.countBlockedVisitorsInRule(websiteID, rule);

=========================

https://docs.crisp.chat/references/rest-api/v1/#clear-blocked-visitors-in-rule

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

CrispClient.website.clearBlockedVisitorsInRule(websiteID, rule);

=========================

https://docs.crisp.chat/references/rest-api/v1/#get-website-availability-status

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

CrispClient.website.getWebsiteAvailabilityStatus(websiteID);

=========================

https://docs.crisp.chat/references/rest-api/v1/#list-website-operator-availabilities

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

CrispClient.website.listWebsiteOperatorAvailabilities(websiteID);

=========================

https://docs.crisp.chat/references/rest-api/v1/#acquire-analytics-points

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

CrispClient.website.acquireAnalyticsPoints(websiteID, pointType, pointMetric, dateFrom, dateTo, dateSplit, classifier, filterPrimary, filterSecondary, filterTertiary);

=========================

https://docs.crisp.chat/references/rest-api/v1/#list-analytics-filters

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var pageNumber = 1;

CrispClient.website.listAnalyticsFilters(websiteID, pageNumber, pointType, pointMetric, dateFrom, dateTo);

=========================

https://docs.crisp.chat/references/rest-api/v1/#list-analytics-classifiers

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var pageNumber = 1;

CrispClient.website.listAnalyticsClassifiers(websiteID, pageNumber, pointType, pointMetric, dateFrom, dateTo);

=========================

https://docs.crisp.chat/references/rest-api/v1/#batch-resolve-items

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

CrispClient.website.batchResolveConversations(websiteID, sessions);

=========================

https://docs.crisp.chat/references/rest-api/v1/#batch-read-items

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

CrispClient.website.batchReadConversations(websiteID, sessions);

=========================

https://docs.crisp.chat/references/rest-api/v1/#batch-remove-items

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

var sessions = [
  "session_19e5240f-0a8d-461e-a661-a3123fc6eec9",
  "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881"
];

CrispClient.website.batchRemoveConversations(websiteID, sessions);

=========================

https://docs.crisp.chat/references/rest-api/v1/#batch-remove-items

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

var people = [
  "session_19e5240f-0a8d-461e-a661-a3123fc6eec9",
  "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881"
];

CrispClient.website.batchRemovePeople(websiteID, people);

=========================

https://docs.crisp.chat/references/rest-api/v1/#get-verify-settings

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

CrispClient.website.getVerifySettings(websiteID);

=========================

https://docs.crisp.chat/references/rest-api/v1/#update-verify-settings

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

var settings = {
  "enabled": true
};

CrispClient.website.updateVerifySettings(websiteID, settings);

=========================

https://docs.crisp.chat/references/rest-api/v1/#get-verify-key

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

CrispClient.website.getVerifyKey(websiteID);

=========================

https://docs.crisp.chat/references/rest-api/v1/#roll-verify-key

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

CrispClient.website.rollVerifyKey(websiteID);

=========================

https://docs.crisp.chat/references/rest-api/v1/#list-campaigns

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var pageNumber = 1;

CrispClient.website.listCampaigns(websiteID, pageNumber);

=========================

https://docs.crisp.chat/references/rest-api/v1/#list-campaign-tags

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

CrispClient.website.listCampaignTags(websiteID);

=========================

https://docs.crisp.chat/references/rest-api/v1/#list-campaign-templates

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var pageNumber = 1;

CrispClient.website.listCampaignTemplates(websiteID, pageNumber);

=========================

https://docs.crisp.chat/references/rest-api/v1/#create-a-new-campaign-template

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

var templateName = {
  "name": "HTML Template",
  "format": "html"
};

CrispClient.website.createNewCampaignTemplate(websiteID, templateFormat, templateName);

=========================

https://docs.crisp.chat/references/rest-api/v1/#check-if-campaign-template-exists

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var templateID = "a4876300-4dae-47f7-8599-3bf9283f36c2";

CrispClient.website.checkCampaignTemplateExists(websiteID, templateID);

=========================

https://docs.crisp.chat/references/rest-api/v1/#get-a-campaign-template

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var templateID = "a4876300-4dae-47f7-8599-3bf9283f36c2";

CrispClient.website.getCampaignTemplate(websiteID, templateID);

=========================

https://docs.crisp.chat/references/rest-api/v1/#save-a-campaign-template

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var templateID = "a4876300-4dae-47f7-8599-3bf9283f36c2";

var template = {
  "name": "HTML Template",
  "format": "html",
  "content": "<html><body><a href=\"{{url.unsubscribe}}\"></a></body></html>"
};

CrispClient.website.saveCampaignTemplate(websiteID, templateID, template);

=========================

https://docs.crisp.chat/references/rest-api/v1/#update-a-campaign-template

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var templateID = "a4876300-4dae-47f7-8599-3bf9283f36c2";

var template = "<html><body><a href=\"{{url.unsubscribe}}\"></a></body></html>";

CrispClient.website.updateCampaignTemplate(websiteID, templateID, template);

=========================

https://docs.crisp.chat/references/rest-api/v1/#remove-a-campaign-template

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var templateID = "a4876300-4dae-47f7-8599-3bf9283f36c2";

CrispClient.website.removeCampaignTemplate(websiteID, templateID);

=========================

https://docs.crisp.chat/references/rest-api/v1/#create-a-new-campaign

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

var campaignName = {
  "type": "one-shot",
  "name": "Welcome!"
};

CrispClient.website.createNewCampaign(websiteID, campaignType, campaignName);

=========================

https://docs.crisp.chat/references/rest-api/v1/#check-if-campaign-exists

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var campaignID = "355d805f-a72f-457e-a3e5-5d01521f3cd8";

CrispClient.website.checkCampaignExists(websiteID, campaignID);

=========================

https://docs.crisp.chat/references/rest-api/v1/#get-a-campaign

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var campaignID = "355d805f-a72f-457e-a3e5-5d01521f3cd8";

CrispClient.website.getCampaign(websiteID, campaignID);

=========================

https://docs.crisp.chat/references/rest-api/v1/#save-a-campaign

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var campaignID = "355d805f-a72f-457e-a3e5-5d01521f3cd8";

var campaign = {
  "type": "one-shot",
  "format": "markdown",
  "name": "Welcome!",
  "sender": {
    "user_id": "aa0b64dd-9fb4-4db9-80d6-5a49eb84087b"
  },
  "recipients": {
    "type": "all"
  },
  "message": "*Hey there*, welcome on Crisp!",
  "options": {
    "deliver_to_chatbox": true,
    "deliver_to_email": true,
    "sender_name_website": false,
    "sender_email_reply": null,
    "tracking": true
  }
};

CrispClient.website.saveCampaign(websiteID, campaignID, campaign);

=========================

https://docs.crisp.chat/references/rest-api/v1/#update-a-campaign

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var campaignID = "355d805f-a72f-457e-a3e5-5d01521f3cd8";

var campaign = {
  "message": "*Hey there*, welcome on Crisp folks!"
};

CrispClient.website.updateCampaign(websiteID, campaignID, campaign);

=========================

https://docs.crisp.chat/references/rest-api/v1/#remove-a-campaign

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var campaignID = "355d805f-a72f-457e-a3e5-5d01521f3cd8";

CrispClient.website.removeCampaign(websiteID, campaignID);

=========================

https://docs.crisp.chat/references/rest-api/v1/#dispatch-a-campaign

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var campaignID = "355d805f-a72f-457e-a3e5-5d01521f3cd8";

CrispClient.website.dispatchCampaign(websiteID, campaignID);

=========================

https://docs.crisp.chat/references/rest-api/v1/#resume-a-campaign

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var campaignID = "355d805f-a72f-457e-a3e5-5d01521f3cd8";

CrispClient.website.resumeCampaign(websiteID, campaignID);

=========================

https://docs.crisp.chat/references/rest-api/v1/#pause-a-campaign

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var campaignID = "355d805f-a72f-457e-a3e5-5d01521f3cd8";

CrispClient.website.pauseCampaign(websiteID, campaignID);

=========================

https://docs.crisp.chat/references/rest-api/v1/#test-a-campaign

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var campaignID = "355d805f-a72f-457e-a3e5-5d01521f3cd8";

CrispClient.website.testCampaign(websiteID, campaignID);

=========================

https://docs.crisp.chat/references/rest-api/v1/#list-campaign-recipients

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var campaignID = "355d805f-a72f-457e-a3e5-5d01521f3cd8";
var pageNumber = 1;

CrispClient.website.listCampaignRecipients(websiteID, campaignID, pageNumber);

=========================

https://docs.crisp.chat/references/rest-api/v1/#list-campaign-statistics

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var campaignID = "355d805f-a72f-457e-a3e5-5d01521f3cd8";
var pageNumber = 1;

CrispClient.website.listCampaignStatistics(websiteID, campaignID, action, pageNumber);

=========================

https://docs.crisp.chat/references/rest-api/v1/#get-connect-account

CrispClient.plugin.getConnectAccount();

=========================

https://docs.crisp.chat/references/rest-api/v1/#check-connect-session-validity

CrispClient.plugin.checkConnectSessionValidity();

=========================

https://docs.crisp.chat/references/rest-api/v1/#list-all-connect-websites

var pageNumber = 1;

CrispClient.plugin.listAllConnectWebsites(pageNumber, filterConfigured, dateSince);

=========================

https://docs.crisp.chat/references/rest-api/v1/#get-connect-endpoints

CrispClient.plugin.getConnectEndpoints();

=========================

https://docs.crisp.chat/references/rest-api/v1/#list-all-active-subscriptions

CrispClient.plugin.listAllActiveSubscriptions();

=========================

https://docs.crisp.chat/references/rest-api/v1/#list-subscriptions-for-a-website

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";

CrispClient.plugin.listSubscriptionsForWebsite(websiteID);

=========================

https://docs.crisp.chat/references/rest-api/v1/#get-subscription-details

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var pluginID = "c64f3595-adee-425a-8d3a-89d47f7ed6bb";

CrispClient.plugin.getSubscriptionDetails(websiteID, pluginID);

=========================

https://docs.crisp.chat/references/rest-api/v1/#subscribe-website-to-plugin

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var pluginID = "c64f3595-adee-425a-8d3a-89d47f7ed6bb";

var pluginID = "98454664-9f7d-4d95-a9ce-f37356f5e65a";

CrispClient.plugin.subscribeWebsiteToPlugin(websiteID, pluginID);

=========================

https://docs.crisp.chat/references/rest-api/v1/#unsubscribe-plugin-from-website

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var pluginID = "c64f3595-adee-425a-8d3a-89d47f7ed6bb";

CrispClient.plugin.unsubscribePluginFromWebsite(websiteID, pluginID);

=========================

https://docs.crisp.chat/references/rest-api/v1/#get-subscription-settings

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var pluginID = "c64f3595-adee-425a-8d3a-89d47f7ed6bb";

CrispClient.plugin.getSubscriptionSettings(websiteID, pluginID);

=========================

https://docs.crisp.chat/references/rest-api/v1/#save-subscription-settings

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var pluginID = "c64f3595-adee-425a-8d3a-89d47f7ed6bb";

var settings = {
  "chatbox": {
    "25": "#bbbbbb"
  }
};

CrispClient.plugin.saveSubscriptionSettings(websiteID, pluginID, settings);

=========================

https://docs.crisp.chat/references/rest-api/v1/#update-subscription-settings

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var pluginID = "c64f3595-adee-425a-8d3a-89d47f7ed6bb";

var settings = {
  "chatbox": {
    "25": "#bbbbbb"
  }
};

CrispClient.plugin.updateSubscriptionSettings(websiteID, pluginID, settings);

=========================

https://docs.crisp.chat/references/rest-api/v1/#forward-plugin-payload-to-channel

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var pluginID = "c64f3595-adee-425a-8d3a-89d47f7ed6bb";

var payload = {
  "namespace": "bot:step",
  "payload": {
    "step": 1
  }
};

CrispClient.plugin.forwardPluginPayloadToChannel(websiteID, pluginID, payload);

=========================

https://docs.crisp.chat/references/rest-api/v1/#dispatch-plugin-event

var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
var pluginID = "c64f3595-adee-425a-8d3a-89d47f7ed6bb";

var payload = {
  "name": "bot-is-running",
  "data": {
    "bot": "Sales",
    "email": "valerian@crisp.chat"
  }
};

CrispClient.plugin.dispatchPluginEvent(websiteID, pluginID, payload);

=========================

https://docs.crisp.chat/references/rest-api/v1/#list-animation-medias

var listID = "f7fb43da-1cd8-49c1-ade0-9f5b71d034e3";
var pageNumber = 1;

CrispClient.media.listAnimationMedias(pageNumber, listID, searchQuery);

=========================

https://docs.crisp.chat/references/rest-api/v1/#bucket-url

CrispClient.bucket.generateBucketURL(data);

=========================

