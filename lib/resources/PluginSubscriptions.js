/*
 * Bundle: Ressources / PluginSubscriptions
 * Project: Crisp - Node API
 * Author: Baptiste Jamin http://jamin.me/
 * Copyright: 2016, Crisp IM
 */

"use strict";

/**
 * Crisp PluginSubscriptions Ressource
 * @class
 * @classdesc This is the Crisp Plugin Subscriptions Ressource
 */
function PluginSubscriptions(crisp) {
  /**
   * List All Active Subscriptions
   * @memberof PluginSubscriptions
   * @method get
   * @return Promise
   */
  this.listAllActiveSubscriptions = function() {
    return crisp.get(crisp._prepareRestUrl(["plugins", "subscription"]), {});
  };

  /**
   * List Subscriptions For Website
   * @memberof PluginSubscriptions
   * @method get
   * @return Promise
   */
  this.listSubscriptionsForWebsite = function(websiteId) {
    return crisp.get(crisp._prepareRestUrl(["plugins", "subscription", websiteId]), {});
  };

  /**
   * Get Subscription Details
   * @memberof PluginSubscriptions
   * @method get
   * @return Promise
   */
  this.getSubscriptionDetails = function(websiteId, pluginId) {
    return crisp.get(crisp._prepareRestUrl(
      ["plugins", "subscription", websiteId, pluginId]
    ), {});
  };

  /**
   * Subscribe Website ToPlugin
   * @memberof PluginSubscriptions
   * @method get
   * @return Promise
   */
  this.subscribeWebsiteToPlugin = function(websiteId, pluginId) {
    return crisp.post(crisp._prepareRestUrl(["plugins", "subscription", websiteId]), {}, {
      pluginId : pluginId
    });
  };

  /**
   * Unsubscribe Plugin From Website
   * @memberof PluginSubscriptions
   * @method get
   * @return Promise
   */
  this.unsubscribePluginFromWebsite = function(websiteId, pluginId) {
    return crisp.delete(crisp._prepareRestUrl(["plugins", "subscription", websiteId, pluginId]), {}, {});
  };

  /**
   * Get Subscription Settings
   * @memberof PluginSubscriptions
   * @method get
   * @return Promise
   */
  this.getSubscriptionSettings = function(websiteId, pluginId) {
    return crisp.get(crisp._prepareRestUrl(["plugins", "subscription", websiteId, pluginId, "settings"]), {});
  };

  /**
   * Save Subscription Settings
   * @memberof PluginSubscriptions
   * @method put
   * @return Promise
   */
  this.saveSubscriptionSettings = function(websiteId, pluginId, settings) {
    return crisp.put(crisp._prepareRestUrl(["plugins", "subscription", websiteId, pluginId, "settings"]), {}, settings);
  };

  /**
   * Update Subscription Settings
   * @memberof PluginSubscriptions
   * @method patch
   * @return Promise
   */
  this.updateSubscriptionSettings = function(websiteId, pluginId, settings) {
    return crisp.patch(crisp._prepareRestUrl(["plugins", "subscription", websiteId, pluginId, "settings"]), {}, settings);
  };
}

module.exports = PluginSubscriptions;