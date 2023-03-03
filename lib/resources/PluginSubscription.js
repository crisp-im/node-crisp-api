/*
 * node-crisp-api
 *
 * Copyright 2022, Crisp IM SAS
 * Author: Baptiste Jamin <baptiste@crisp.chat>
 */


"use strict";


/**
 * Crisp PluginSubscription Resource
 * @class
 * @classdesc This is the Crisp Plugin Subscription Resource
 */
function PluginSubscription(service, crisp) {
  /**
   * List All Active Subscriptions
   * @memberof PluginSubscription
   * @method listAllActiveSubscriptions
   * @return {Promise}
   */
  service.listAllActiveSubscriptions = function() {
    return crisp.get(
      crisp._prepareRestUrl(["plugins", "subscription"]), {}
    );
  };

  /**
   * List Subscriptions For A Website
   * @memberof PluginSubscription
   * @method listSubscriptionsForWebsite
   * @param {string} websiteID
   * @return {Promise}
   */
  service.listSubscriptionsForWebsite = function(websiteID) {
    return crisp.get(
      crisp._prepareRestUrl(["plugins", "subscription", websiteID]), {}
    );
  };

  /**
   * Get Subscription Details
   * @memberof PluginSubscription
   * @method getSubscriptionDetails
   * @param {string} websiteID
   * @param {string} pluginID
   * @return {Promise}
   */
  service.getSubscriptionDetails = function(websiteID, pluginID) {
    return crisp.get(
      crisp._prepareRestUrl(["plugins", "subscription", websiteID, pluginID])
    );
  };

  /**
   * Subscribe Website To Plugin
   * @memberof PluginSubscription
   * @method subscribeWebsiteToPlugin
   * @param {string} websiteID
   * @param {string} pluginID
   * @return {Promise}
   */
  service.subscribeWebsiteToPlugin = function(websiteID, pluginID) {
    return crisp.post(
      crisp._prepareRestUrl(["plugins", "subscription", websiteID]),

      null,

      {
        plugin_id : pluginID
      }
    );
  };

  /**
   * Unsubscribe Plugin From Website
   * @memberof PluginSubscription
   * @method unsubscribePluginFromWebsite
   * @param {string} websiteID
   * @param {string} pluginID
   * @return {Promise}
   */
  service.unsubscribePluginFromWebsite = function(websiteID, pluginID) {
    return crisp.delete(
      crisp._prepareRestUrl(["plugins", "subscription", websiteID, pluginID])
    );
  };

  /**
   * Get Subscription Settings
   * @memberof PluginSubscription
   * @method getSubscriptionSettings
   * @param {string} websiteID
   * @param {string} pluginID
   * @return {Promise}
   */
  service.getSubscriptionSettings = function(websiteID, pluginID) {
    return crisp.get(
      crisp._prepareRestUrl([
        "plugins", "subscription", websiteID, pluginID, "settings"
      ])
    );
  };

  /**
   * Save Subscription Settings
   * @memberof PluginSubscription
   * @method saveSubscriptionSettings
   * @param {string} websiteID
   * @param {string} pluginID
   * @param {object} settings
   * @return {Promise}
   */
  service.saveSubscriptionSettings = function(websiteID, pluginID, settings) {
    return crisp.put(
      crisp._prepareRestUrl([
        "plugins", "subscription", websiteID, pluginID, "settings"
      ]),

      null, settings
    );
  };

  /**
   * Update Subscription Settings
   * @memberof PluginSubscription
   * @method updateSubscriptionSettings
   * @param {string} websiteID
   * @param {string} pluginID
   * @param {object} settings
   * @return {Promise}
   */
  service.updateSubscriptionSettings = function(websiteID, pluginID, settings) {
    return crisp.patch(
      crisp._prepareRestUrl([
        "plugins", "subscription", websiteID, pluginID, "settings"
      ]),

      null, settings
    );
  };

  /**
   * Forward Plugin Payload To Channel
   * @memberof PluginSubscription
   * @method forwardPluginPayloadToChannel
   * @param {string} websiteID
   * @param {string} pluginID
   * @param {object} payload
   * @return {Promise}
   */
  service.forwardPluginPayloadToChannel = function(
    websiteID, pluginID, payload
  ) {
    return crisp.post(
      crisp._prepareRestUrl([
        "plugins", "subscription", websiteID, pluginID, "channel"
      ]),

      null, payload
    );
  };

  /**
   * Dispatch Plugin Event
   * @memberof PluginSubscription
   * @method dispatchPluginEvent
   * @param {string} websiteID
   * @param {string} pluginID
   * @param {object} payload
   * @return {Promise}
   */
  service.dispatchPluginEvent = function(websiteID, pluginID, payload) {
    return crisp.post(
      crisp._prepareRestUrl([
        "plugins", "subscription", websiteID, pluginID, "event"
      ]),

      null, payload
    );
  };
}


module.exports = PluginSubscription;
