/*
 * Bundle: Ressources / WebsiteStats
 * Project: Crisp - Node API
 * Author: Baptiste Jamin http://jamin.me/
 * Copyright: 2016, Crisp IM
 */

"use strict";

var rest = require("restler");
var Q    = require("q");

/**
 * Crisp WebsiteStats Ressource
 * @class
 * @classdesc This is the Crisp Website Stats Ressource
 */
function WebsiteStats(crisp) {

  /**
   * get website stats
   * @memberof WebsiteStats
   * @method get
   * @param {string} websiteId
   * @return Promise
   */
  this.get = function(websiteId) {
    return Q.Promise(function(resolve, reject) {

      rest.get(crisp._prepareRestUrl(["website", websiteId, "stats"]), {
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

module.exports = WebsiteStats;

