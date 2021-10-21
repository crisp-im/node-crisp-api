/*
 * node-crisp-api
 *
 * Copyright 2021, Crisp IM SARL
 * Author: Baptiste Jamin <baptiste@crisp.chat>
 */


"use strict";


/**
 * Crisp WebsiteStats Resource
 * @class
 * @classdesc This is the Crisp Website Stats Resource
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
    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteId, "stats"
      ]),

      {}
    );
  };
}


module.exports = WebsiteStats;

