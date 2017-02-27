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
   * Create a website conversation
   * @memberof WebsiteConversations
   * @method create
   * @param {string} websiteId
   * @return Promise
   */
  this.create = function(websiteId) {
    return Q.Promise(function(resolve, reject) {

      rest.postJson(crisp._prepareRestUrl(
        ["website", websiteId, "conversation"]), {}, {
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
   * initiate website conversations
   * @memberof WebsiteConversations
   * @method getOne
   * @param {string} websiteId
   * @param {string} sessionId
   * @return Promise
   */
  this.initiateOne = function(websiteId, sessionId) {
    return Q.Promise(function(resolve, reject) {

      rest.postJson(crisp._prepareRestUrl(
        ["website", websiteId, "conversation", sessionId, "initiate"]), {}, {
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
   * send a message
   * @memberof WebsiteConversations
   * @method sendTextMessage
   * @param {string} websiteId
   * @param {string} sessionId
   * @param {string} text
   */
  this.sendMessage = function(websiteId, sessionId, message) {
    return Q.Promise(function(resolve, reject) {

      rest.postJson(crisp._prepareRestUrl(
        ["website", websiteId, "conversation", sessionId, "message"]), message, {
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

    return Q.Promise(function(resolve, reject) {

      rest.patchJson(crisp._prepareRestUrl(
        ["website", websiteId, "conversation", sessionId, "state"]), {
          state : state
        }, {
          username : crisp.auth.identifier,
          password : crisp.auth.key
        }
      )
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
   * Get conversation meta
   * @memberof WebsiteConversations
   * @method getMeta
   * @param {string} websiteId
   * @param {string} sessionId
   */
  this.getMeta = function(websiteId, sessionId) {
    return Q.Promise(function(resolve, reject) {

      rest.get(crisp._prepareRestUrl(
        ["website", websiteId, "conversation", sessionId, "meta"]), {
          username : crisp.auth.identifier,
          password : crisp.auth.key
        }
      )
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
   * Get conversation messages
   * @memberof WebsiteConversations
   * @method getMessages
   * @param {string} websiteId
   * @param {string} sessionId
   * @param {object} query
   */
  this.getMessages = function(websiteId, sessionId, query) {
    return Q.Promise(function(resolve, reject) {

      rest.get(crisp._prepareRestUrl(
        ["website", websiteId, "conversation", sessionId, "messages"]), {
          username : crisp.auth.identifier,
          password : crisp.auth.key,
          query    : (query || {})
        }
      )
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
   * Update conversation meta
   * @memberof WebsiteConversations
   * @method setNickname
   * @param {string} websiteId
   * @param {string} sessionId
   * @param {string} email
   */
  this.updateMeta = function(websiteId, sessionId, update) {
    return Q.Promise(function(resolve, reject) {

      rest.patchJson(crisp._prepareRestUrl(
        ["website", websiteId, "conversation", sessionId, "meta"]), update, {
          username : crisp.auth.identifier,
          password : crisp.auth.key
        }
      )
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
   * Set conversation block
   * @memberof WebsiteConversations
   * @method setBlock
   * @param {string}  websiteId
   * @param {string}  sessionId
   * @param {boolean} block
   */
  this.setBlock = function(websiteId, sessionId, block) {
    return Q.Promise(function(resolve, reject) {

      rest.patchJson(crisp._prepareRestUrl(
        ["website", websiteId, "conversation", sessionId, "block"]), {
          blocked : block
        }, {
          username : crisp.auth.identifier,
          password : crisp.auth.key
        }
      )
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
   * Remove conversation
   * @memberof WebsiteConversations
   * @method removeOne
   * @param {string} websiteId
   * @param {string} sessionId
   */
  this.deleteOne = function(websiteId, sessionId) {
    return Q.Promise(function(resolve, reject) {

      rest.del(crisp._prepareRestUrl(
        ["website", websiteId, "conversations", sessionId]), {
          username : crisp.auth.identifier,
          password : crisp.auth.key
        }
      )
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

