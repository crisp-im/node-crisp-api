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
function WebsiteSettings(service, crisp) {
  /**
   * Get Website Settings
   * @memberof WebsiteSettings
   * @method getWebsiteSettings
   * @return Promise
   */
  service.getWebsiteSettings = function(websiteID) {
    return crisp.get(
      crisp._prepareRestUrl(["website", websiteID, "settings"])
    );
  };

  /**
   * Update Website Settings
   * @memberof WebsiteSettings
   * @method updateWebsiteSettings
   * @return Promise
   */
  service.updateWebsiteSettings = function(websiteID, settings) {
    return crisp.patch(
      crisp._prepareRestUrl(["website", websiteID, "settings"]), null, settings
    );
  };
}


module.exports = WebsiteSettings;

