/*
 * Bundle: Ressources / PluginSubscriptions
 * Project: Crisp - Node API
 * Copyright: 2021, Crisp IM
 */

"use strict";

/**
 * Crisp PluginConnect Ressource
 * @class
 * @classdesc This is the Crisp Plugin Connect Ressource
 * @link https://docs.crisp.chat/api/v1/#plugin-plugin-connect-account
 */
function PluginConnect(crisp) {
  /**
   * Resolves the current plugin account information.
   * @memberof PluginConnect
   * @method get
   * @return Promise
   */
  this.connectAccount = function() {
    return crisp.get(crisp._prepareRestUrl(["plugin", "connect", "account"]));
  };

  /**
   * Checks whether the connected plugin session is valid or not.
   * @memberof PluginConnect
   * @method get
   * @return Promise
   */
  this.connectSession = function(websiteId) {
    return crisp.get(crisp._prepareRestUrl(["plugin", "connect", "session"]));
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

    return crisp.get(crisp._prepareRestUrl(
      ["plugin", "connect", "websites", "all", pageNumber]), {
        filter_configured : filterConfigured
      });
  };
}

module.exports = PluginConnect;