/*
 * Bundle: Ressources / UserSession
 * Project: Crisp - Node API
 * Author: Baptiste Jamin http://jamin.me/
 * Copyright: 2016, Crisp IM
 */

"use strict";

var rest = require("restler");
var Q    = require("q");

/**
 * Crisp UserSession Ressource
 * @class
 * @classdesc This is the Crisp User Session Ressource to manage Login, Logout, etc
 */
function UserSession(crisp) {

  /**
   * Login with Email and Password
   * @memberof UserSession
   * @method loginWithEmail
   * @param {sring} email
   * @param {sring} password
   * @return Promise
   */
  this.loginWithEmail = function(email, password) {
    return Q.Promise(function(resolve, reject) {
      rest.postJson(crisp._prepareRestUrl(["user", "session", "login"]), {
        email : email,
        password : password
      })
        .on('success', function(response) {
          crisp.authenticate(
            response.data.identifier,
            response.data.key
          );

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
   * Recover Password
   * @memberof UserSession
   * @method loginWithEmail
   * @param {sring} email
   * @param {sring} password
   * @return Promise
   */
  this.recoverPassword = function(email) {
    return Q.Promise(function(resolve, reject) {
      rest.postJson(crisp._prepareRestUrl(["user", "session", "recover"]), {
        email : email
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
   * Logout
   * @memberof UserSession
   * @method logout
   * @return Promise
   */
  this.logout = function() {
    return Q.Promise(function(resolve, reject) {
      rest.postJson(crisp._prepareRestUrl(["user", "session", "logout"]), {})
        .on('success', function(response) {
          crisp.auth = {};
          return resolve();
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

module.exports = UserSession;

