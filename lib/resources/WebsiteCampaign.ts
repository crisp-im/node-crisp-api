/*
 * This file is part of node-crisp-api
 *
 * Copyright (c) 2025 Crisp IM SAS
 * All rights belong to Crisp IM SAS
 */

/**************************************************************************
 * IMPORTS
 ***************************************************************************/

// PROJECT: RESOURCES
import BaseResource from "./BaseResource";

/**************************************************************************
 * TYPES
 ***************************************************************************/

export type WebsiteCampaignTemplateExcerpt = {
  template_id?: string;
  type?: string;
  name?: string;
  format?: string;
  created_at?: number;
  updated_at?: number;
}

export type WebsiteCampaignTemplateNew = {
  template_id?: string;
}

export interface WebsiteCampaignTemplateItem extends WebsiteCampaignTemplateExcerpt {
  content?: string;
}

/**************************************************************************
 * CLASSES
 ***************************************************************************/

/**
 * Crisp WebsiteCampaign Resource
 */
class WebsiteCampaign extends BaseResource {
  /**
   * List Campaign Templates
   */
  listCampaignTemplates(
    websiteID: string, pageNumber: number = 1
  ): Promise<WebsiteCampaignTemplateExcerpt[]> {
    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "campaigns", "templates", String(pageNumber)
      ])
    );
  }

  /**
   * Create A New Campaign Template
   */
  createNewCampaignTemplate(
    websiteID: string, templateFormat: string, templateName: string
  ): Promise<WebsiteCampaignTemplateNew> {
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
  getCampaignTemplate(
    websiteID: string, templateID: string
  ): Promise<WebsiteCampaignTemplateItem> {
    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "campaigns", "template", templateID
      ])
    );
  }

  /**
   * Save A Campaign Template
   */
  saveCampaignTemplate(
    websiteID: string, templateID: string, template: WebsiteCampaignTemplateItem
  ) {
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
  updateCampaignTemplate(
    websiteID: string, templateID: string, template: WebsiteCampaignTemplateItem
  ) {
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
}

/**************************************************************************
 * EXPORTS
 ***************************************************************************/

export default WebsiteCampaign;
