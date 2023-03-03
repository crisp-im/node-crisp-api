/*
 * node-crisp-api
 *
 * Copyright 2022, Crisp IM SAS
 * Author: Valerian Saliou <valerian@valeriansaliou.name>
 */


"use strict";


/**
 * Crisp WebsiteAnalytics Resource
 * @class
 * @classdesc This is the Crisp Website Analytics Resource
 */
function WebsiteAnalytics(service, crisp) {
  /**
   * Acquire Analytics Points
   * @memberof WebsiteAnalytics
   * @public
   * @method acquireAnalyticsPoints
   * @param {string} websiteID
   * @param {string} pointType
   * @param {string} pointMetric
   * @param {string} dateFrom
   * @param {string} dateTo
   * @param {string} dateSplit
   * @param {string} classifier
   * @param {string} filterSecondary
   * @param {string} filterTertiary
   * @return {Promise}
   */
  service.acquireAnalyticsPoints = function(
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
   * @public
   * @method listAnalyticsFilters
   * @param {string} websiteID
   * @param {number} pageNumber
   * @param {string} pointType
   * @param {string} pointMetric
   * @param {string} dateFrom
   * @param {string} dateTo
   * @return {Promise}
   */
  service.listAnalyticsFilters = function(
    websiteID, pageNumber, pointType, pointMetric, dateFrom, dateTo
  ) {
    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteID, "analytics", pointType, pointMetric, "filters"
      ]),

      {
        date_from : dateFrom,
        date_to   : dateTo
      }
    );
  };

  /**
   * List Analytics Classifiers
   * @memberof WebsiteAnalytics
   * @public
   * @method listAnalyticsClassifiers
   * @param {string} websiteID
   * @param {number} pageNumber
   * @param {string} pointType
   * @param {string} pointMetric
   * @param {string} dateFrom
   * @param {string} dateTo
   * @return {Promise}
   */
  service.listAnalyticsClassifiers = function(
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
