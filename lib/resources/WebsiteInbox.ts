/*
 * This file is part of node-crisp-api
 *
 * Copyright (c) 2026 Crisp IM SAS
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

export type WebsiteInbox = {
  inbox_id?: string;
  name?: string;
  emoji?: string;
  order?: number;
  operators?: string[];
  teams?: string[];
  team_operators?: string[];
  conditions?: WebsiteInboxCondition[];
  operator?: string;
  created_at?: number;
  updated_at?: number;
}

export type WebsiteInboxCondition = {
  model?: "session";
  criterion?: string;
  operator?: "eq" | "neq" | "gte" | "lte" | "gt" | "lt";
  query?: string[];
};

/**************************************************************************
 * CLASSES
 ***************************************************************************/

/**
 * Crisp WebsiteInbox Resource
 */
class WebsiteInboxService extends BaseResource {
  /**
   * List Inboxes
   */
  listInboxes(
    websiteID: string, pageNumber: number = 1
  ): Promise<WebsiteInbox[]> {
    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "inboxes", "list", String(pageNumber)
      ])
    );
  }

  /**
   * Check If Inbox Exists
   */
  checkInboxExists(websiteID: string, inboxID: string) {
    return this.crisp.head(
      this.crisp.prepareRestUrl(["website", websiteID, "inbox", inboxID])
    );
  };

  /**
   * Get Inbox
   */
  getInbox(websiteID: string, inboxID: string): Promise<WebsiteInbox> {
    return this.crisp.get(
      this.crisp.prepareRestUrl(["website", websiteID, "inbox", inboxID])
    );
  };
}

/**************************************************************************
 * EXPORTS
 ***************************************************************************/

export default WebsiteInboxService;
