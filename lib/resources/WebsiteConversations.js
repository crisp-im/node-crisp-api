/*
 * Bundle: Ressources / WebsiteConversations
 * Project: Crisp - Node API
 * Author: Baptiste Jamin http://jamin.me/
 * Copyright: 2016, Crisp IM
 */

"use strict";

var util = require("util");

/**
 * Crisp WebsiteConversations Ressource
 * @class
 * @classdesc This is the Crisp Website Conversations Ressource
 */
function WebsiteConversations(crisp) {
  this.FIND_WITH_SEARCH_QUERY_PARAMETERS = [
    ["searchQuery", "search_query"],
    ["searchType", "search_type"],
    ["searchOperator", "search_operator"],
    ["includeEmpty", "include_empty"],
    ["filterUnread", "filter_unread"],
    ["filterResolved", "filter_resolved"],
    ["filterNotResolved", "filter_not_resolved"],
    ["filterMention", "filter_mention"],
    ["filterAssigned", "filter_assigned"],
    ["filterUnassigned", "filter_unassigned"],
    ["filterDateStart", "filter_date_start"],
    ["filterDateEnd", "filter_date_end"],
    ["orderDateCreated", "order_date_created"],
    ["orderDateUpdated", "order_date_updated"]
  ];

  this.SET_STATE_STATES = ["resolved", "unresolved", "pending"];

  /**
   * Find conversations given search
   * @memberof WebsiteConversations
   * @method findWithSearch
   * @param {string} websiteId
   * @param {number} page
   * @param {object} searchParams
   * @return Promise
   */
  this.findWithSearch = function(websiteId, page, searchParams) {
    var query = {};

    if (!searchParams) {
      searchParams = {};
    }

    if (!page) {
      page = 1;
    }

    this.FIND_WITH_SEARCH_QUERY_PARAMETERS.forEach((parameter) => {
      var parameterValue = searchParams[parameter[0]];

      if (parameterValue) {
        query[parameter[1]] = encodeURIComponent(parameterValue);
      }
    });

    return crisp.get(crisp._prepareRestUrl(
      ["website", websiteId, "conversations", page]
    ), query);
  };

  /**
   * Get website conversations
   * @memberof WebsiteConversations
   * @method getList
   * @param {string} websiteId
   * @param {number} page
   * @return Promise
   */
  this.getList = function(websiteId, page) {
    return this.findWithSearch(websiteId, page);
  };

  /**
   * Get website conversations
   * @memberof WebsiteConversations
   * @method getOne
   * @param {string} websiteId
   * @param {number} page
   * @return Promise
   */
  this.getOne = function(websiteId, sessionId) {
    return crisp.get(crisp._prepareRestUrl(
      ["website", websiteId, "conversation", sessionId]
    ), {});
  };

  /**
   * Create a website conversation
   * @memberof WebsiteConversations
   * @method create
   * @param {string} websiteId
   * @return Promise
   */
  this.create = function(websiteId) {
    return crisp.post(crisp._prepareRestUrl(
      ["website", websiteId, "conversation"]
    ), {});
  };

  /**
   * Initiate website conversations
   * @memberof WebsiteConversations
   * @method getOne
   * @param {string} websiteId
   * @param {string} sessionId
   * @return Promise
   */
  this.initiateOne = function(websiteId, sessionId) {
    return crisp.post(crisp._prepareRestUrl(
      ["website", websiteId, "conversation", sessionId, "initiate"]
    ), {});
  };

  /**
   * Send a message
   * @memberof WebsiteConversations
   * @method sendTextMessage
   * @param {string} websiteId
   * @param {string} sessionId
   * @param {string} text
   */
  this.sendMessage = function(websiteId, sessionId, message) {
    return crisp.post(crisp._prepareRestUrl(
      ["website", websiteId, "conversation", sessionId, "message"]
    ), {}, message);
  };

  /**
   * Compose message
   * @memberof WebsiteConversations
   * @method composeMessage
   * @param {string} websiteId
   * @param {string} sessionId
   * @param {object} data
   */
  this.composeMessage = function(websiteId, sessionId, data) {
    return crisp.patch(crisp._prepareRestUrl(
      ["website", websiteId, "conversation", sessionId, "compose"]
    ), {}, data);
  };

  /**
   * Set conversation state (resolved, pending, unresolved)
   * @memberof WebsiteConversations
   * @method setState
   * @param {string} websiteId
   * @param {string} sessionId
   * @param {string} state
   */
  this.setState = function(websiteId, sessionId, state) {
    if (this.SET_STATE_STATES.indexOf(state) === -1) {
      throw new Error("WebsiteConversation, setState: state if not valid");
    }

    return crisp.patch(crisp._prepareRestUrl(
      ["website", websiteId, "conversation", sessionId, "state"]
    ), {}, {
      state : state
    });
  };

  /**
   * Get conversation routing assign
   * @memberof WebsiteConversations
   * @method getMeta
   * @param {string} websiteId
   * @param {string} sessionId
   */
  this.getRouting = function(websiteId, sessionId) {
    return crisp.get(crisp._prepareRestUrl(
      ["website", websiteId, "conversation", sessionId, "routing"]
    ), {});
  };

  /**
   * Set conversation routing assign
   * @memberof WebsiteConversations
   * @method setNickname
   * @param {string} websiteId
   * @param {string} sessionId
   * @param {object} assign
   */
  this.setRouting = function(websiteId, sessionId, assign) {
    return crisp.patch(crisp._prepareRestUrl(
      ["website", websiteId, "conversation", sessionId, "routing"]
    ), {}, assign);
  };

  /**
   * Get conversation meta
   * @memberof WebsiteConversations
   * @method getMeta
   * @param {string} websiteId
   * @param {string} sessionId
   */
  this.getMeta = function(websiteId, sessionId) {
    return crisp.get(crisp._prepareRestUrl(
      ["website", websiteId, "conversation", sessionId, "meta"]
    ), {});
  };

  /**
   * Get conversation messages
   * @memberof WebsiteConversations
   * @method getMessages
   * @param {string} websiteId
   * @param {string} sessionId
   * @param {number} timestampBefore
   */
  this.getMessages = function(websiteId, sessionId, timestampBefore) {
    var query = {};

    if (timestampBefore) {
      query.timestamp_before = timestampBefore;
    }

    return crisp.get(crisp._prepareRestUrl(
      ["website", websiteId, "conversation", sessionId, "messages"]),
      query
    );
  };

  /**
   * Update conversation meta
   * @memberof WebsiteConversations
   * @method updateMeta
   * @param {string} websiteId
   * @param {string} sessionId
   * @param {string} email
   */
  this.updateMeta = function(websiteId, sessionId, update) {
    return crisp.patch(crisp._prepareRestUrl(
      ["website", websiteId, "conversation", sessionId, "meta"]
    ), {}, update);
  };


  /**
   * Set conversation block
   * @memberof WebsiteConversations
   * @method setBlock
   * @param {string}  websiteId
   * @param {string}  sessionId
   * @param {boolean} block
   */
  this.setBlock = function(websiteId, sessionId, block) {
    return crisp.patch(crisp._prepareRestUrl(
      ["website", websiteId, "conversation", sessionId, "block"]
    ), {}, {
      blocked : block
    });
  };

  /**
   * Remove conversation
   * @memberof WebsiteConversations
   * @method deleteOne
   * @param {string} websiteId
   * @param {string} sessionId
   */
  this.deleteOne = function(websiteId, sessionId) {
    return crisp.delete(crisp._prepareRestUrl(
      ["website", websiteId, "conversation", sessionId]
    ));
  };

  /**
   * Mark messages as delivered
   * @memberof WebsiteConversations
   * @method deliveredMessages
   * @param {string} websiteId
   * @param {string} sessionId
   * @param {string} from
   * @param {string} origin
   * @param {Array} fingerprints
   */
  this.deliveredMessages = function(websiteId, sessionId, from, origin, fingerprints) {
    return crisp.patch(crisp._prepareRestUrl(
      ["website", websiteId, "conversation", sessionId, "delivered"]
    ), {}, {
      origin : origin,
      from: from,
      fingerprints: fingerprints
    });
  };

  /**
   * Mark messages as read
   * @memberof WebsiteConversations
   * @method readMessages
   * @param {string} websiteId
   * @param {string} sessionId
   * @param {string} from
   * @param {string} origin
   * @param {Array} fingerprints
   */
  this.readMessages = function(websiteId, sessionId, from, origin, fingerprints) {
    return crisp.patch(crisp._prepareRestUrl(
      ["website", websiteId, "conversation", sessionId, "read"]
    ), {}, {
      origin : origin,
      from: from,
      fingerprints: fingerprints
    });
  };

  // For backwards compatibility
  this.composeMessages = this.composeMessage;
  this.acknowledgeMessages = this.readMessages;
}

module.exports = WebsiteConversations;
