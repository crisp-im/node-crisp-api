/*
 * node-crisp-api
 *
 * Copyright 2022, Crisp IM SAS
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
   * @public
   * @method checkWebsiteExists
   * @param {string} domain
   * @return {Promise}
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
   * @public
   * @method createWebsite
   * @param {object} websiteData
   * @return {Promise}
   */
  service.createWebsite = function(websiteData) {
    return crisp.post(
      crisp._prepareRestUrl(["website"]), null, websiteData
    );
  };

  /**
   * Get A Website
   * @memberof WebsiteBase
   * @public
   * @method getWebsite
   * @param {string} websiteID
   * @return {Promise}
   */
  service.getWebsite = function(websiteID) {
    return crisp.get(
      crisp._prepareRestUrl(["website", websiteID])
    );
  };

  /**
   * Delete A Website
   * @memberof WebsiteBase
   * @public
   * @method deleteWebsite
   * @param {string} websiteID
   * @param {object} verify
   * @return {Promise}
   */
  service.deleteWebsite = function(websiteID, verify) {
    return crisp.delete(
      crisp._prepareRestUrl(["website", websiteID]), null,

      {
        verify : verify
      }
    );
  };

  /**
   * Abort Website Deletion
   * @memberof WebsiteBase
   * @public
   * @method abortWebsiteDeletion
   * @param {string} websiteID
   * @return {Promise}
   */
  service.abortWebsiteDeletion = function(websiteID) {
    return crisp.delete(
      crisp._prepareRestUrl(["website", websiteID, "expunge"])
    );
  };
}


module.exports = WebsiteBase;

