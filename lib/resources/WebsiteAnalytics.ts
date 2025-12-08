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
 * CLASSES
 ***************************************************************************/

/**
 * Crisp WebsiteAnalytics Resource
 */
class WebsiteAnalytics extends BaseResource {
  /**
   * Generate Analytics
   */
  generateAnalytics(websiteID: string, query: object) {
    return this.crisp.post(
      this.crisp.prepareRestUrl([
        "website", websiteID, "analytics", "generate"
      ]),

      null, query
    );
  };
}

/**************************************************************************
 * EXPORTS
 ***************************************************************************/

export default WebsiteAnalytics;
