/*
 * Bundle: Ressources / WebsiteOperator
 * Project: Crisp - Node API
 * Author: Baptiste Jamin http://jamin.me/
 * Copyright: 2016, Crisp IM
 */

"use strict";

var rest = require("restler");
var Q    = require("q");

/**
 * Crisp WebsiteOperator Ressource
 * @class
 * @classdesc This is the Crisp Operator Ressource
 */
function WebsiteOperator(crisp) {

  /**
   * Get all operators
   * @memberof WebsiteOperator
   * @method getList
   * @param {string} websiteId
   * @return Promise
   */
  this.getList = function(websiteId) {
    return Q.Promise(function(resolve, reject) {

      rest.get(crisp._prepareRestUrl(["website", websiteId, "operator"]), {
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
   * Get one operator
   * @memberof WebsiteOperator
   * @method getOne
   * @param {string} websiteId
   * @param {string} operatorId
   * @return Promise
   */
  this.getOne = function(websiteId, operatorId) {
    return Q.Promise(function(resolve, reject) {

      rest.get(crisp._prepareRestUrl(
        ["website", websiteId, "operator", operatorId]), {
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
   * Delete one operator
   * @memberof WebsiteOperator
   * @method deleteOne
   * @param {string} websiteId
   * @param {string} operatorId
   * @return Promise
   */
  this.deleteOne = function(websiteId, operatorId) {
    return Q.Promise(function(resolve, reject) {

      rest.del(crisp._prepareRestUrl(
        ["website", websiteId, "operator", operatorId]), {
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
   * Update one operator
   * @memberof WebsiteOperator
   * @method updateOne
   * @param {string} websiteId
   * @param {string} operatorId
   * @param {Object} operator
   * @param {string} operator.role - Operator role [owner, admin, member]
   * @return Promise
   */
  this.updateOne = function(websiteId, operatorId, operator) {
    return Q.Promise(function(resolve, reject) {

      rest.patch(crisp._prepareRestUrl(
        ["website", websiteId, "operator", operatorId]), operator,
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
   * Create an operator
   * @memberof WebsiteOperator
   * @method create
   * @param {string} websiteId
   * @param {Object} operator
   * @param {string} operator.email - Operator email
   * @param {string} operator.role - Operator role [owner, admin, member]
   * @return Promise
   */
  this.create = function(websiteId, operator) {
    return Q.Promise(function(resolve, reject) {

      rest.postJson(crisp._prepareRestUrl(["website", websiteId, "operator"]),
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

  /**
   * Delete an operator
   * @memberof WebsiteOperator
   * @method delete
   * @param {string} websiteId
   * @return Promise
   */
  this.delete = function(websiteId) {
    return Q.Promise(function(resolve, reject) {

      rest.del(crisp._prepareRestUrl(["website", websiteId]), {
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

module.exports = WebsiteOperator;

