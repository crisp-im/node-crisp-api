/*
 * node-crisp-api
 *
 * Copyright 2022, Crisp IM SAS
 * Author: Valerian Saliou <valerian@valeriansaliou.name>
 */


"use strict";


/**
 * Crisp WebsiteAnalytics Resource
 * @class
 * @classdesc This is the Crisp Website Analytics Resource
 */
function WebsiteAnalytics(service, crisp) {
  /**
   * Generate Analytics
   * @memberof WebsiteAnalytics
   * @public
   * @method generateAnalytics
   * @param {string} websiteID
   * @param {object} query
   * @return {Promise}
   */
  service.generateAnalytics = function(websiteID, query) {
    return crisp.post(
      crisp._prepareRestUrl(["website", websiteID, "analytics", "generate"]),

      null, query
    );
  };
}


module.exports = WebsiteAnalytics;
