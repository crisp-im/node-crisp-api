/*
 * node-crisp-api
 *
 * Copyright 2022, Crisp IM SAS
 * Author: Valerian Saliou <valerian@valeriansaliou.name>
 */


"use strict";


/**
 * Crisp WebsiteBatch Resource
 * @class
 * @classdesc This is the Crisp Website Batch Resource
 */
function WebsiteBatch(service, crisp) {
  /**
   * Batch Resolve Conversations
   * @memberof WebsiteBatch
   * @public
   * @method batchResolveConversations
   * @param {string} websiteID
   * @param {object} operation
   * @return {Promise}
   */
  service.batchResolveConversations = function(websiteID, operation) {
    return crisp.patch(
      crisp._prepareRestUrl(["website", websiteID, "batch", "resolve"]),

      null, operation
    );
  };

  /**
   * Batch Read Conversations
   * @memberof WebsiteBatch
   * @public
   * @method batchReadConversations
   * @param {string} websiteID
   * @param {object} operation
   * @return {Promise}
   */
  service.batchReadConversations = function(websiteID, operation) {
    return crisp.patch(
      crisp._prepareRestUrl(["website", websiteID, "batch", "read"]),

      null, operation
    );
  };

  /**
   * Batch Remove Conversations
   * @memberof WebsiteBatch
   * @public
   * @method batchRemoveConversations
   * @param {string} websiteID
   * @param {object} operation
   * @return {Promise}
   */
  service.batchRemoveConversations = function(websiteID, operation) {
    return crisp.patch(
      crisp._prepareRestUrl(["website", websiteID, "batch", "remove"]),

      null, operation
    );
  };

  /**
   * Batch Remove People
   * @memberof WebsiteBatch
   * @public
   * @method batchRemovePeople
   * @param {string} websiteID
   * @param {object} people
   * @return {Promise}
   */
  service.batchRemovePeople = function(websiteID, people) {
    return crisp.patch(
      crisp._prepareRestUrl(["website", websiteID, "batch", "remove"]),

      null,

      {
        people : people
      }
    );
  };
}


module.exports = WebsiteBatch;
