/*
 * node-crisp-api
 *
 * Copyright 2021, Crisp IM SAS
 * Author: Valerian Saliou <valerian@valeriansaliou.name>
 */


"use strict";


/**
 * Crisp WebsiteVisitors Resource
 * @class
 * @classdesc This is the Crisp Website Visitors Resource
 */
function WebsiteVisitors(service, crisp) {
  /**
   * Count Visitors
   * @memberof WebsiteVisitors
   * @method countVisitors
   * @return Promise
   */
  service.countVisitors = function(websiteID) {
    return crisp.get(
      crisp._prepareRestUrl(["website", websiteID, "visitors", "count"])
    );
  };

  /**
   * List Visitors
   * @memberof WebsiteVisitors
   * @method listVisitors
   * @return Promise
   */
  service.listVisitors = function(websiteID, pageNumber) {
    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteID, "visitors", "list", pageNumber
      ])
    );
  };

  /**
   * Pinpoint Visitors On A Map
   * @memberof WebsiteVisitors
   * @method pinpointVisitorsOnMap
   * @return Promise
   */
  service.pinpointVisitorsOnMap = function(
    websiteID, centerLongitude, centerLatitude, centerRadius
  ) {
    // Generate query
    var _query = {};

    if (typeof centerLongitude === "number") {
      _query.center_longitude = ("" + centerLongitude);
    }
    if (typeof centerLatitude === "number") {
      _query.center_latitude = ("" + centerLatitude);
    }
    if (typeof centerRadius === "number") {
      _query.center_radius = ("" + centerRadius);
    }

    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteID, "visitors", "map"
      ]),

      _query
    );
  };

  /**
   * Get Session Identifier From Token
   * @memberof WebsiteVisitors
   * @method getSessionIdentifierFromToken
   * @return Promise
   */
  service.getSessionIdentifierFromToken = function(websiteID, tokenID) {
    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteID, "visitors", "token", tokenID
      ])
    );
  };

  /**
   * Count Blocked Visitors
   * @memberof WebsiteVisitors
   * @method countBlockedVisitors
   * @return Promise
   */
  service.countBlockedVisitors = function(websiteID) {
    return crisp.get(
      crisp._prepareRestUrl(["website", websiteID, "visitors", "blocked"])
    );
  };

  /**
   * Count Blocked Visitors In Rule
   * @memberof WebsiteVisitors
   * @method countBlockedVisitorsInRule
   * @return Promise
   */
  service.countBlockedVisitorsInRule = function(websiteID, rule) {
    return crisp.get(
      crisp._prepareRestUrl(["website", websiteID, "visitors", "blocked", rule])
    );
  };

  /**
   * Clear Blocked Visitors In Rule
   * @memberof WebsiteVisitors
   * @method clearBlockedVisitorsInRule
   * @return Promise
   */
  service.clearBlockedVisitorsInRule = function(websiteID, rule) {
    return crisp.delete(
      crisp._prepareRestUrl(["website", websiteID, "visitors", "blocked", rule])
    );
  };
}


module.exports = WebsiteVisitors;
