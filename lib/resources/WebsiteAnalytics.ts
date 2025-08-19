/*
 * node-crisp-api
 *
 * Copyright 2022, Crisp IM SAS
 * Author: Valerian Saliou <valerian@valeriansaliou.name>
 */

import Crisp from "@/crisp";

/**
 * Crisp WebsiteAnalytics Resource
 */
class WebsiteAnalytics {
  private crisp: Crisp;

  constructor(crisp: Crisp) {
    this.crisp = crisp;
  }

  /**
   * Generate Analytics
   */
  generateAnalytics(websiteID: string, query: object) {
    return this.crisp.post(
      this.crisp.prepareRestUrl(["website", websiteID, "analytics", "generate"]),

      null, query
    );
  };
}

export default WebsiteAnalytics;