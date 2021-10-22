/*
 * node-crisp-api
 *
 * Copyright 2021, Crisp IM SARL
 * Author: Baptiste Jamin <baptiste@crisp.chat>
 */


"use strict";


/**
 * Crisp WebsiteBase Resource
 * @class
 * @classdesc This is the Crisp Website Base Resource
 */
function WebsiteBase(service, crisp) {
  /**
   * Check If Website Exists
   * @memberof WebsiteBase
   * @method checkWebsiteExists
   * @return Promise
   */
  service.checkWebsiteExists = function(domain) {
    return crisp.head(
      crisp._prepareRestUrl(["website"]),

      {
        domain : domain
      }
    );
  };

  /**
   * Create Website
   * @memberof WebsiteBase
   * @method createWebsite
   * @return Promise
   */
  service.createWebsite = function(websiteData) {
    return crisp.post(
      crisp._prepareRestUrl(["website"]), null, websiteData
    );
  };

  /**
   * Get A Website
   * @memberof WebsiteBase
   * @method getWebsite
   * @return Promise
   */
  service.getWebsite = function(websiteID) {
    return crisp.get(
      crisp._prepareRestUrl(["website", websiteID])
    );
  };

  /**
   * Delete A Website
   * @memberof WebsiteBase
   * @method deleteWebsite
   * @return Promise
   */
  service.deleteWebsite = function(websiteID, verify) {
    return crisp.delete(
      crisp._prepareRestUrl(["website", websiteID]), null,

      {
        verify : verify
      }
    );
  };
}


module.exports = WebsiteBase;

