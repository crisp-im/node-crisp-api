/*
 * node-crisp-api
 *
 * Copyright 2021, Crisp IM SARL
 * Author: Valerian Saliou <valerian@valeriansaliou.name>
 */


"use strict";


/**
 * Crisp WebsiteVisitors Resource
 * @class
 * @classdesc This is the Crisp Website Visitors Resource
 */
function WebsiteVisitors(crisp) {
  /**
   * Count Visitors
   * @memberof WebsiteVisitors
   * @method countVisitors
   * @return Promise
   */
  this.countVisitors = function() {
    return crisp.get(
      crisp._prepareRestUrl(["TODO"])
    );
  };

  /**
   * List Visitors
   * @memberof WebsiteVisitors
   * @method listVisitors
   * @return Promise
   */
  this.listVisitors = function() {
    return crisp.get(
      crisp._prepareRestUrl(["TODO"])
    );
  };

  /**
   * Pinpoint Visitors On A Map
   * @memberof WebsiteVisitors
   * @method pinpointVisitorsOnMap
   * @return Promise
   */
  this.pinpointVisitorsOnMap = function() {
    return crisp.get(
      crisp._prepareRestUrl(["TODO"])
    );
  };

  /**
   * Get Session Identifier From Token
   * @memberof WebsiteVisitors
   * @method getSessionIdentifierFromToken
   * @return Promise
   */
  this.getSessionIdentifierFromToken = function() {
    return crisp.get(
      crisp._prepareRestUrl(["TODO"])
    );
  };

  /**
   * Count Blocked Visitors
   * @memberof WebsiteVisitors
   * @method countBlockedVisitors
   * @return Promise
   */
  this.countBlockedVisitors = function() {
    return crisp.get(
      crisp._prepareRestUrl(["TODO"])
    );
  };

  /**
   * Count Blocked Visitors In Rule
   * @memberof WebsiteVisitors
   * @method countBlockedVisitorsInRule
   * @return Promise
   */
  this.countBlockedVisitorsInRule = function() {
    return crisp.get(
      crisp._prepareRestUrl(["TODO"])
    );
  };

  /**
   * Clear Blocked Visitors In Rule
   * @memberof WebsiteVisitors
   * @method clearBlockedVisitorsInRule
   * @return Promise
   */
  this.clearBlockedVisitorsInRule = function() {
    return crisp.delete(
      crisp._prepareRestUrl(["TODO"])
    );
  };
}


module.exports = WebsiteVisitors;
