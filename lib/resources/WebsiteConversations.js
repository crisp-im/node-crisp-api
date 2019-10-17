/*
 * Bundle: Ressources / WebsiteConversations
 * Project: Crisp - Node API
 * Author: Baptiste Jamin http://jamin.me/
 * Copyright: 2016, Crisp IM
 */

"use strict";

/**
 * Crisp WebsiteConversations Ressource
 * @class
 * @classdesc This is the Crisp Website Conversations Ressource
 */
function WebsiteConversations(crisp) {

  /**
   * get website conversations
   * @memberof WebsiteConversations
   * @method getList
   * @param {string} websiteId
   * @param {number} page
   * @return Promise
   */
  this.getList = function(websiteId, page) {
    if (!page) {
      page = 0;
    }

    return crisp.get(crisp._prepareRestUrl(
      ["website", websiteId, "conversations", page]));
  };

  /**
   * get website conversations
   * @memberof WebsiteConversations
   * @method getOne
   * @param {string} websiteId
   * @param {number} page
   * @return Promise
   */
  this.getOne = function(websiteId, sessionId) {
    return crisp.get(crisp._prepareRestUrl(
      ["website", websiteId, "conversation", sessionId]));
  };

  /**
   * Create a website conversation
   * @memberof WebsiteConversations
   * @method create
   * @param {string} websiteId
   * @return Promise
   */
  this.create = function(websiteId) {
    return crisp.post(crisp._prepareRestUrl(["website", websiteId, "conversation"]), {});
  };

  /**
   * initiate website conversations
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
   * send a message
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
   * Set conversation state (resolved, pending, unresolved)
   * @memberof WebsiteConversations
   * @method setState
   * @param {string} websiteId
   * @param {string} sessionId
   * @param {string} state
   */
  this.setState = function(websiteId, sessionId, state) {
    if (["resolved", "unresolved", "pending"].indexOf(state) === -1) {
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
      ["website", websiteId, "conversation", sessionId, "routing"]));
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
      ["website", websiteId, "conversation", sessionId, "meta"]));
  };

  /**
   * Get conversation messages
   * @memberof WebsiteConversations
   * @method getMessages
   * @param {string} websiteId
   * @param {string} sessionId
   * @param {object} query
   */
  this.getMessages = function(websiteId, sessionId, query) {
    return crisp.get(crisp._prepareRestUrl(
    ["website", websiteId, "conversation", sessionId, "messages"]));
  };

  /**
   * Update conversation meta
   * @memberof WebsiteConversations
   * @method setNickname
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
   * @method removeOne
   * @param {string} websiteId
   * @param {string} sessionId
   */
  this.deleteOne = function(websiteId, sessionId) {
    return crisp.delete(crisp._prepareRestUrl(
      ["website", websiteId, "conversation", sessionId]));
  };

  /**
   * Acknowledge messages
   * @memberof WebsiteConversations
   * @method removeOne
   * @param {string} websiteId
   * @param {string} sessionId
   * @param {string} from
   * @param {string} origin
   * @param {Array} read fingerprints
   */
  this.acknowledgeMessages = function(websiteId, sessionId, from, origin, fingerprints) {
    return crisp.patch(crisp._prepareRestUrl(
      ["website", websiteId, "conversation", sessionId, "read"]
    ), {}, {
      origin : origin,
      from: from,
      fingerprints: fingerprints
    });
  };

  /**
   * Compose messages
   * @memberof WebsiteConversations
   * @method composeMessages
   * @param {string} websiteId
   * @param {string} sessionId
   * @param {object} data
   */
  this.composeMessages = function(websiteId, sessionId, data) {
    return crisp.patch(crisp._prepareRestUrl(["website", websiteId, "conversation", sessionId, "compose"]), {}, data);
  };

}

module.exports = WebsiteConversations;

