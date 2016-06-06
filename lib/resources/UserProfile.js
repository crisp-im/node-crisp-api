/*
 * Bundle: Ressources / UserProfile
 * Project: Crisp - Node API
 * Author: Baptiste Jamin http://jamin.me/
 * Copyright: 2016, Crisp IM
 */

"use strict";

var rest = require("restler");
var Q    = require("q");

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
    return Q.Promise(function(resolve, reject) {

      rest.get(crisp._prepareRestUrl(["user", "account", "profile"]), {
        username : crisp.auth.identifier,
        password : crisp.auth.key
      })
        .on('success', function(response) {
          return resolve(response.data);
        })
        .on('error', function(error) {
          return reject(error);
        })
        .on('fail', function(error) {
          return reject(new Error(error.reason));
        });
    });
  };

  /**
   * Update user profile
   * @memberof UserProfile
   * @method update
   * @param {Object} diff - New profile parameters
   * @return Promise
   */
  this.update = function(diff) {
    return Q.Promise(function(resolve, reject) {

      rest.patchJson(crisp._prepareRestUrl(["user", "account", "profile"]),
        diff, {
          username : crisp.auth.identifier,
          password : crisp.auth.key
        })
          .on('success', function(response) {
            return resolve(response.data);
          })
          .on('error', function(error) {
            return reject(error);
          })
          .on('fail', function(error) {
            return reject(new Error(error.reason));
          });
    });
  };
}

module.exports = UserProfile;

