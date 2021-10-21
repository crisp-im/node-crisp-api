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
 * @classdesc This is the Crisp Plugin Subscription Resource
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
  this.listSubscriptionsForWebsite = function(websiteID) {
    return crisp.get(
      crisp._prepareRestUrl(["plugins", "subscription", websiteID]), {}
    );
  };

  /**
   * Get Subscription Details
   * @memberof PluginSubscription
   * @method getSubscriptionDetails
   * @return Promise
   */
  this.getSubscriptionDetails = function(websiteID, pluginID) {
    return crisp.get(
      crisp._prepareRestUrl(["plugins", "subscription", websiteID, pluginID])
    );
  };

  /**
   * Subscribe Website To Plugin
   * @memberof PluginSubscription
   * @method subscribeWebsiteToPlugin
   * @return Promise
   */
  this.subscribeWebsiteToPlugin = function(websiteID, pluginID) {
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
   * @return Promise
   */
  this.unsubscribePluginFromWebsite = function(websiteID, pluginID) {
    return crisp.delete(
      crisp._prepareRestUrl(["plugins", "subscription", websiteID, pluginID])
    );
  };

  /**
   * Get Subscription Settings
   * @memberof PluginSubscription
   * @method getSubscriptionSettings
   * @return Promise
   */
  this.getSubscriptionSettings = function(websiteID, pluginID) {
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
   * @return Promise
   */
  this.saveSubscriptionSettings = function(websiteID, pluginID, settings) {
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
   * @return Promise
   */
  this.updateSubscriptionSettings = function(websiteID, pluginID, settings) {
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
   * @return Promise
   */
  this.forwardPluginPayloadToChannel = function(websiteID, pluginID, payload) {
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
   * @return Promise
   */
  this.dispatchPluginEvent = function(websiteID, pluginID, payload) {
    return crisp.post(
      crisp._prepareRestUrl([
        "plugins", "subscription", websiteID, pluginID, "event"
      ]),

      null, payload
    );
  };
}


module.exports = PluginSubscription;
