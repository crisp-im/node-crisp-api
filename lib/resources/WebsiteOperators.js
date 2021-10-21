/*
 * node-crisp-api
 *
 * Copyright 2021, Crisp IM SARL
 * Author: Baptiste Jamin <baptiste@crisp.chat>
 */


"use strict";


/**
 * Crisp WebsiteOperators Resource
 * @class
 * @classdesc This is the Crisp Operators Resource
 */
function WebsiteOperators(crisp) {
  /**
   * Get all operators
   * @memberof WebsiteOperators
   * @method getList
   * @param {string} websiteId
   * @return Promise
   */
  this.getList = function(websiteId) {
    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteId, "operators", "list"
      ]),

      {}
    );
  };

  /**
   * Get one operator
   * @memberof WebsiteOperators
   * @method getOne
   * @param {string} websiteId
   * @param {string} operatorId
   * @return Promise
   */
  this.getOne = function(websiteId, operatorId) {
    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteId, "operator", operatorId
      ]),

      {}
    );
  };

  /**
   * Delete one operator
   * @memberof WebsiteOperators
   * @method deleteOne
   * @param {string} websiteId
   * @param {string} operatorId
   * @return Promise
   */
  this.deleteOne = function(websiteId, operatorId) {
    return crisp.delete(
      crisp._prepareRestUrl([
        "website", websiteId, "operator", operatorId
      ])
    );
  };

  /**
   * Update one operator
   * @memberof WebsiteOperators
   * @method updateOne
   * @param {string} websiteId
   * @param {string} operatorId
   * @param {Object} operator
   * @return Promise
   */
  this.updateOne = function(websiteId, operatorId, operator) {
    return crisp.patch(
      crisp._prepareRestUrl([
        "website", websiteId, "operator", operatorId
      ]),

      {}, operator
    );
  };

  /**
   * Create an operator
   * @memberof WebsiteOperators
   * @method createOne
   * @param {string} websiteId
   * @param {Object} operator
   * @return Promise
   */
  this.createOne = function(websiteId, operator) {
    return crisp.post(
      crisp._prepareRestUrl([
        "website", websiteId, "operator"
      ]),

      {}, operator
    );
  };

  /**
   * Get all active operators
   * @memberof WebsiteOperators
   * @method getListActive
   * @param {string} websiteId
   * @return Promise
   */
  this.getListActive = function(websiteId) {
    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteId, "operators", "active"
      ]),

      {}
    );
  };
}


module.exports = WebsiteOperators;

