/*
 * node-crisp-api
 *
 * Copyright 2021, Crisp IM SARL
 * Author: Baptiste Jamin <baptiste@crisp.chat>
 */


"use strict";


/**
 * Crisp PluginSubscription Resource
 * @class
 * @classdesc This is the Crisp Plugin Subscriptions Resource
 */
function PluginSubscription(crisp) {
  /**
   * List All Active Subscriptions
   * @memberof PluginSubscription
   * @method listAllActiveSubscriptions
   * @return Promise
   */
  this.listAllActiveSubscriptions = function() {
    return crisp.get(
      crisp._prepareRestUrl(["plugins", "subscription"]), {}
    );
  };

  /**
   * List Subscriptions For A Website
   * @memberof PluginSubscription
   * @method listSubscriptionsForWebsite
   * @return Promise
   */
  this.listSubscriptionsForWebsite = function(websiteId) {
    return crisp.get(
      crisp._prepareRestUrl(["plugins", "subscription", websiteId]), {}
    );
  };

  /**
   * Get Subscription Details
   * @memberof PluginSubscription
   * @method getSubscriptionDetails
   * @return Promise
   */
  this.getSubscriptionDetails = function(websiteId, pluginId) {
    return crisp.get(
      crisp._prepareRestUrl(["plugins", "subscription", websiteId, pluginId])
    );
  };

  /**
   * Subscribe Website To Plugin
   * @memberof PluginSubscription
   * @method subscribeWebsiteToPlugin
   * @return Promise
   */
  this.subscribeWebsiteToPlugin = function(websiteId, pluginId) {
    return crisp.post(
      crisp._prepareRestUrl(["plugins", "subscription", websiteId]),

      {},

      {
        pluginId : pluginId
      }
    );
  };

  /**
   * Unsubscribe Plugin From Website
   * @memberof PluginSubscription
   * @method unsubscribePluginFromWebsite
   * @return Promise
   */
  this.unsubscribePluginFromWebsite = function(websiteId, pluginId) {
    return crisp.delete(
      crisp._prepareRestUrl(["plugins", "subscription", websiteId, pluginId])
    );
  };

  /**
   * Get Subscription Settings
   * @memberof PluginSubscription
   * @method getSubscriptionSettings
   * @return Promise
   */
  this.getSubscriptionSettings = function(websiteId, pluginId) {
    return crisp.get(
      crisp._prepareRestUrl([
        "plugins", "subscription", websiteId, pluginId, "settings"
      ])
    );
  };

  /**
   * Save Subscription Settings
   * @memberof PluginSubscription
   * @method saveSubscriptionSettings
   * @return Promise
   */
  this.saveSubscriptionSettings = function(websiteId, pluginId, settings) {
    return crisp.put(
      crisp._prepareRestUrl([
        "plugins", "subscription", websiteId, pluginId, "settings"
      ]),

      {}, settings
    );
  };

  /**
   * Update Subscription Settings
   * @memberof PluginSubscription
   * @method updateSubscriptionSettings
   * @return Promise
   */
  this.updateSubscriptionSettings = function(websiteId, pluginId, settings) {
    return crisp.patch(
      crisp._prepareRestUrl([
        "plugins", "subscription", websiteId, pluginId, "settings"
      ]),

      {}, settings
    );
  };

  /**
   * Forward Plugin Payload To Channel
   * @memberof PluginSubscription
   * @method forwardPluginPayloadToChannel
   * @return Promise
   */
  this.forwardPluginPayloadToChannel = function(websiteID, pluginID, payload) {
    return crisp.post(
      crisp._prepareRestUrl([
        "plugins", "subscription", websiteId, pluginId, "channel"
      ]),

      {}, payload
    );
  };

  /**
   * Dispatch Plugin Event
   * @memberof PluginSubscription
   * @method dispatchPluginEvent
   * @return Promise
   */
  this.dispatchPluginEvent = function(websiteID, pluginID, payload) {
    return crisp.post(
      crisp._prepareRestUrl([
        "plugins", "subscription", websiteId, pluginId, "event"
      ]),

      {}, payload
    );
  };
}


module.exports = PluginSubscription;
