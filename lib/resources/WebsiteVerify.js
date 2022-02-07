/*
 * node-crisp-api
 *
 * Copyright 2021, Crisp IM SAS
 * Author: Valerian Saliou <valerian@valeriansaliou.name>
 */


"use strict";


/**
 * Crisp WebsiteVerify Resource
 * @class
 * @classdesc This is the Crisp Website Verify Resource
 */
function WebsiteVerify(service, crisp) {
  /**
   * Get Verify Settings
   * @memberof WebsiteVerify
   * @method getVerifySettings
   * @return Promise
   */
  service.getVerifySettings = function(websiteID) {
    return crisp.get(
      crisp._prepareRestUrl(["website", websiteID, "verify", "settings"])
    );
  };

  /**
   * Update Verify Settings
   * @memberof WebsiteVerify
   * @method updateVerifySettings
   * @return Promise
   */
  service.updateVerifySettings = function(websiteID, settings) {
    return crisp.patch(
      crisp._prepareRestUrl(["website", websiteID, "verify", "settings"]),

      null, settings
    );
  };

  /**
   * Get Verify Key
   * @memberof WebsiteVerify
   * @method getVerifyKey
   * @return Promise
   */
  service.getVerifyKey = function(websiteID) {
    return crisp.get(
      crisp._prepareRestUrl(["website", websiteID, "verify", "key"])
    );
  };

  /**
   * Roll Verify Key
   * @memberof WebsiteVerify
   * @method rollVerifyKey
   * @return Promise
   */
  service.rollVerifyKey = function(websiteID) {
    return crisp.post(
      crisp._prepareRestUrl(["website", websiteID, "verify", "key"])
    );
  };
}


module.exports = WebsiteVerify;
