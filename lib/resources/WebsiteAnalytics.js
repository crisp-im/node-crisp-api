/*
 * node-crisp-api
 *
 * Copyright 2021, Crisp IM SARL
 * Author: Valerian Saliou <valerian@valeriansaliou.name>
 */


"use strict";


/**
 * Crisp WebsiteAnalytics Resource
 * @class
 * @classdesc This is the Crisp Website Analytics Resource
 */
function WebsiteAnalytics(crisp) {
  /**
   * Acquire Analytics Points
   * @memberof WebsiteAnalytics
   * @method acquireAnalyticsPoints
   * @return Promise
   */
  this.acquireAnalyticsPoints = function(
    websiteID, pointType, pointMetric, dateFrom, dateTo, dateSplit, classifier,
      filterPrimary, filterSecondary, filterTertiary
  ) {
    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteID, "analytics", pointType, pointMetric, "points"
      ]),

      {
        date_from        : dateFrom,
        date_to          : dateTo,
        date_split       : dateSplit,
        classifier       : classifier,
        filter_primary   : filterPrimary,
        filter_secondary : filterSecondary,
        filter_tertiary  : filterTertiary
      }
    );
  };

  /**
   * List Analytics Filters
   * @memberof WebsiteAnalytics
   * @method listAnalyticsFilters
   * @return Promise
   */
  this.listAnalyticsFilters = function(
    websiteID, pageNumber, pointType, pointMetric, dateFrom, dateTo
  ) {
    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteID, "analytics", pointType, pointMetric, "filters"
      ]),

      {
        date_from : dateFrom,
        date_to          : dateTo
      }
    );
  };

  /**
   * List Analytics Classifiers
   * @memberof WebsiteAnalytics
   * @method listAnalyticsClassifiers
   * @return Promise
   */
  this.listAnalyticsClassifiers = function(
    websiteID, pageNumber, pointType, pointMetric, dateFrom, dateTo
  ) {
    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteID, "analytics", pointType, pointMetric, "classifiers"
      ]),

      {
        date_from : dateFrom,
        date_to   : dateTo
      }
    );
  };
}


module.exports = WebsiteAnalytics;
