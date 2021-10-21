/*
 * node-crisp-api
 *
 * Copyright 2021, Crisp IM SARL
 * Author: Baptiste Jamin <baptiste@crisp.chat>
 */


"use strict";


/**
 * Crisp PluginConnect Resource
 * @class
 * @classdesc This is the Crisp Plugin Connect Resource
 */
function PluginConnect(crisp) {
  /**
   * Resolves the current plugin account information.
   * @memberof PluginConnect
   * @method get
   * @return Promise
   */
  this.connectAccount = function() {
    return crisp.get(
      crisp._prepareRestUrl(["plugin", "connect", "account"]), {}
    );
  };

  /**
   * Checks whether the connected plugin session is valid or not.
   * @memberof PluginConnect
   * @method get
   * @return Promise
   */
  this.connectSession = function(websiteId) {
    return crisp.get(
      crisp._prepareRestUrl(["plugin", "connect", "session"]), {}
    );
  };

  /**
   * Lists all websites linked to connected plugin.
   * @memberof PluginConnect
   * @method get
   * @return Promise
   */
  this.listAllConnectWebsites = function(pageNumber, filterConfigured) {
    if (filterConfigured === true) {
      filterConfigured = 1;
    } else {
      filterConfigured = 0;
    }

    return crisp.get(
      crisp._prepareRestUrl([
        "plugin", "connect", "websites", "all", pageNumber
      ]),

      {
        filter_configured : filterConfigured
      }
    );
  };
}


module.exports = PluginConnect;
