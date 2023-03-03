/*
 * node-crisp-api
 *
 * Copyright 2022, Crisp IM SAS
 * Author: Baptiste Jamin <baptiste@crisp.chat>
 */


"use strict";


/**
 * Crisp PluginConnect Resource
 * @class
 * @classdesc This is the Crisp Plugin Connect Resource
 */
function PluginConnect(service, crisp) {
  /**
   * Get Connect Account
   * @memberof PluginConnect
   * @public
   * @method getConnectAccount
   * @return {Promise}
   */
  service.getConnectAccount = function() {
    return crisp.get(
      crisp._prepareRestUrl(["plugin", "connect", "account"]), {}
    );
  };

  /**
   * Check Connect Session Validity
   * @memberof PluginConnect
   * @public
   * @method checkConnectSessionValidity
   * @return {Promise}
   */
  service.checkConnectSessionValidity = function() {
    return crisp.head(
      crisp._prepareRestUrl(["plugin", "connect", "session"]), {}
    );
  };

  /**
   * List All Connect Websites
   * @memberof PluginConnect
   * @public
   * @method listAllConnectWebsites
   * @param {number} pageNumber
   * @param {boolean} [filterConfigured]
   * @param {string} [dateSince]
   * @return {Promise}
   */
  service.listAllConnectWebsites = function(
    pageNumber, filterConfigured, dateSince
  ) {
    dateSince = (dateSince || null);

    // Generate query
    var _query = {
      filter_configured : (
        (filterConfigured === true) ? "1" : "0"
      )
    };

    if (dateSince !== null) {
      _query.date_since = dateSince;
    }

    return crisp.get(
      crisp._prepareRestUrl([
        "plugin", "connect", "websites", "all", pageNumber
      ]),

      _query
    );
  };

  /**
   * Get Connect Endpoints
   * @memberof PluginConnect
   * @public
   * @method getConnectEndpoints
   * @return {Promise}
   */
  service.getConnectEndpoints = function() {
    return crisp.get(
      crisp._prepareRestUrl(["plugin", "connect", "endpoints"]), {}
    );
  };
}


module.exports = PluginConnect;
