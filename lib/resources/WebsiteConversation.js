/*
 * node-crisp-api
 *
 * Copyright 2022, Crisp IM SAS
 * Author: Baptiste Jamin <baptiste@crisp.chat>
 */


"use strict";


/**
 * Crisp WebsiteConversation Resource
 * @class
 * @classdesc This is the Crisp Website Conversation Resource
 */
function WebsiteConversation(service, crisp) {
  /**
   * List Conversations
   * @memberof WebsiteConversation
   * @method listConversations
   * @return Promise
   */
  service.listConversations = function(websiteID, pageNumber) {
    return crisp.get(
      crisp._prepareRestUrl(["website", websiteID, "conversations", pageNumber])
    );
  };

  /**
   * List Suggested Conversation Segments
   * @memberof WebsiteConversation
   * @method listSuggestedConversationSegments
   * @return Promise
   */
  service.listSuggestedConversationSegments = function(websiteID, pageNumber) {
    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteID, "conversations", "suggest", "segments", pageNumber
      ])
    );
  };

  /**
   * Delete Suggested Conversation Segment
   * @memberof WebsiteConversation
   * @method deleteSuggestedConversationSegment
   * @return Promise
   */
  service.deleteSuggestedConversationSegment = function(websiteID, segment) {
    return crisp.delete(
      crisp._prepareRestUrl([
        "website", websiteID, "conversations", "suggest", "segment"
      ]),

      null,

      {
        segment : segment
      }
    );
  };

  /**
   * List Suggested Conversation Data Keys
   * @memberof WebsiteConversation
   * @method listSuggestedConversationDataKeys
   * @return Promise
   */
  service.listSuggestedConversationDataKeys = function(websiteID, pageNumber) {
    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteID, "conversations", "suggest", "data", pageNumber
      ])
    );
  };

  /**
   * Delete Suggested Conversation Data Key
   * @memberof WebsiteConversation
   * @method deleteSuggestedConversationDataKey
   * @return Promise
   */
  service.deleteSuggestedConversationDataKey = function(websiteID, key) {
    return crisp.delete(
      crisp._prepareRestUrl([
        "website", websiteID, "conversations", "suggest", "data"
      ]),

      null,

      {
        key : key
      }
    );
  };

  /**
   * Create A New Conversation
   * @memberof WebsiteConversation
   * @method createNewConversation
   * @return Promise
   */
  service.createNewConversation = function(websiteID) {
    return crisp.post(
      crisp._prepareRestUrl(["website", websiteID, "conversation"])
    );
  };

  /**
   * Check If Conversation Exists
   * @memberof WebsiteConversation
   * @method checkConversationExists
   * @return Promise
   */
  service.checkConversationExists = function(websiteID, sessionID) {
    return crisp.head(
      crisp._prepareRestUrl(["website", websiteID, "conversation", sessionID])
    );
  };

  /**
   * Get A Conversation
   * @memberof WebsiteConversation
   * @method getConversation
   * @return Promise
   */
  service.getConversation = function(websiteID, sessionID) {
    return crisp.get(
      crisp._prepareRestUrl(["website", websiteID, "conversation", sessionID])
    );
  };

  /**
   * Remove A Conversation
   * @memberof WebsiteConversation
   * @method removeConversation
   * @return Promise
   */
  service.removeConversation = function(websiteID, sessionID) {
    return crisp.delete(
      crisp._prepareRestUrl(["website", websiteID, "conversation", sessionID])
    );
  };

  /**
   * Initiate A Conversation With Existing Session
   * @memberof WebsiteConversation
   * @method initiateConversationWithExistingSession
   * @return Promise
   */
  service.initiateConversationWithExistingSession = function(
    websiteID, sessionID
  ) {
    return crisp.post(
      crisp._prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "initiate"
      ])
    );
  };

  /**
   * Get Messages In Conversation
   * @memberof WebsiteConversation
   * @method getMessagesInConversation
   * @return Promise
   */
  service.getMessagesInConversation = function(
    websiteID, sessionID, timestampBefore
  ) {
    // Generate query
    var _query = {};

    if (timestampBefore) {
      _query.timestamp_before = timestampBefore;
    }

    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "messages"
      ]),

      _query
    );
  };

  /**
   * Send A Message In Conversation
   * @memberof WebsiteConversation
   * @method sendMessageInConversation
   * @return Promise
   */
  service.sendMessageInConversation = function(websiteID, sessionID, message) {
    return crisp.post(
      crisp._prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "message"
      ]),

      null, message
    );
  };

  /**
   * Get A Message In Conversation
   * @memberof WebsiteConversation
   * @method getMessageInConversation
   * @return Promise
   */
  service.getMessageInConversation = function(
    websiteID, sessionID, fingerprint
  ) {
    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "message", fingerprint
      ])
    );
  };

  /**
   * Update A Message In Conversation
   * @memberof WebsiteConversation
   * @method updateMessageInConversation
   * @return Promise
   */
  service.updateMessageInConversation = function(
    websiteID, sessionID, fingerprint, content
  ) {
    return crisp.patch(
      crisp._prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "message", fingerprint
      ]),

      null,

      {
        content : content
      }
    );
  };

  /**
   * Remove A Message In Conversation
   * @memberof WebsiteConversation
   * @method removeMessageInConversation
   * @return Promise
   */
  service.removeMessageInConversation = function(
    websiteID, sessionID, fingerprint
  ) {
    return crisp.delete(
      crisp._prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "message", fingerprint
      ])
    );
  };

  /**
   * Compose A Message In Conversation
   * @memberof WebsiteConversation
   * @method composeMessageInConversation
   * @return Promise
   */
  service.composeMessageInConversation = function(
    websiteID, sessionID, compose
  ) {
    return crisp.patch(
      crisp._prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "compose"
      ]),

      null, compose
    );
  };

  /**
   * Mark Messages As Read In Conversation
   * @memberof WebsiteConversation
   * @method markMessagesReadInConversation
   * @return Promise
   */
  service.markMessagesReadInConversation = function(
    websiteID, sessionID, read
  ) {
    return crisp.patch(
      crisp._prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "read"
      ]),

      null, read
    );
  };

  /**
   * Mark Messages As Delivered In Conversation
   * @memberof WebsiteConversation
   * @method markMessagesDeliveredInConversation
   * @return Promise
   */
  service.markMessagesDeliveredInConversation = function(
    websiteID, sessionID, delivered
  ) {
    return crisp.patch(
      crisp._prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "delivered"
      ]),

      null, delivered
    );
  };

  /**
   * Update Conversation Open State
   * @memberof WebsiteConversation
   * @method updateConversationOpenState
   * @return Promise
   */
  service.updateConversationOpenState = function(websiteID, sessionID, opened) {
    return crisp.patch(
      crisp._prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "open"
      ]),

      null,

      {
        opened : (opened || false)
      }
    );
  };

  /**
   * Get Conversation Routing Assign
   * @memberof WebsiteConversation
   * @method getConversationRoutingAssign
   * @return Promise
   */
  service.getConversationRoutingAssign = function(websiteID, sessionID) {
    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "routing"
      ])
    );
  };

  /**
   * Assign Conversation Routing
   * @memberof WebsiteConversation
   * @method assignConversationRouting
   * @return Promise
   */
  service.assignConversationRouting = function(websiteID, sessionID, assign) {
    return crisp.patch(
      crisp._prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "routing"
      ]),

      null, assign
    );
  };

  /**
   * Get Conversation Metas
   * @memberof WebsiteConversation
   * @method getConversationMetas
   * @return Promise
   */
  service.getConversationMetas = function(websiteID, sessionID) {
    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "meta"
      ])
    );
  };

  /**
   * Update Conversation Metas
   * @memberof WebsiteConversation
   * @method updateConversationMetas
   * @return Promise
   */
  service.updateConversationMetas = function(websiteID, sessionID, metas) {
    return crisp.patch(
      crisp._prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "meta"
      ]),

      null, metas
    );
  };

  /**
   * Get An Original Message In Conversation
   * @memberof WebsiteConversation
   * @method getOriginalMessageInConversation
   * @return Promise
   */
  service.getOriginalMessageInConversation = function(
    websiteID, sessionID, originalID
  ) {
    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "original", originalID
      ])
    );
  };

  /**
   * List Conversation Pages
   * @memberof WebsiteConversation
   * @method listConversationPages
   * @return Promise
   */
  service.listConversationPages = function(websiteID, sessionID, pageNumber) {
    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "pages", pageNumber
      ])
    );
  };

  /**
   * List Conversation Events
   * @memberof WebsiteConversation
   * @method listConversationEvents
   * @return Promise
   */
  service.listConversationEvents = function(websiteID, sessionID, pageNumber) {
    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "events", pageNumber
      ])
    );
  };

  /**
   * Get Conversation State
   * @memberof WebsiteConversation
   * @method getConversationState
   * @return Promise
   */
  service.getConversationState = function(websiteID, sessionID) {
    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "state"
      ])
    );
  };

  /**
   * Change Conversation State
   * @memberof WebsiteConversation
   * @method changeConversationState
   * @return Promise
   */
  service.changeConversationState = function(websiteID, sessionID, state) {
    return crisp.patch(
      crisp._prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "state"
      ]),

      null,

      {
        state : state
      }
    );
  };

  /**
   * Get Conversation Participants
   * @memberof WebsiteConversation
   * @method getConversationParticipants
   * @return Promise
   */
  service.getConversationParticipants = function(websiteID, sessionID) {
    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "participants"
      ])
    );
  };

  /**
   * Save Conversation Participants
   * @memberof WebsiteConversation
   * @method saveConversationParticipants
   * @return Promise
   */
  service.saveConversationParticipants = function(
    websiteID, sessionID, participants
  ) {
    return crisp.put(
      crisp._prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "participants"
      ]),

      null, participants
    );
  };

  /**
   * Get Block Status For Conversation
   * @memberof WebsiteConversation
   * @method getBlockStatusForConversation
   * @return Promise
   */
  service.getBlockStatusForConversation = function(websiteID, sessionID) {
    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "block"
      ])
    );
  };

  /**
   * Block Incoming Messages For Conversation
   * @memberof WebsiteConversation
   * @method blockIncomingMessagesForConversation
   * @return Promise
   */
  service.blockIncomingMessagesForConversation = function(
    websiteID, sessionID, blocked
  ) {
    return crisp.patch(
      crisp._prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "block"
      ]),

      null,

      {
        blocked : (blocked || false)
      }
    );
  };

  /**
   * Get Verify Status For Conversation
   * @memberof WebsiteConversation
   * @method getVerifyStatusForConversation
   * @return Promise
   */
  service.getVerifyStatusForConversation = function(websiteID, sessionID) {
    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "verify"
      ])
    );
  };

  /**
   * Update Verify Status For Conversation
   * @memberof WebsiteConversation
   * @method updateVerifyStatusForConversation
   * @return Promise
   */
  service.updateVerifyStatusForConversation = function(
    websiteID, sessionID, verified
  ) {
    return crisp.patch(
      crisp._prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "verify"
      ]),

      null,

      {
        verified : (verified || false)
      }
    );
  };

  /**
   * Request Email Transcript For Conversation
   * @memberof WebsiteConversation
   * @method requestEmailTranscriptForConversation
   * @return Promise
   */
  service.requestEmailTranscriptForConversation = function(
    websiteID, sessionID, to, email
  ) {
    // Generate body
    var _body = {
      to : to
    };

    if (email) {
      _body.email = email;
    }

    return crisp.post(
      crisp._prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "transcript"
      ]),

      null, _body
    );
  };

  /**
   * Request Chatbox Binding Purge For Conversation
   * @memberof WebsiteConversation
   * @method requestChatboxBindingPurgeForConversation
   * @return Promise
   */
  service.requestChatboxBindingPurgeForConversation = function(
    websiteID, sessionID
  ) {
    return crisp.post(
      crisp._prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "purge"
      ])
    );
  };

  /**
   * Request User Feedback For Conversation
   * @memberof WebsiteConversation
   * @method requestUserFeedbackForConversation
   * @return Promise
   */
  service.requestUserFeedbackForConversation = function(
    websiteID, sessionID
  ) {
    return crisp.post(
      crisp._prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "feedback"
      ])
    );
  };

  /**
   * List Browsing Sessions For Conversation
   * @memberof WebsiteConversation
   * @method listBrowsingSessionsForConversation
   * @return Promise
   */
  service.listBrowsingSessionsForConversation = function(websiteID, sessionID) {
    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "browsing"
      ])
    );
  };

  /**
   * Initiate Browsing Session For Conversation
   * @memberof WebsiteConversation
   * @method initiateBrowsingSessionForConversation
   * @return Promise
   */
  service.initiateBrowsingSessionForConversation = function(
    websiteID, sessionID
  ) {
    return crisp.post(
      crisp._prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "browsing"
      ])
    );
  };

  /**
   * Send Action To An Existing Browsing Session
   * @memberof WebsiteConversation
   * @method sendActionToExistingBrowsingSession
   * @return Promise
   */
  service.sendActionToExistingBrowsingSession = function(
    websiteID, sessionID, browsingID, action
  ) {
    return crisp.patch(
      crisp._prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "browsing", browsingID
      ]),

      null,

      {
        action : action
      }
    );
  };

  /**
   * Assist Existing Browsing Session
   * @memberof WebsiteConversation
   * @method assistExistingBrowsingSession
   * @return Promise
   */
  service.assistExistingBrowsingSession = function(
    websiteID, sessionID, browsingID, assist
  ) {
    return crisp.patch(
      crisp._prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "browsing", browsingID,
          "assist"
      ]),

      null, assist
    );
  };

  /**
   * Initiate New Call Session For Conversation
   * @memberof WebsiteConversation
   * @method initiateNewCallSessionForConversation
   * @return Promise
   */
  service.initiateNewCallSessionForConversation = function(
    websiteID, sessionID, mode
  ) {
    return crisp.post(
      crisp._prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "call"
      ]),

      null,

      {
        mode : (mode || "audio")
      }
    );
  };

  /**
   * Get Ongoing Call Session For Conversation
   * @memberof WebsiteConversation
   * @method getOngoingCallSessionForConversation
   * @return Promise
   */
  service.getOngoingCallSessionForConversation = function(
    websiteID, sessionID
  ) {
    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "call"
      ])
    );
  };

  /**
   * Abort Ongoing Call Session For Conversation
   * @memberof WebsiteConversation
   * @method abortOngoingCallSessionForConversation
   * @return Promise
   */
  service.abortOngoingCallSessionForConversation = function(
    websiteID, sessionID, callID
  ) {
    return crisp.delete(
      crisp._prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "call", callID
      ])
    );
  };

  /**
   * Transmit Signaling On Ongoing Call Session
   * @memberof WebsiteConversation
   * @method transmitSignalingOnOngoingCallSession
   * @return Promise
   */
  service.transmitSignalingOnOngoingCallSession = function(
    websiteID, sessionID, callID, payload
  ) {
    return crisp.patch(
      crisp._prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "call", callID
      ]),

      null, payload
    );
  };

  /**
   * Deliver Widget Button Action For Conversation
   * @memberof WebsiteConversation
   * @method deliverWidgetButtonActionForConversation
   * @return Promise
   */
  service.deliverWidgetButtonActionForConversation = function(
    websiteID, sessionID, pluginID, sectionID, itemID, data, value
  ) {
    // Generate body
    var _body = {
      section_id : sectionID,
      item_id    : itemID,
      data       : data
    };

    if (typeof value !== "undefined") {
      _body.value = value;
    }

    return crisp.post(
      crisp._prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "widget", pluginID,
          "button"
      ]),

      null, _body
    );
  };

  /**
   * Deliver Widget Data Fetch Action For Conversation
   * @memberof WebsiteConversation
   * @method deliverWidgetDataFetchActionForConversation
   * @return Promise
   */
  service.deliverWidgetDataFetchActionForConversation = function(
    websiteID, sessionID, pluginID, sectionID, itemID, data
  ) {
    return crisp.post(
      crisp._prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "widget", pluginID,
          "data"
      ]),

      null,

      {
        section_id : sectionID,
        item_id    : itemID,
        data       : data
      }
    );
  };

  /**
   * Deliver Widget Data Edit Action For Conversation
   * @memberof WebsiteConversation
   * @method deliverWidgetDataEditActionForConversation
   * @return Promise
   */
  service.deliverWidgetDataEditActionForConversation = function(
    websiteID, sessionID, pluginID, sectionID, itemID, value
  ) {
    return crisp.post(
      crisp._prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "widget", pluginID,
          "data"
      ]),

      null,

      {
        section_id : sectionID,
        item_id    : itemID,
        value      : value
      }
    );
  };

  /**
   * Schedule A Reminder For Conversation
   * @memberof WebsiteConversation
   * @method scheduleReminderForConversation
   * @return Promise
   */
  service.scheduleReminderForConversation = function(
    websiteID, sessionID, date, note
  ) {
    return crisp.post(
      crisp._prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "reminder"
      ]),

      null,

      {
        date : date,
        note : note
      }
    );
  };
}


module.exports = WebsiteConversation;
