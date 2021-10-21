/*
 * node-crisp-api
 *
 * Copyright 2021, Crisp IM SARL
 * Author: Baptiste Jamin <baptiste@crisp.chat>
 */


"use strict";


/**
 * Crisp WebsiteSettings Resource
 * @class
 * @classdesc This is the Crisp Website Settings Resource
 */
function WebsiteSettings(crisp) {
  /**
   * get website settings
   * @memberof WebsiteStats
   * @method get
   * @param {string} websiteId
   * @return Promise
   */
  this.get = function(websiteId) {
    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteId, "settings"
      ]),

      {}
    );
  };

  /**
   * update website settings
   * @memberof WebsiteStats
   * @method update
   * @param {string} websiteId
   * @param {Object} new settings
   * @return Promise
   */
  this.update = function(websiteId, patch) {
    return crisp.patch(
      crisp._prepareRestUrl([
        "website", websiteId, "settings"
      ]),

      {}, patch
    );
  };
}


module.exports = WebsiteSettings;

