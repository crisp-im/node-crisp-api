/*
 * Bundle: Ressources / UserSession
 * Project: Crisp - Node API
 * Author: Baptiste Jamin http://jamin.me/
 * Copyright: 2016, Crisp IM
 */

"use strict";

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
    return crisp.post(crisp._prepareRestUrl(["user", "session", "login"]), {}, {
      email : email,
      password : password
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
    return crisp.post(crisp._prepareRestUrl(["user", "session", "recover"]), {}, {
      email : email
    });
  };

  /**
   * Logout
   * @memberof UserSession
   * @method logout
   * @return Promise
   */
  this.logout = function() {
    return crisp.post(crisp._prepareRestUrl(["user", "session", "logout"]), {}, {});
  };
}

module.exports = UserSession;

