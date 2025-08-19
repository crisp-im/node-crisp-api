/*
 * node-crisp-api
 *
 * Copyright 2022, Crisp IM SAS
 * Author: Baptiste Jamin <baptiste@crisp.chat>
 */

/**************************************************************************
 * IMPORTS
 ***************************************************************************/

// PROJECT: RESOURCES
import BaseResource from "./BaseResource";

/**************************************************************************
 * TYPES
 ***************************************************************************/

type PluginSubscription = {
  id?:            string;
  urn?:           string;
  type?:          string;
  category?:      string;
  name?:          string;
  summary?:       string;
  price?:         number;
  plans?:         PluginSubscriptionPlan[];
  icon?:          string;
  website_url?:   string;
  contact_url?:   string;
  terms_url?:     string;
  privacy_url?:   string;
  help_url?:      string;
  video_url?:     string;
  configurable?:  boolean;
  since?:         string;
  active?:        boolean;
  website_id?:    string;
  card_id?:       string;
}

type PluginSubscriptionPlan = {
  id?:     string;
  name?:   string;
  price?:  number;
}

type PluginSubscriptionSettings = {
  plugin_id?:       string;
  website_id?:      string;
  token?:           string;
  schema?:          object;
  settings?:        object;
  settings_form_url?: string;
  callback_url?:    string;
}

type PluginSubscriptionChannelForward = {
  namespace?:   string;
  identifier?:  string;
  payload?:     object;
}

type PluginSubscriptionEventDispatch = {
  name?:   string;
  data?:   object;
}

/**************************************************************************
 * CLASSES
 ***************************************************************************/

/**
 * Crisp PluginSubscription Resource
 */
class PluginSubscriptionService extends BaseResource {
  /**
   * List All Active Subscriptions
   */
  listAllActiveSubscriptions(): Promise<PluginSubscription[]> {
    return this.crisp.get(
      this.crisp.prepareRestUrl(["plugins", "subscription"])
    );
  };

  /**
   * List Subscriptions For A Website
   */
  listSubscriptionsForWebsite(
    websiteID: string
  ) : Promise<PluginSubscription[]> {
    return this.crisp.get(
      this.crisp.prepareRestUrl(["plugins", "subscription", websiteID])
    );
  };

  /**
   * Get Subscription Details
   */
  getSubscriptionDetails(
    websiteID: string, pluginID: string
  ) : Promise<PluginSubscription> {
    return this.crisp.get(
      this.crisp.prepareRestUrl(["plugins", "subscription", websiteID, pluginID])
    );
  };

  /**
   * Subscribe Website To Plugin
   */
  subscribeWebsiteToPlugin(websiteID: string, pluginID: string) {
    return this.crisp.post(
      this.crisp.prepareRestUrl(["plugins", "subscription", websiteID]),

      null,

      {
        plugin_id: pluginID
      }
    );
  };

  /**
   * Unsubscribe Plugin From Website
   */
  unsubscribePluginFromWebsite(websiteID: string, pluginID: string) {
    return this.crisp.delete(
      this.crisp.prepareRestUrl([
        "plugins", "subscription", websiteID, pluginID
      ])
    );
  };

  /**
   * Get Subscription Settings
   */
  getSubscriptionSettings(
    websiteID: string, pluginID: string
  ) : Promise<PluginSubscriptionSettings> {
    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "plugins", "subscription", websiteID, pluginID, "settings"
      ])
    );
  };

  /**
   * Save Subscription Settings
   */
  saveSubscriptionSettings(
    websiteID: string, pluginID: string, settings: object
  ) {
    return this.crisp.put(
      this.crisp.prepareRestUrl([
        "plugins", "subscription", websiteID, pluginID, "settings"
      ]),

      null, settings
    );
  };

  /**
   * Update Subscription Settings
   */
  updateSubscriptionSettings(
    websiteID: string, pluginID: string, settings: object
  ) {
    return this.crisp.patch(
      this.crisp.prepareRestUrl([
        "plugins", "subscription", websiteID, pluginID, "settings"
      ]),

      null, settings
    );
  };

  /**
   * Get Plugin Usage Bills
   */
  getPluginUsageBills(websiteID: string, pluginID: string) {
    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "plugins", "subscription", websiteID, pluginID, "bill", "usage"
      ])
    );
  };

  /**
   * Report Plugin Usage To Bill
   */
  reportPluginUsageToBill(websiteID: string, pluginID: string, usage: object) {
    return this.crisp.post(
      this.crisp.prepareRestUrl([
        "plugins", "subscription", websiteID, pluginID, "bill", "usage"
      ]),

      null, usage
    );
  };

  /**
   * Forward Plugin Payload To Channel
   */
  forwardPluginPayloadToChannel(
    websiteID: string, pluginID: string, payload: PluginSubscriptionChannelForward
  ) {
    return this.crisp.post(
      this.crisp.prepareRestUrl([
        "plugins", "subscription", websiteID, pluginID, "channel"
      ]),

      null, payload
    );
  };

  /**
   * Dispatch Plugin Event
   */
  dispatchPluginEvent(
    websiteID: string, pluginID: string, payload: PluginSubscriptionEventDispatch
  ) {
    return this.crisp.post(
      this.crisp.prepareRestUrl([
        "plugins", "subscription", websiteID, pluginID, "event"
      ]),

      null, payload
    );
  };
}

/**************************************************************************
 * EXPORTS
 ***************************************************************************/

export default PluginSubscriptionService;
