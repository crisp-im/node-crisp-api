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
      crisp._prepareRestUrl([
        "website", websiteID, "campaigns", "list", pageNumber
      ])
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
      crisp._prepareRestUrl(["website", websiteID, "campaigns", "tags"])
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
      crisp._prepareRestUrl([
        "website", websiteID, "campaigns", "templates", pageNumber
      ])
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
      crisp._prepareRestUrl(["website", websiteID, "campaigns", "template"]),

      null,

      {
        format : templateFormat,
        name   : templateName
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
      crisp._prepareRestUrl([
        "website", websiteID, "campaigns", "template", templateID
      ])
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
      crisp._prepareRestUrl([
        "website", websiteID, "campaigns", "template", templateID
      ])
    );
  };

  /**
   * Save A Campaign Template
   * @memberof WebsiteCampaign
   * @method saveCampaignTemplate
   * @return Promise
   */
  this.saveCampaignTemplate = function(websiteID, templateID, template) {
    return crisp.put(
      crisp._prepareRestUrl([
        "website", websiteID, "campaigns", "template", templateID
      ]),

      null, template
    );
  };

  /**
   * Update A Campaign Template
   * @memberof WebsiteCampaign
   * @method updateCampaignTemplate
   * @return Promise
   */
  this.updateCampaignTemplate = function(websiteID, templateID, template) {
    return crisp.patch(
      crisp._prepareRestUrl([
        "website", websiteID, "campaigns", "template", templateID
      ]),

      null, template
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
      crisp._prepareRestUrl([
        "website", websiteID, "campaigns", "template", templateID
      ])
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
      crisp._prepareRestUrl(["website", websiteID, "campaign"]),

      null,

      {
        type : campaignType,
        name : campaignName
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
      crisp._prepareRestUrl(["website", websiteID, "campaign", campaignID])
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
      crisp._prepareRestUrl(["website", websiteID, "campaign", campaignID])
    );
  };

  /**
   * Save A Campaign
   * @memberof WebsiteCampaign
   * @method saveCampaign
   * @return Promise
   */
  this.saveCampaign = function(websiteID, campaignID, campaign) {
    return crisp.put(
      crisp._prepareRestUrl(["website", websiteID, "campaign", campaignID]),

      null, campaign
    );
  };

  /**
   * Update A Campaign
   * @memberof WebsiteCampaign
   * @method updateCampaign
   * @return Promise
   */
  this.updateCampaign = function(websiteID, campaignID, campaign) {
    return crisp.patch(
      crisp._prepareRestUrl(["website", websiteID, "campaign", campaignID]),

      null, campaign
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
      crisp._prepareRestUrl(["website", websiteID, "campaign", campaignID])
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
      crisp._prepareRestUrl([
        "website", websiteID, "campaign", campaignID, "dispatch"
      ]),

      null, {}
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
      crisp._prepareRestUrl([
        "website", websiteID, "campaign", campaignID, "resume"
      ]),

      null, {}
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
      crisp._prepareRestUrl([
        "website", websiteID, "campaign", campaignID, "pause"
      ]),

      null, {}
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
      crisp._prepareRestUrl([
        "website", websiteID, "campaign", campaignID, "test"
      ]),

      null, {}
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
      crisp._prepareRestUrl([
        "website", websiteID, "campaign", campaignID, "recipients", pageNumber
      ])
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
      crisp._prepareRestUrl([
        "website", websiteID, "campaign", campaignID, "statistics", action,
          pageNumber
      ])
    );
  };
}


module.exports = WebsiteCampaign;
