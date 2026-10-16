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

export type Website = {
  website_id?: string;
  name?: string;
  domain?: string;
  logo?: string;
  verified?: boolean;
  institutional?: boolean;
}

export type WebsiteCreate = {
  name?: string;
  domain?: string;
}

/**************************************************************************
 * CLASSES
 ***************************************************************************/

/**
 * Crisp WebsiteBase Resource
 */
class WebsiteBase extends BaseResource {
  /**
   * Check If Website Exists
   */
  checkWebsiteExists(domain: string) {
    return this.crisp.head(
      this.crisp.prepareRestUrl(["website"]),

      {
        domain: domain
      }
    );
  };

  /**
   * Create Website
   */
  createWebsite(websiteData: WebsiteCreate): Promise<Website> {
    return this.crisp.post(
      this.crisp.prepareRestUrl(["website"]), null, websiteData
    );
  };

  /**
   * Get A Website
   */
  getWebsite(websiteID: string): Promise<Website> {
    return this.crisp.get(
      this.crisp.prepareRestUrl(["website", websiteID])
    );
  };
}

/**************************************************************************
 * EXPORTS
 ***************************************************************************/

export default WebsiteBase;
