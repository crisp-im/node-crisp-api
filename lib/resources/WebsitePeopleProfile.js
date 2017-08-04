/*
 * Bundle: Ressources / WebsitePeopleProfile
 * Project: Crisp - Node API
 * Author: Baptiste Jamin http://jamin.me/
 * Copyright: 2016, Crisp IM
 */

"use strict";

var rest = require("restler");
var Q    = require("q");

/**
 * Crisp WebsitePeople Ressource
 * @class
 * @classdesc This is the Crisp Website People Ressource
 */
function WebsitePeopleProfile(crisp) {

  /**
   * Get all people profiles
   * @memberof WebsitePeopleProfile
   * @method getList
   * @param {string} websiteId
   * @return Promise
   */
  this.getList = function(websiteId) {
    return Q.Promise(function(resolve, reject) {

      rest.get(crisp._prepareRestUrl(["website", websiteId, "people", "profiles"]), {
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
   * Get one people profile
   * @memberof WebsitePeopleProfile
   * @method getOne
   * @param {string} websiteId
   * @param {string} peopleId
   * @return Promise
   */
  this.getOne = function(websiteId, peopleId) {
    return Q.Promise(function(resolve, reject) {

      rest.get(crisp._prepareRestUrl(
        ["website", websiteId, "people", "profile", operatorId]), {
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
   * Delete one people profile
   * @memberof WebsitePeopleProfile
   * @method deleteOne
   * @param {string} websiteId
   * @param {string} peopleId
   * @return Promise
   */
  this.deleteOne = function(websiteId, peopleId) {
    return Q.Promise(function(resolve, reject) {

      rest.del(crisp._prepareRestUrl(
        ["website", websiteId, "people", "profile", peopleId]), {
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
   * Update one people profile
   * @memberof WebsitePeopleProfile
   * @method updateOne
   * @param {string} websiteId
   * @param {string} peopleId
   * @param {Object} peopleProfile
   * @return Promise
   */
  this.updateOne = function(websiteId, peopleId, peopleProfile) {
    return Q.Promise(function(resolve, reject) {

      rest.patch(crisp._prepareRestUrl(
        ["website", websiteId, "people", "profile", peopleId]), peopleProfile,
        {
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
   * Create a people profile
   * @memberof WebsitePeopleProfile
   * @method createOne
   * @param {string} websiteId
   * @param {Object} people
   * @param {string} people.email - People profile email
   * @param {Object} people.person - People person object
   * @return Promise
   */
  this.createOne = function(websiteId, operator) {
    return Q.Promise(function(resolve, reject) {

      rest.postJson(crisp._prepareRestUrl(["website", websiteId, "people", "profile"]),
        operator, {
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

module.exports = WebsitePeopleProfile;

