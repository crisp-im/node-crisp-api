/*
 * node-crisp-api
 *
 * Copyright 2021, Crisp IM SARL
 * Author: Baptiste Jamin <baptiste@crisp.chat>
 */

"use strict";

/**
 * Crisp UserProfile Ressource
 * @class
 * @classdesc This is the Crisp User Profile Ressource
 */
function UserProfile(crisp) {

  /**
   * Get user profile
   * @memberof UserProfile
   * @method get
   * @return Promise
   */
  this.get = function() {
    return crisp.get(crisp._prepareRestUrl(["user", "account", "profile"]), {});
  };

  /**
   * Update user profile
   * @memberof UserProfile
   * @method update
   * @param {Object} diff - New profile parameters
   * @return Promise
   */
  this.update = function(diff) {
    return crisp.patch(crisp._prepareRestUrl(["user", "account", "profile"]), {}, diff);
  };
}

module.exports = UserProfile;
