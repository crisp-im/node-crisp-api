/*
 * Bundle: Ressources / Website
 * Project: Crisp - Node API
 * Author: Baptiste Jamin http://jamin.me/
 * Copyright: 2016, Crisp IM
 */

"use strict";

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
    return crisp.post(crisp._prepareRestUrl(["website"]), {}, data);
  };

  /**
   * Delete a website
   * @memberof Website
   * @method create
   * @param {string} websiteId
   * @return Promise
   */
  this.delete = function(websiteId) {
    return crisp.delete(crisp._prepareRestUrl(["website", websiteId]), {});
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

