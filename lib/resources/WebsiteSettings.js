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
   * Get Website Settings
   * @memberof WebsiteSettings
   * @method getWebsiteSettings
   * @return Promise
   */
  this.getWebsiteSettings = function(websiteId) {
    return crisp.get(
      crisp._prepareRestUrl(["website", websiteId, "settings"])
    );
  };

  /**
   * Update Website Settings
   * @memberof WebsiteSettings
   * @method updateWebsiteSettings
   * @return Promise
   */
  this.updateWebsiteSettings = function(websiteId, settings) {
    return crisp.patch(
      crisp._prepareRestUrl(["website", websiteId, "settings"]), null, settings
    );
  };
}


module.exports = WebsiteSettings;

