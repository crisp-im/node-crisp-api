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
   * @public
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
   * @public
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
   * @public
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
   * @public
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
   * @public
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
   * @public
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
   * @public
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
   * @public
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
   * Get Plugin Usage Bills
   * @memberof PluginSubscription
   * @public
   * @method getPluginUsageBills
   * @param {string} websiteID
   * @param {string} pluginID
   * @return {Promise}
   */
  service.getPluginUsageBills = function(websiteID, pluginID) {
    return crisp.get(
      crisp._prepareRestUrl([
        "plugins", "subscription", websiteID, pluginID, "bill", "usage"
      ])
    );
  };

  /**
   * Report Plugin Usage To Bill
   * @memberof PluginSubscription
   * @public
   * @method reportPluginUsageToBill
   * @param {string} websiteID
   * @param {string} pluginID
   * @param {object} usage
   * @return {Promise}
   */
  service.reportPluginUsageToBill = function(websiteID, pluginID, usage) {
    return crisp.post(
      crisp._prepareRestUrl([
        "plugins", "subscription", websiteID, pluginID, "bill", "usage"
      ]),

      null, usage
    );
  };

  /**
   * Forward Plugin Payload To Channel
   * @memberof PluginSubscription
   * @public
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
   * @public
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
