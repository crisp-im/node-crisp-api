/*
 * node-crisp-api
 *
 * Copyright 2021, Crisp IM SARL
 * Author: Baptiste Jamin <baptiste@crisp.chat>
 */


"use strict";


/**
 * Crisp Website Resource
 * @class
 * @classdesc This is the Crisp Website Resource
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
    return crisp.post(
      crisp._prepareRestUrl(["website"]), {}, data
    );
  };

  /**
   * Delete a website
   * @memberof Website
   * @method create
   * @param {string} websiteId
   * @return Promise
   */
  this.delete = function(websiteId) {
    return crisp.delete(
      crisp._prepareRestUrl(["website", websiteId]), {}
    );
  };

  /**
   * Subscribe to a website
   * @memberof Website
   * @method subscribe
   * @param {string} websiteId
   */
  this.subscribe = function(websiteId) {
    crisp._assertSocket();

    /* jshint ignore:start */
    crisp._socket.emit("website:join", {
      website_id : websiteId,
      user_id    : crisp.auth.identifier
    });
    /* jshint ignore:end */
  };
}


module.exports = Website;

