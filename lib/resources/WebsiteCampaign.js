/*
 * node-crisp-api
 *
 * Copyright 2021, Crisp IM SARL
 * Author: Valerian Saliou <valerian@valeriansaliou.name>
 */


"use strict";


/**
 * Crisp WebsiteCampaign Resource
 * @class
 * @classdesc This is the Crisp Website Campaign Resource
 */
function WebsiteCampaign(crisp) {
  /**
   * List Campaigns
   * @memberof WebsiteCampaign
   * @method listCampaigns
   * @return Promise
   */
  this.listCampaigns = function(websiteID, pageNumber) {
    return crisp.get(
      crisp._prepareRestUrl(["TODO"])
    );
  };

  /**
   * List Campaign Tags
   * @memberof WebsiteCampaign
   * @method listCampaignTags
   * @return Promise
   */
  this.listCampaignTags = function(websiteID) {
    return crisp.get(
      crisp._prepareRestUrl(["TODO"])
    );
  };

  /**
   * List Campaign Templates
   * @memberof WebsiteCampaign
   * @method listCampaignTemplates
   * @return Promise
   */
  this.listCampaignTemplates = function(websiteID, pageNumber) {
    return crisp.get(
      crisp._prepareRestUrl(["TODO"])
    );
  };

  /**
   * Create A New Campaign Template
   * @memberof WebsiteCampaign
   * @method createNewCampaignTemplate
   * @return Promise
   */
  this.createNewCampaignTemplate = function(
    websiteID, templateFormat, templateName
  ) {
    return crisp.post(
      crisp._prepareRestUrl(["TODO"]), null,

      {
        // TODO
      }
    );
  };

  /**
   * Check If Campaign Template Exists
   * @memberof WebsiteCampaign
   * @method checkCampaignTemplateExists
   * @return Promise
   */
  this.checkCampaignTemplateExists = function(websiteID, templateID) {
    return crisp.head(
      crisp._prepareRestUrl(["TODO"])
    );
  };

  /**
   * Get A Campaign Template
   * @memberof WebsiteCampaign
   * @method getCampaignTemplate
   * @return Promise
   */
  this.getCampaignTemplate = function(websiteID, templateID) {
    return crisp.get(
      crisp._prepareRestUrl(["TODO"])
    );
  };

  /**
   * Save A Campaign Template
   * @memberof WebsiteCampaign
   * @method saveCampaignTemplate
   * @return Promise
   */
  this.saveCampaignTemplate = function(
    websiteID, templateID, websiteCampaignTemplateItem
  ) {
    return crisp.put(
      crisp._prepareRestUrl(["TODO"]), null,

      {
        // TODO
      }
    );
  };

  /**
   * Update A Campaign Template
   * @memberof WebsiteCampaign
   * @method updateCampaignTemplate
   * @return Promise
   */
  this.updateCampaignTemplate = function(
    websiteID, templateID, websiteCampaignTemplateItem
  ) {
    return crisp.patch(
      crisp._prepareRestUrl(["TODO"]), null,

      {
        // TODO
      }
    );
  };

  /**
   * Remove A Campaign Template
   * @memberof WebsiteCampaign
   * @method removeCampaignTemplate
   * @return Promise
   */
  this.removeCampaignTemplate = function(websiteID, templateID) {
    return crisp.delete(
      crisp._prepareRestUrl(["TODO"])
    );
  };

  /**
   * Create A New Campaign
   * @memberof WebsiteCampaign
   * @method createNewCampaign
   * @return Promise
   */
  this.createNewCampaign = function(campaignType, campaignName) {
    return crisp.post(
      crisp._prepareRestUrl(["TODO"]), null,

      {
        // TODO
      }
    );
  };

  /**
   * Check If Campaign Exists
   * @memberof WebsiteCampaign
   * @method checkCampaignExists
   * @return Promise
   */
  this.checkCampaignExists = function(websiteID, campaignID) {
    return crisp.head(
      crisp._prepareRestUrl(["TODO"])
    );
  };

  /**
   * Get A Campaign
   * @memberof WebsiteCampaign
   * @method getCampaign
   * @return Promise
   */
  this.getCampaign = function(websiteID, campaignID) {
    return crisp.get(
      crisp._prepareRestUrl(["TODO"])
    );
  };

  /**
   * Save A Campaign
   * @memberof WebsiteCampaign
   * @method saveCampaign
   * @return Promise
   */
  this.saveCampaign = function(websiteID, campaignID, websiteCampaignItem) {
    return crisp.put(
      crisp._prepareRestUrl(["TODO"]), null,

      {
        // TODO
      }
    );
  };

  /**
   * Update A Campaign
   * @memberof WebsiteCampaign
   * @method updateCampaign
   * @return Promise
   */
  this.updateCampaign = function(websiteID, campaignID, websiteCampaignItem) {
    return crisp.patch(
      crisp._prepareRestUrl(["TODO"]), null,

      {
        // TODO
      }
    );
  };

  /**
   * Remove A Campaign
   * @memberof WebsiteCampaign
   * @method removeCampaign
   * @return Promise
   */
  this.removeCampaign = function(websiteID, campaignID) {
    return crisp.delete(
      crisp._prepareRestUrl(["TODO"])
    );
  };

  /**
   * Dispatch A Campaign
   * @memberof WebsiteCampaign
   * @method dispatchCampaign
   * @return Promise
   */
  this.dispatchCampaign = function(websiteID, campaignID) {
    return crisp.post(
      crisp._prepareRestUrl(["TODO"]), null,

      {
        // TODO
      }
    );
  };

  /**
   * Resume A Campaign
   * @memberof WebsiteCampaign
   * @method resumeCampaign
   * @return Promise
   */
  this.resumeCampaign = function(websiteID, campaignID) {
    return crisp.post(
      crisp._prepareRestUrl(["TODO"]), null,

      {
        // TODO
      }
    );
  };

  /**
   * Pause A Campaign
   * @memberof WebsiteCampaign
   * @method pauseCampaign
   * @return Promise
   */
  this.pauseCampaign = function(websiteID, campaignID) {
    return crisp.post(
      crisp._prepareRestUrl(["TODO"]), null,

      {
        // TODO
      }
    );
  };

  /**
   * Test A Campaign
   * @memberof WebsiteCampaign
   * @method testCampaign
   * @return Promise
   */
  this.testCampaign = function(websiteID, campaignID) {
    return crisp.post(
      crisp._prepareRestUrl(["TODO"]), null,

      {
        // TODO
      }
    );
  };

  /**
   * List Campaign Recipients
   * @memberof WebsiteCampaign
   * @method listCampaignRecipients
   * @return Promise
   */
  this.listCampaignRecipients = function(websiteID, campaignID, pageNumber) {
    return crisp.get(
      crisp._prepareRestUrl(["TODO"])
    );
  };

  /**
   * List Campaign Statistics
   * @memberof WebsiteCampaign
   * @method listCampaignStatistics
   * @return Promise
   */
  this.listCampaignStatistics = function(
    websiteID, campaignID, action, pageNumber
  ) {
    return crisp.get(
      crisp._prepareRestUrl(["TODO"])
    );
  };
}


module.exports = WebsiteCampaign;
