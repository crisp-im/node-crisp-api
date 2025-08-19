/*
 * node-crisp-api
 *
 * Copyright 2022, Crisp IM SAS
 * Author: Valerian Saliou <valerian@valeriansaliou.name>
 */

import Crisp from "@/crisp";

type WebsiteAvailabilityStatus = {
  status?:  string;
  since?:   number;
}

type WebsiteAvailabilityOperator = {
  user_id?:  string;
  type?:     string;
  time?:     WebsiteAvailabilityOperatorTime;
}

type WebsiteAvailabilityOperatorTime = {
  for?:   number;
  since?: number;
}

/**
 * Crisp WebsiteAvailability Resource
 */
class WebsiteAvailability {
  private crisp: Crisp;

  constructor(crisp: Crisp) {
    this.crisp = crisp;
  }

  /**
   * Get Website Availability Status
   */
  getWebsiteAvailabilityStatus(websiteID: string) : Promise<WebsiteAvailabilityStatus> {
    return this.crisp.get(
      this.crisp.prepareRestUrl(["website", websiteID, "availability", "status"])
    );
  };

  /**
   * List Website Operator Availabilities
   */
  listWebsiteOperatorAvailabilities(websiteID: string) : Promise<WebsiteAvailabilityOperator[]> {
    return this.crisp.get(
      this.crisp.prepareRestUrl(["website", websiteID, "availability", "operators"])
    );
  };
}

export default WebsiteAvailability;
