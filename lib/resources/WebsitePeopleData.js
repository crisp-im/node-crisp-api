/*
 * Bundle: Ressources / WebsitePeopleData
 * Project: Crisp - Node API
 * Author: Baptiste Jamin http://jamin.me/
 * Copyright: 2016, Crisp IM
 */

"use strict";

var rest = require("restler");
var Q    = require("q");
var _    = require("lodash");

/**
 * Crisp WebsitePeopleData Ressource
 * @class
 * @classdesc This is the Crisp Website People Data Ressource
 */
function WebsitePeopleData(crisp) {

  /**
   * Get one people data
   * @memberof WebsitePeopleData
   * @method getOne
   * @param {string} websiteId
   * @param {string} peopleId
   * @return Promise
   */
  this.getOne = function(websiteId, peopleId) {
    return Q.Promise(function(resolve, reject) {

      rest.get(crisp._prepareRestUrl(
        ["website", websiteId, "people", "data", peopleId]), {
          username : crisp.auth.identifier,
          password : crisp.auth.key
        }
      )
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
   * Update one people data
   * @memberof WebsitePeopleData
   * @method updateOne
   * @param {string} websiteId
   * @param {string} peopleId
   * @param {Object} data
   * @return Promise
   */
  this.updateOne = function(websiteId, peopleId, data) {
    return Q.Promise(function(resolve, reject) {
      rest.putJson(crisp._prepareRestUrl(
        ["website", websiteId, "people", "data", peopleId]), data,
        {
          username : crisp.auth.identifier,
          password : crisp.auth.key
        }
      )
        .on('success', function(response) {
          return resolve(response.data);
        })
        .on('error', function(error, response) {
          return reject(error);
        })
        .on('fail', function(error, response) {
          return reject(new Error(error.reason));
        });
    });
  };
}

module.exports = WebsitePeopleData;

