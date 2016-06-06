/*
 * Bundle: Ressources / WebsiteConversations
 * Project: Crisp - Node API
 * Author: Baptiste Jamin http://jamin.me/
 * Copyright: 2016, Crisp IM
 */

"use strict";

var rest = require("restler");
var Q    = require("q");

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
    return Q.Promise(function(resolve, reject) {

      if (!page) {
        page = 0;
      }

      rest.get(crisp._prepareRestUrl(
        ["website", websiteId, "conversations", page]), {
          username : crisp.auth.identifier,
          password : crisp.auth.key
      })
        .on('success', function(response) {
          return resolve(response.data);
        })
        .on('error', function(error) {
          return reject(error);
        })
        .on('fail', function(error) {
          return reject(new Error(error.reason));
        });
    });
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
    return Q.Promise(function(resolve, reject) {

      rest.get(crisp._prepareRestUrl(
        ["website", websiteId, "conversation", sessionId]), {
          username : crisp.auth.identifier,
          password : crisp.auth.key
      })
        .on('success', function(response) {
          return resolve(response.data);
        })
        .on('error', function(error) {
          return reject(error);
        })
        .on('fail', function(error) {
          return reject(new Error(error.reason));
        });
    });
  };

  /**
   * generates a fingerprint
   * @memberof WebsiteConversations
   * @method _getFingerprint
   * @param {string} websiteId
   * @param {string} sessionId
   * @param {string} text
   * @param {string} fingerprint
   */
  this._getFingerprint = function() {
    var __OFFSET  = 5;

    var str         = ("NodeCrispApi" + Date.now());
    var fingerprint = 5381;

    for (var i = 0; i < str.length; i++) {
      var char = str.charCodeAt(i);

      fingerprint = (((fingerprint << __OFFSET) + fingerprint) + char);
    }

    return fingerprint;
  };

  /**
   * send a text Message
   * @memberof WebsiteConversations
   * @method sendTextMessage
   * @param {string} websiteId
   * @param {string} sessionId
   * @param {string} text
   */
  this.sendTextMessage = function(websiteId, sessionId, text) {
    crisp._assertSocket();

    var _fingerprint = this._getFingerprint();

    /* jshint ignore:start */
    crisp._socket.emit("message:send", {
      website_id      : websiteId,
      session_id      : sessionId,
      message         : {
        type        : "text",
        origin      : "chat",
        content     : text,
        timestamp   : Date.now(),
        fingerprint : _fingerprint
      }
    });
    /* jshint ignore:end */
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
    crisp._assertSocket();

    if (["resolved", "unresolved", "pending"].indexOf(state) === -1) {
      throw new Error("WebsiteConversation, setState: state if not valid");
    }
    /* jshint ignore:start */
    crisp._socket.emit("session:set_state", {
      website_id      : websiteId,
      session_id      : sessionId,
      state           : state
    });
    /* jshint ignore:end */
  };

  /**
   * Set conversation email
   * @memberof WebsiteConversations
   * @method setEmail
   * @param {string} websiteId
   * @param {string} sessionId
   * @param {string} email
   */
  this.setEmail = function(websiteId, sessionId, email) {
    crisp._assertSocket();

    /* jshint ignore:start */
    crisp._socket.emit("session:set_email", {
      website_id      : websiteId,
      session_id      : sessionId,
      email           : email
    });
    /* jshint ignore:end */
  };

  /**
   * Set conversation nickname
   * @memberof WebsiteConversations
   * @method setNickname
   * @param {string} websiteId
   * @param {string} sessionId
   * @param {string} email
   */
  this.setNickname = function(websiteId, sessionId, nickname) {
    crisp._assertSocket();

    /* jshint ignore:start */
    crisp._socket.emit("session:set_nickname", {
      website_id      : websiteId,
      session_id      : sessionId,
      nickname        : nickname
    });
    /* jshint ignore:end */
  };

  /**
   * Set conversation block
   * @memberof WebsiteConversations
   * @method setBlock
   * @param {string} websiteId
   * @param {string} sessionId
   * @param {string} block
   */
  this.setBlock = function(websiteId, sessionId, block) {
    crisp._assertSocket();

    /* jshint ignore:start */
    crisp._socket.emit("session:set_block", {
      website_id      : websiteId,
      session_id      : sessionId,
      block           : block
    });
    /* jshint ignore:end */
  };

  /**
   * Remove conversation
   * @memberof WebsiteConversations
   * @method removeOne
   * @param {string} websiteId
   * @param {string} sessionId
   */
  this.deleteOne = function(websiteId, sessionId) {
    crisp._assertSocket();

    /* jshint ignore:start */
    crisp._socket.emit("session:remove", {
      website_id      : websiteId,
      session_id      : sessionId,
    });
    /* jshint ignore:end */
  };

  /**
   * Remove conversation
   * @memberof WebsiteConversations
   * @method removeOne
   * @param {string} websiteId
   * @param {string} sessionId
   * @param {Array} read fingerprints
   */
  this.acknowledgeMessages = function(websiteId, sessionId, fingerprints) {
    crisp._assertSocket();

    /* jshint ignore:start */
    crisp._socket.emit("message:acknowledge:read:send", {
      website_id      : websiteId,
      session_id      : sessionId,
      fingerprints    : fingerprints
    });
    /* jshint ignore:end */
  };

}

module.exports = WebsiteConversations;

