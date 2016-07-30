/*
 * Bundle: Ressources / WebsiteSettings
 * Project: Crisp - Node API
 * Author: Baptiste Jamin http://jamin.me/
 * Copyright: 2016, Crisp IM
 */

"use strict";

var rest = require("restler");
var Q    = require("q");

/**
 * Crisp WebsiteSettings Ressource
 * @class
 * @classdesc This is the Crisp Website Settings Ressource
 */
function WebsiteSettings(crisp) {

  /**
   * get website settings
   * @memberof WebsiteStats
   * @method get
   * @param {string} websiteId
   * @return Promise
   */
  this.get = function(websiteId) {
    return Q.Promise(function(resolve, reject) {

      rest.get(crisp._prepareRestUrl(["website", websiteId, "settings"]), {
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
   * update website settings
   * @memberof WebsiteStats
   * @method update
   * @param {string} websiteId
   * @param {Object} new settings
   * @return Promise
   */
  this.update = function(websiteId, patch) {
    return Q.Promise(function(resolve, reject) {

      rest.patchJson(crisp._prepareRestUrl(["website", websiteId, "settings"]),
        patch,
        {
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

module.exports = WebsiteSettings;

