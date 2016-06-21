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
   * initiate website conversations
   * @memberof WebsiteConversations
   * @method getOne
   * @param {string} websiteId
   * @param {string} sessionId
   * @return Promise
   */
  this.initiateOne = function(websiteId, sessionId) {
    return Q.Promise(function(resolve, reject) {

      rest.post(crisp._prepareRestUrl(
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
   * send a text Message
   * @memberof WebsiteConversations
   * @method sendTextMessage
   * @param {string} websiteId
   * @param {string} sessionId
   * @param {string} text
   */
  this.sendTextMessage = function(websiteId, sessionId, text) {
    return Q.Promise(function(resolve, reject) {

      rest.post(crisp._prepareRestUrl(
        ["website", websiteId, "conversation", sessionId, "message"]), {
        type        : "text",
        from        : "operator",
        origin      : "chat",
        content     : text
      }, {
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

      rest.patch(crisp._prepareRestUrl(
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
   * Set conversation email
   * @memberof WebsiteConversations
   * @method setEmail
   * @param {string} websiteId
   * @param {string} sessionId
   * @param {string} email
   */
  this.setEmail = function(websiteId, sessionId, email) {
    return Q.Promise(function(resolve, reject) {

      rest.patch(crisp._prepareRestUrl(
        ["website", websiteId, "conversation", sessionId, "meta"]), {
          email : email
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
   * Set conversation nickname
   * @memberof WebsiteConversations
   * @method setNickname
   * @param {string} websiteId
   * @param {string} sessionId
   * @param {string} email
   */
  this.setNickname = function(websiteId, sessionId, nickname) {
    return Q.Promise(function(resolve, reject) {

      rest.patch(crisp._prepareRestUrl(
        ["website", websiteId, "conversation", sessionId, "meta"]), {
          nickname : nickname
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
   * Set conversation tags
   * @memberof WebsiteConversations
   * @method setNickname
   * @param {string} websiteId
   * @param {string} sessionId
   * @param {object} tags
   */
  this.setTags = function(websiteId, sessionId, tags) {
    return Q.Promise(function(resolve, reject) {

      rest.patch(crisp._prepareRestUrl(
        ["website", websiteId, "conversation", sessionId, "meta"]), {
          tags : tags
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
   * Set conversation block
   * @memberof WebsiteConversations
   * @method setBlock
   * @param {string}  websiteId
   * @param {string}  sessionId
   * @param {boolean} block
   */
  this.setBlock = function(websiteId, sessionId, block) {
    return Q.Promise(function(resolve, reject) {

      rest.patch(crisp._prepareRestUrl(
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

