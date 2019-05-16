/*
 * Bundle: Ressources / WebsiteSettings
 * Project: Crisp - Node API
 * Author: Baptiste Jamin http://jamin.me/
 * Copyright: 2016, Crisp IM
 */

"use strict";

/**
 * Crisp WebsiteSettings Ressource
 * @class
 * @classdesc This is the Crisp Website Settings Ressource
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
    return crisp.get(crisp._prepareRestUrl(["website", websiteId, "settings"]), {}, {});
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
    return crisp.patch(crisp._prepareRestUrl(["website", websiteId, "settings"]), {}, patch);
  };
}

module.exports = WebsiteSettings;

