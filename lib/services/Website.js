/*
 * node-crisp-api
 *
 * Copyright 2021, Crisp IM SAS
 * Author: Baptiste Jamin <baptiste@crisp.chat>
 */


"use strict";


/**
 * Crisp Website Service
 * @class
 * @classdesc This is the Crisp Website Service
 */
function Website() {
  this._resources = [
    "WebsiteBase",
    "WebsiteAnalytics",
    "WebsiteAvailability",
    "WebsiteBatch",
    "WebsiteCampaign",
    "WebsiteConversation",
    "WebsiteOperator",
    "WebsitePeople",
    "WebsiteSettings",
    "WebsiteVerify",
    "WebsiteVisitors"
  ];
}


module.exports = Website;
