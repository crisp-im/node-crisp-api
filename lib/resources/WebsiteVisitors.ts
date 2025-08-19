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
 * INTERFACES
 ***************************************************************************/

export interface WebsiteVisitorCount {
  count?: number;
  active?: number;
  limited?: boolean;
}

export interface WebsiteVisitor {
  session_id?: string;
  inbox_id?: string;
  nickname?: string;
  email?: string;
  avatar?: string;
  useragent?: string;
  initiated?: boolean;
  active?: boolean;
  last_page?: WebsiteVisitorLastPage;
  geolocation?: WebsiteVisitorGeolocation;
  timezone?: number;
  capabilities?: string[];
  locales?: string[];
}

export interface WebsiteVisitorLastPage {
  page_title?: string;
  page_url?: string;
}

export interface WebsiteVisitorGeolocation {
  coordinates?: WebsiteVisitorGeolocationCoordinates;
  city?: string;
  region?: string;
  country?: string;
}

export interface WebsiteVisitorGeolocationCoordinates {
  latitude?: number;
  longitude?: number;
}

export interface WebsiteVisitorsMapPointsData {
  data?: WebsiteVisitorsMapPoint[];
}

export interface WebsiteVisitorsMapPoint {
  visitors?: WebsiteVisitorsMapPointVisitors;
  geolocation?: WebsiteVisitorsMapPointGeolocation;
}

export interface WebsiteVisitorsMapPointGeolocation {
  coordinates?: WebsiteVisitorsMapPointGeolocationCoordinates;
  city?: string;
  region?: string;
  country?: string;
}

export interface WebsiteVisitorsMapPointGeolocationCoordinates {
  latitude?: number;
  longitude?: number;
}

export interface WebsiteVisitorsMapPointVisitors {
  count?: number;
  threshold?: number;
  sessions?: WebsiteVisitorsMapPointVisitorsSession[];
}

export interface WebsiteVisitorsMapPointVisitorsSession {
  session_id?: string;
  nickname?: string;
  email?: string;
  avatar?: string;
  initiated?: boolean;
  active?: boolean;
  last_page?: WebsiteVisitorLastPage;
  timezone?: number;
  capabilities?: string[];
  locales?: string[];
}

export interface WebsiteVisitorsToken {
  session_id?: string;
}

export interface WebsiteVisitorsBlocked {
  rule?: string[];
  blocked?: number;
}

/**************************************************************************
 * CLASSES
 ***************************************************************************/

/**
 * Crisp WebsiteVisitors Resource
 */
class WebsiteVisitors extends BaseResource {
  /**
   * Count Visitors
   */
  countVisitors(websiteID: string) : Promise<WebsiteVisitorCount> {
    return this.crisp.get(
      this.crisp.prepareRestUrl(["website", websiteID, "visitors", "count"])
    );
  };

  /**
   * List Visitors
   */
  listVisitors(
    websiteID: string, pageNumber: number = 1
  ) : Promise<WebsiteVisitor[]> {
    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "visitors", "list", String(pageNumber)
      ])
    );
  };

  /**
   * Pinpoint Visitors On A Map
   */
  pinpointVisitorsOnMap(
    websiteID: string, centerLongitude: number, centerLatitude: number,
      centerRadius: number
  ) : Promise<WebsiteVisitorsMapPoint[]> {
    // Generate query
    const query: Record<string, string> = {};

    if (typeof centerLongitude === "number") {
      query.center_longitude = String(centerLongitude);
    }

    if (typeof centerLatitude === "number") {
      query.center_latitude = String(centerLatitude);
    }

    if (typeof centerRadius === "number") {
      query.center_radius = String(centerRadius);
    }

    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "visitors", "map"
      ]),

      query
    );
  };

  /**
   * Get Session Identifier From Token
   */
  getSessionIdentifierFromToken(
    websiteID: string, tokenID: string
  ) : Promise<WebsiteVisitorsToken> {
    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "visitors", "token", tokenID
      ])
    );
  };

  /**
   * Count Blocked Visitors
   */
  countBlockedVisitors(websiteID: string) : Promise<WebsiteVisitorsBlocked> {
    return this.crisp.get(
      this.crisp.prepareRestUrl(["website", websiteID, "visitors", "blocked"])
    );
  };

  /**
   * Count Blocked Visitors In Rule
   */
  countBlockedVisitorsInRule(
    websiteID: string, rule: string
  ) : Promise<number> {
    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "visitors", "blocked", rule
      ])
    );
  };

  /**
   * Clear Blocked Visitors In Rule
   */
  clearBlockedVisitorsInRule(websiteID: string, rule: string) {
    return this.crisp.delete(
      this.crisp.prepareRestUrl([
        "website", websiteID, "visitors", "blocked", rule
      ])
    );
  };
}

/**************************************************************************
 * EXPORTS
 ***************************************************************************/

export default WebsiteVisitors;
