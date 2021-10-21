/*
 * node-crisp-api
 *
 * Copyright 2021, Crisp IM SARL
 * Author: Valerian Saliou <valerian@valeriansaliou.name>
 */


"use strict";


/**
 * Crisp WebsiteVerify Resource
 * @class
 * @classdesc This is the Crisp Website Verify Resource
 */
function WebsiteVerify(crisp) {
  /**
   * Get Verify Settings
   * @memberof WebsiteVerify
   * @method getVerifySettings
   * @return Promise
   */
  this.getVerifySettings = function(websiteID) {
    return crisp.get(
      crisp._prepareRestUrl(["TODO"])
    );
  };

  /**
   * Update Verify Settings
   * @memberof WebsiteVerify
   * @method updateVerifySettings
   * @return Promise
   */
  this.updateVerifySettings = function(websiteID, settings) {
    return crisp.patch(
      crisp._prepareRestUrl(["TODO"]), null,

      {
        // TODO
      }
    );
  };

  /**
   * Get Verify Key
   * @memberof WebsiteVerify
   * @method getVerifyKey
   * @return Promise
   */
  this.getVerifyKey = function(websiteID) {
    return crisp.get(
      crisp._prepareRestUrl(["TODO"])
    );
  };

  /**
   * Roll Verify Key
   * @memberof WebsiteVerify
   * @method rollVerifyKey
   * @return Promise
   */
  this.rollVerifyKey = function(websiteID) {
    return crisp.post(
      crisp._prepareRestUrl(["TODO"]), null,

      {
        // TODO
      }
    );
  };
}


module.exports = WebsiteVerify;
