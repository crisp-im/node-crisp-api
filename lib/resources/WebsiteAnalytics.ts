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
