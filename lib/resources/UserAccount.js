/*
 * Bundle: Ressources / UserAccount
 * Project: Crisp - Node API
 * Author: Baptiste Jamin http://jamin.me/
 * Copyright: 2016, Crisp IM
 */

"use strict";

var rest = require("restler");
var Q    = require("q");

/**
 * Crisp UserAccount Ressource
 * @class
 * @classdesc This is the Crisp User Account Ressource
 */
function UserAccount(crisp) {

  /**
   * Get user
   * @memberof UserAccount
   * @method get
   * @return Promise
   */
  this.get = function() {
    return Q.Promise(function(resolve, reject) {

      rest.get(crisp._prepareRestUrl(["user", "account"]), {
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
   * Create a user
   * @memberof UserAccount
   * @method create
   * @param {Object} user
   * @param {string} user.email - User email
   * @param {string} user.password - User password
   * @param {string} user.first_name - User first name
   * @param {string} user.last_name - User last name
   * @return Promise
   */
  this.create = function(data) {
    return Q.Promise(function(resolve, reject) {

      rest.postJson(crisp._prepareRestUrl(["user", "account"]), data)
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

module.exports = UserAccount;

