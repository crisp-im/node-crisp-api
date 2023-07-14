/*
 * node-crisp-api
 *
 * Copyright 2022, Crisp IM SAS
 * Author: Baptiste Jamin <baptiste@crisp.chat>
 */


"use strict";


/**
 * Crisp Website Service
 * @class
 * @classdesc This is the Crisp Website Service
 */
function Website() {
  /**
   * @private
   * @type {Array}
  */
  this._resources = [
    "WebsiteBase",
    "WebsiteAnalytics",
    "WebsiteAvailability",
    "WebsiteBatch",
    "WebsiteCampaign",
    "WebsiteConversation",
    "WebsiteOperator",
    "WebsitePeople",
    "WebsiteHelpdesk",
    "WebsiteSettings",
    "WebsiteVerify",
    "WebsiteVisitors"
  ];
}


module.exports = Website;
