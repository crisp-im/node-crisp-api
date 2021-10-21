/*
 * node-crisp-api
 *
 * Copyright 2021, Crisp IM SARL
 * Author: Valerian Saliou <valerian@valeriansaliou.name>
 */


"use strict";


/**
 * Crisp WebsiteAvailability Resource
 * @class
 * @classdesc This is the Crisp Website Availability Resource
 */
function WebsiteAvailability(crisp) {
  /**
   * Get Website Availability Status
   * @memberof WebsiteAvailability
   * @method getWebsiteAvailabilityStatus
   * @return Promise
   */
  this.getWebsiteAvailabilityStatus = function(websiteID) {
    return crisp.get(
      crisp._prepareRestUrl(["website", websiteID, "availability", "status"])
    );
  };

  /**
   * List Website Operator Availabilities
   * @memberof WebsiteAvailability
   * @method listWebsiteOperatorAvailabilities
   * @return Promise
   */
  this.listWebsiteOperatorAvailabilities = function(websiteID) {
    return crisp.get(
      crisp._prepareRestUrl(["website", websiteID, "availability", "operators"])
    );
  };
}


module.exports = WebsiteAvailability;
