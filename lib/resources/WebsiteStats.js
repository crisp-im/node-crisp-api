/*
 * Bundle: Ressources / WebsiteStats
 * Project: Crisp - Node API
 * Author: Baptiste Jamin http://jamin.me/
 * Copyright: 2016, Crisp IM
 */

"use strict";

/**
 * Crisp WebsiteStats Ressource
 * @class
 * @classdesc This is the Crisp Website Stats Ressource
 */
function WebsiteStats(crisp) {

  /**
   * get website stats
   * @memberof WebsiteStats
   * @method get
   * @param {string} websiteId
   * @return Promise
   */
  this.get = function(websiteId) {
    return crisp.get(crisp._prepareRestUrl(["website", websiteId, "stats"]), {});
  };
}

module.exports = WebsiteStats;

