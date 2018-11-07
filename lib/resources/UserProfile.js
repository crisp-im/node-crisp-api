/*
 * Bundle: Ressources / UserProfile
 * Project: Crisp - Node API
 * Author: Baptiste Jamin http://jamin.me/
 * Copyright: 2016, Crisp IM
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
    return crisp.get(crisp._prepareRestUrl(["user", "account", "profile"]));
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