/*
 * Bundle: Ressources / Website
 * Project: Crisp - Node API
 * Author: Baptiste Jamin http://jamin.me/
 * Copyright: 2016, Crisp IM
 */

"use strict";

var rest = require("restler");
var Q    = require("q");

/**
 * Crisp Website Ressource
 * @class
 * @classdesc This is the Crisp Website Ressource
 */
function Website(crisp) {

  /**
   * Create a website
   * @memberof Website
   * @method create
   * @param {Object} website
   * @param {string} website.name - Website name
   * @param {string} website.domain - Website domain
   * @return Promise
   */
  this.create = function(data) {
    return Q.Promise(function(resolve, reject) {

      rest.postJson(crisp._prepareRestUrl(["website"]), data, {
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
   * Delete a website
   * @memberof Website
   * @method create
   * @param {string} websiteId
   * @return Promise
   */
  this.delete = function(websiteId) {
    return Q.Promise(function(resolve, reject) {

      rest.del(crisp._prepareRestUrl(["website", websiteId]), {
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
   * Subscribe to a website
   * @memberof Website
   * @method subscribe
   * @param {string} websiteId
   */

  this.subscribe = function (websiteId) {
    crisp._assertSocket();
    /* jshint ignore:start */
    crisp._socket.emit("website:join", {
      website_id : websiteId,
      user_id : crisp.auth.identifier
    });
    /* jshint ignore:end */
  };

}

module.exports = Website;

