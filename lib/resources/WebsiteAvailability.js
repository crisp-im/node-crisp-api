/*
 * node-crisp-api
 *
 * Copyright 2021, Crisp IM SAS
 * Author: Valerian Saliou <valerian@valeriansaliou.name>
 */


"use strict";


/**
 * Crisp WebsiteAvailability Resource
 * @class
 * @classdesc This is the Crisp Website Availability Resource
 */
function WebsiteAvailability(service, crisp) {
  /**
   * Get Website Availability Status
   * @memberof WebsiteAvailability
   * @method getWebsiteAvailabilityStatus
   * @return Promise
   */
  service.getWebsiteAvailabilityStatus = function(websiteID) {
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
  service.listWebsiteOperatorAvailabilities = function(websiteID) {
    return crisp.get(
      crisp._prepareRestUrl(["website", websiteID, "availability", "operators"])
    );
  };
}


module.exports = WebsiteAvailability;
