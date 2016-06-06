/*
 * Bundle: Ressources / UserSchedule
 * Project: Crisp - Node API
 * Author: Baptiste Jamin http://jamin.me/
 * Copyright: 2016, Crisp IM
 */

"use strict";

var rest = require("restler");
var Q    = require("q");

/**
 * Crisp UserSchedule Ressource
 * @class
 * @classdesc This is the Crisp User Schedule Ressource.
 */
function UserSchedule(crisp) {

  /**
   * Get user schedule
   * @memberof UserSchedule
   * @method get
   * @return Promise
   */
  this.get = function() {
    return Q.Promise(function(resolve, reject) {

      rest.get(crisp._prepareRestUrl(["user", "account", "schedule"]), {
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
   * Update user schedule
   * @memberof UserSchedule
   * @method update
   * @param {Object} diff - New schedule parameters
   * @return Promise
   */
  this.update = function(diff) {
    return Q.Promise(function(resolve, reject) {

      rest.patchJson(crisp._prepareRestUrl(["user", "account", "notification"]),
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

module.exports = UserSchedule;

