/*
 * Bundle: Ressources / UserNotification
 * Project: Crisp - Node API
 * Author: Baptiste Jamin http://jamin.me/
 * Copyright: 2016, Crisp IM
 */

"use strict";

var rest = require("restler");
var Q    = require("q");

/**
 * Crisp UserNotification Ressource
 * @class
 * @classdesc This is the Crisp User Notification Ressource.
 */
function UserNotification(crisp) {

  /**
   * Get user notifications
   * @memberof UserNotification
   * @method get
   * @return Promise
   */
  this.get = function() {
    return Q.Promise(function(resolve, reject) {

      rest.get(crisp._prepareRestUrl(["user", "account", "notification"]), {
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
   * Update user notifications
   * @memberof UserNotification
   * @method update
   * @param {Object} diff - New notifcation parameters
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

module.exports = UserNotification;

