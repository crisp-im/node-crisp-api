/*
 * node-crisp-api
 *
 * Copyright 2022, Crisp IM SAS
 * Author: Valerian Saliou <valerian@valeriansaliou.name>
 */


"use strict";


/**
 * Crisp WebsiteCampaign Resource
 * @class
 * @classdesc This is the Crisp Website Campaign Resource
 */
function WebsiteCampaign(service, crisp) {
  /**
   * List Campaigns
   * @memberof WebsiteCampaign
   * @method listCampaigns
   * @param {string} websiteID
   * @param {number} pageNumber
   * @return {Promise}
   */
  service.listCampaigns = function(websiteID, pageNumber) {
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
   * @param {string} websiteID
   * @return {Promise}
   */
  service.listCampaignTags = function(websiteID) {
    return crisp.get(
      crisp._prepareRestUrl(["website", websiteID, "campaigns", "tags"])
    );
  };

  /**
   * List Campaign Templates
   * @memberof WebsiteCampaign
   * @method listCampaignTemplates
   * @param {string} websiteID
   * @param {number} pageNumber
   * @return {Promise}
   */
  service.listCampaignTemplates = function(websiteID, pageNumber) {
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
   * @param {string} websiteID
   * @param {string} templateFormat
   * @param {string} templateName
   * @return {Promise}
   */
  service.createNewCampaignTemplate = function(
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
   * @param {string} websiteID
   * @param {string} templateID
   * @return {Promise}
   */
  service.checkCampaignTemplateExists = function(websiteID, templateID) {
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
   * @param {string} websiteID
   * @param {string} templateID
   * @return {Promise}
   */
  service.getCampaignTemplate = function(websiteID, templateID) {
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
   * @param {string} websiteID
   * @param {string} templateID
   * @param {object} template
   * @return {Promise}
   */
  service.saveCampaignTemplate = function(websiteID, templateID, template) {
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
   * @param {string} websiteID
   * @param {string} templateID
   * @param {object} template
   * @return {Promise}
   */
  service.updateCampaignTemplate = function(websiteID, templateID, template) {
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
   * @param {string} websiteID
   * @param {string} templateID
   * @return {Promise}
   */
  service.removeCampaignTemplate = function(websiteID, templateID) {
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
   * @param {string} websiteID
   * @param {string} campaignType
   * @param {string} campaignName
   * @return {Promise}
   */
  service.createNewCampaign = function(websiteID, campaignType, campaignName) {
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
   * @param {string} websiteID
   * @param {string} campaignID
   * @return {Promise}
   */
  service.checkCampaignExists = function(websiteID, campaignID) {
    return crisp.head(
      crisp._prepareRestUrl(["website", websiteID, "campaign", campaignID])
    );
  };

  /**
   * Get A Campaign
   * @memberof WebsiteCampaign
   * @method getCampaign
   * @param {string} websiteID
   * @param {string} campaignID
   * @return {Promise}
   */
  service.getCampaign = function(websiteID, campaignID) {
    return crisp.get(
      crisp._prepareRestUrl(["website", websiteID, "campaign", campaignID])
    );
  };

  /**
   * Save A Campaign
   * @memberof WebsiteCampaign
   * @method saveCampaign
   * @param {string} websiteID
   * @param {string} campaignID
   * @param {object} campaign
   * @return {Promise}
   */
  service.saveCampaign = function(websiteID, campaignID, campaign) {
    return crisp.put(
      crisp._prepareRestUrl(["website", websiteID, "campaign", campaignID]),

      null, campaign
    );
  };

  /**
   * Update A Campaign
   * @memberof WebsiteCampaign
   * @method updateCampaign
   * @param {string} websiteID
   * @param {string} campaignID
   * @param {object} campaign
   * @return {Promise}
   */
  service.updateCampaign = function(websiteID, campaignID, campaign) {
    return crisp.patch(
      crisp._prepareRestUrl(["website", websiteID, "campaign", campaignID]),

      null, campaign
    );
  };

  /**
   * Remove A Campaign
   * @memberof WebsiteCampaign
   * @method removeCampaign
   * @param {string} websiteID
   * @param {string} campaignID
   * @return {Promise}
   */
  service.removeCampaign = function(websiteID, campaignID) {
    return crisp.delete(
      crisp._prepareRestUrl(["website", websiteID, "campaign", campaignID])
    );
  };

  /**
   * Dispatch A Campaign
   * @memberof WebsiteCampaign
   * @method dispatchCampaign
   * @param {string} websiteID
   * @param {string} campaignID
   * @return {Promise}
   */
  service.dispatchCampaign = function(websiteID, campaignID) {
    return crisp.post(
      crisp._prepareRestUrl([
        "website", websiteID, "campaign", campaignID, "dispatch"
      ])
    );
  };

  /**
   * Resume A Campaign
   * @memberof WebsiteCampaign
   * @method resumeCampaign
   * @param {string} websiteID
   * @param {string} campaignID
   * @return {Promise}
   */
  service.resumeCampaign = function(websiteID, campaignID) {
    return crisp.post(
      crisp._prepareRestUrl([
        "website", websiteID, "campaign", campaignID, "resume"
      ])
    );
  };

  /**
   * Pause A Campaign
   * @memberof WebsiteCampaign
   * @method pauseCampaign
   * @param {string} websiteID
   * @param {string} campaignID
   * @return {Promise}
   */
  service.pauseCampaign = function(websiteID, campaignID) {
    return crisp.post(
      crisp._prepareRestUrl([
        "website", websiteID, "campaign", campaignID, "pause"
      ])
    );
  };

  /**
   * Test A Campaign
   * @memberof WebsiteCampaign
   * @method testCampaign
   * @param {string} websiteID
   * @param {string} campaignID
   * @return {Promise}
   */
  service.testCampaign = function(websiteID, campaignID) {
    return crisp.post(
      crisp._prepareRestUrl([
        "website", websiteID, "campaign", campaignID, "test"
      ])
    );
  };

  /**
   * List Campaign Recipients
   * @memberof WebsiteCampaign
   * @method listCampaignRecipients
   * @param {string} websiteID
   * @param {string} campaignID
   * @param {number} pageNumber
   * @return {Promise}
   */
  service.listCampaignRecipients = function(websiteID, campaignID, pageNumber) {
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
   * @param {string} websiteID
   * @param {string} campaignID
   * @param {string} action
   * @param {number} pageNumber
   * @return {Promise}
   */
  service.listCampaignStatistics = function(
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
