/*
 * Bundle: Ressources / UserWebsite
 * Project: Crisp - Node API
 * Author: Baptiste Jamin http://jamin.me/
 * Copyright: 2016, Crisp IM
 */

"use strict";

var rest = require("restler");
var Q    = require("q");

/**
 * Crisp UserWebsites Ressource
 * @class
 * @classdesc This is the Crisp User Websites Ressource
 */
function UserWebsites(crisp) {

  /**
   * Get user notifications
   * @memberof UserWebsites
   * @method get
   * @return Promise
   */
  this.get = function() {
    return Q.Promise(function(resolve, reject) {

      rest.get(crisp._prepareRestUrl(["user", "account", "websites"]), {
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

module.exports = UserWebsites;

