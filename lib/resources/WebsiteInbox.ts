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
  conditions?: WebsiteInboxCondition[];
  created_at?: number;
  updated_at?: number;
}

export type WebsiteInboxCondition = {
  model?: "session";
  criterion?: string;
  operator?: "eq" | "neq" | "gte" | "lte" | "gt" | "lt";
  query?: string[];
};

export type WebsiteInboxOrders = {
  orders?: WebsiteInboxOrder[];
}

export type WebsiteInboxOrder = {
  inbox_id?: string;
  order?: number;
}

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
   * Batch Order Inboxes
   */
  batchOrderInboxes(websiteID: string, orders: WebsiteInboxOrders) {
    return this.crisp.patch(
      this.crisp.prepareRestUrl([
        "website", websiteID, "inboxes", "batch", "order"
      ]),

      null, orders
    );
  };

  /**
   * Create A New Inbox
   */
  createNewInbox(websiteID: string, inbox: WebsiteInbox) {
    return this.crisp.post(
      this.crisp.prepareRestUrl(["website", websiteID, "inbox"]), null, inbox
    );
  };

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

  /**
   * Save Inbox
   */
  saveInbox(websiteID: string, inboxID: string, inbox: WebsiteInbox) {
    return this.crisp.put(
      this.crisp.prepareRestUrl([
        "website", websiteID, "inbox", inboxID
      ]),

      null, inbox
    );
  };

  /**
   * Delete Inbox
   */
  deleteInbox(websiteID: string, inboxID: string) {
    return this.crisp.delete(
      this.crisp.prepareRestUrl(["website", websiteID, "inbox", inboxID])
    );
  };
}

/**************************************************************************
 * EXPORTS
 ***************************************************************************/

export default WebsiteInboxService;
