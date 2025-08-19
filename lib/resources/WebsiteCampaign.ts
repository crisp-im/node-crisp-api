/*
 * node-crisp-api
 *
 * Copyright 2022, Crisp IM SAS
 * Author: Valerian Saliou <valerian@valeriansaliou.name>
 */

/**************************************************************************
 * IMPORTS
 ***************************************************************************/

// PROJECT: RESOURCES
import BaseResource from "./BaseResource";
import { WebsiteFilter } from "./WebsiteBase";

// WebsiteCampaignExcerpt mapping
type WebsiteCampaignExcerpt = {
  campaign_id?:  string;
  type?:         string;
  format?:       string;
  name?:         string;
  subject?:      string;
  tag?:          string;
  ready?:        boolean;
  dispatched?:   boolean;
  running?:      boolean;
  progress?:     number;
  targets?:      number;
  reached?:      number;
  created_at:    number;
  updated_at:    number;
  dispatched_at?: number;
}

type WebsiteCampaignTemplateExcerpt = {
  template_id?:  string;
  type?:         string;
  name?:         string;
  format?:       string;
  created_at?:   number;
  updated_at?:   number;
}

type WebsiteCampaignTemplateNew = {
  template_id?:  string;
}

interface WebsiteCampaignTemplateItem extends WebsiteCampaignTemplateExcerpt {
  content?:  string;
}

interface WebsiteCampaignItem extends WebsiteCampaignExcerpt {
  sender?:      WebsiteCampaignItemSender;
  recipients?:  WebsiteCampaignItemRecipients;
  flow?:        WebsiteCampaignItemFlow;
  message?:     string;
  options?:     WebsiteCampaignItemOptions;
  statistics?:  WebsiteCampaignItemStatistics;
}

type WebsiteCampaignItemSender = {
  user_id?:  string;
}

// WebsiteCampaignItemRecipients mapping
type WebsiteCampaignItemRecipients = {
  type?:         string;
  segments?:     string[];
  people?:       string[];
  filter?:       WebsiteFilter[];
}

type WebsiteCampaignItemFlow = {
  launch_event?:   string;
  assert_filter?:  WebsiteFilter[];
  assert_delay?:   number;
  deliver_once?:   boolean;
  deliver_delay?:  number;
}

type WebsiteCampaignItemOptions = {
  deliver_to_chatbox?:  boolean;
  deliver_to_email?:    boolean;
  sender_name_website?:  boolean;
  sender_email_reply?:   boolean;
  tracking?:             boolean;
}

type WebsiteCampaignItemStatistics = {
  opened?:        number;
  clicked?:       number;
  unsubscribed?:  number;
}

type WebsiteCampaignRecipient = {
  people_id?:  string;
  email?:      string;
  person?:     WebsiteCampaignRecipientPerson;
  subscribed?:  boolean;
}

type WebsiteCampaignRecipientPerson = {
  nickname?:  string;
  avatar?:    string;
}

type WebsiteCampaignStatistic = {
  profile?:    WebsiteCampaignStatisticProfile;
  data?:       Record<string, unknown>;
  created_at?:  number;
  updated_at?:  number;
}

type WebsiteCampaignStatisticProfile = {
  people_id?:  string;
  email?:      string;
  person?:     WebsiteCampaignStatisticProfilePerson;
}

type WebsiteCampaignStatisticProfilePerson = {
  nickname?:  string;
  avatar?:    string;
  geolocation?:  WebsiteCampaignStatisticProfilePersonGeolocation;
}

type WebsiteCampaignStatisticProfilePersonGeolocation = {
  country?:      string;
  region?:      string;
  city?:        string;
  coordinates?:  WebsiteCampaignStatisticProfilePersonGeolocationCoordinates;
}

type WebsiteCampaignStatisticProfilePersonGeolocationCoordinates = {
  latitude?:  number;
  longitude?: number;
}

/**
 * Crisp WebsiteCampaign Resource
 */
class WebsiteCampaign extends BaseResource {
  /**
   * List Campaigns
   */
  listCampaigns(websiteID: string, pageNumber: number) : Promise<WebsiteCampaignExcerpt[]> {
    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "campaigns", "list", String(pageNumber)
      ])
    );
  }

  /**
   * List Campaign Tags
   */
  listCampaignTags(websiteID: string) : Promise<string[]> {
    return this.crisp.get(
      this.crisp.prepareRestUrl(["website", websiteID, "campaigns", "tags"])
    );
  }

  /**
   * List Campaign Templates
   */
  listCampaignTemplates(websiteID: string, pageNumber: number) : Promise<WebsiteCampaignTemplateExcerpt[]> {
    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "campaigns", "templates", String(pageNumber)
      ])
    );
  }

  /**
   * Create A New Campaign Template
   */
  createNewCampaignTemplate(websiteID: string, templateFormat: string, templateName: string) : Promise<WebsiteCampaignTemplateNew> {
    return this.crisp.post(
      this.crisp.prepareRestUrl(["website", websiteID, "campaigns", "template"]),

      null,

      {
        format: templateFormat,
        name: templateName
      }
    );
  }

  /**
   * Check If Campaign Template Exists
   */
  checkCampaignTemplateExists(websiteID: string, templateID: string) {
    return this.crisp.head(
      this.crisp.prepareRestUrl([
        "website", websiteID, "campaigns", "template", templateID
      ])
    );
  }

  /**
   * Get A Campaign Template
   */
  getCampaignTemplate(websiteID: string, templateID: string) : Promise<WebsiteCampaignTemplateItem> {
    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "campaigns", "template", templateID
      ])
    );
  }

  /**
   * Save A Campaign Template
   */
  saveCampaignTemplate(websiteID: string, templateID: string, template: WebsiteCampaignTemplateItem) {
    return this.crisp.put(
      this.crisp.prepareRestUrl([
        "website", websiteID, "campaigns", "template", templateID
      ]),

      null, template
    );
  }

  /**
   * Update A Campaign Template
   */
  updateCampaignTemplate(websiteID: string, templateID: string, template: WebsiteCampaignTemplateItem) {
    return this.crisp.patch(
      this.crisp.prepareRestUrl([
        "website", websiteID, "campaigns", "template", templateID
      ]),

      null, template
    );
  }

  /**
   * Remove A Campaign Template
   */
  removeCampaignTemplate(websiteID: string, templateID: string) {
    return this.crisp.delete(
      this.crisp.prepareRestUrl([
        "website", websiteID, "campaigns", "template", templateID
      ])
    );
  }

  /**
   * Create A New Campaign
   */
  createNewCampaign(websiteID: string, campaignType: string, campaignName: string) {
    return this.crisp.post(
      this.crisp.prepareRestUrl(["website", websiteID, "campaign"]),

      null,

      {
        type: campaignType,
        name: campaignName
      }
    );
  };

  /**
   * Check If Campaign Exists
   */
  checkCampaignExists(websiteID: string, campaignID: string) {
    return this.crisp.head(
      this.crisp.prepareRestUrl(["website", websiteID, "campaign", campaignID])
    );
  };

  /**
   * Get A Campaign
   */
  getCampaign(websiteID: string, campaignID: string) : Promise<WebsiteCampaignItem> {
    return this.crisp.get(
      this.crisp.prepareRestUrl(["website", websiteID, "campaign", campaignID])
    );
  };

  /**
   * Save A Campaign
   */
  saveCampaign(websiteID: string, campaignID: string, campaign: WebsiteCampaignItem) {
    return this.crisp.put(
      this.crisp.prepareRestUrl(["website", websiteID, "campaign", campaignID]),

      null, campaign
    );
  };

  /**
   * Update A Campaign
   */
  updateCampaign(websiteID: string, campaignID: string, campaign: WebsiteCampaignItem) {
    return this.crisp.patch(
      this.crisp.prepareRestUrl(["website", websiteID, "campaign", campaignID]),

      null, campaign
    );
  };

  /**
   * Remove A Campaign
   */
  removeCampaign(websiteID: string, campaignID: string) {
    return this.crisp.delete(
      this.crisp.prepareRestUrl(["website", websiteID, "campaign", campaignID])
    );
  };

  /**
   * Dispatch A Campaign
   * @return {Promise}
   */
  dispatchCampaign(websiteID: string, campaignID: string) {
    return this.crisp.post(
      this.crisp.prepareRestUrl([
        "website", websiteID, "campaign", campaignID, "dispatch"
      ]),

      null,
      null
    );
  };

  /**
   * Resume A Campaign
   */
  resumeCampaign(websiteID: string, campaignID: string) {
    return this.crisp.post(
      this.crisp.prepareRestUrl([
        "website", websiteID, "campaign", campaignID, "resume"
      ]),

      null,
      null
    );
  };

  /**
   * Pause A Campaign
   */
  pauseCampaign(websiteID: string, campaignID: string) {
    return this.crisp.post(
      this.crisp.prepareRestUrl([
        "website", websiteID, "campaign", campaignID, "pause"
      ]),

      null,
      null
    );
  };

  /**
   * Test A Campaign
   */
  testCampaign(websiteID: string, campaignID: string) {
    return this.crisp.post(
      this.crisp.prepareRestUrl([
        "website", websiteID, "campaign", campaignID, "test"
      ]),

      null,
      null
    );
  };

  /**
   * List Campaign Recipients
   */
  listCampaignRecipients(websiteID: string, campaignID: string, pageNumber: number) : Promise<WebsiteCampaignRecipient[]> {
    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "campaign", campaignID, "recipients", String(pageNumber)
      ])
    );
  };

  /**
   * List Campaign Statistics
   */
  listCampaignStatistics(
    websiteID: string,
    campaignID: string,
    action: string,
    pageNumber: number
  ) : Promise<WebsiteCampaignStatistic[]> {
    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "campaign", campaignID, "statistics", action,
        String(pageNumber)
      ])
    );
  };
}

export default WebsiteCampaign;
