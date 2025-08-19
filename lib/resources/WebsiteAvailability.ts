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
 * TYPES
 ***************************************************************************/

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


/**************************************************************************
 * CLASSES
 ***************************************************************************/

/**
 * Crisp WebsiteAvailability Resource
 */
class WebsiteAvailability extends BaseResource {
  /**
   * Get Website Availability Status
   */
  getWebsiteAvailabilityStatus(
    websiteID: string
  ) : Promise<WebsiteAvailabilityStatus> {
    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "availability", "status"
      ])
    );
  };

  /**
   * List Website Operator Availabilities
   */
  listWebsiteOperatorAvailabilities(
    websiteID: string
  ) : Promise<WebsiteAvailabilityOperator[]> {
    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "availability", "operators"
      ])
    );
  };
}


/**************************************************************************
 * EXPORTS
 ***************************************************************************/

export default WebsiteAvailability;
