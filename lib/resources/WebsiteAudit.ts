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

export type WebsiteAuditAction = "write" | "delete" | "read";

export type WebsiteAuditLogCreate = {
  action: WebsiteAuditAction;
  namespace: string;
  user_id: string;
  ip?: string;
  context?: Record<string, string | number | boolean>;
};

export type WebsiteAuditLog = {
  user_id?: string;
  action?: WebsiteAuditAction;
  namespace?: string;
  origin?: string;
  ip?: string | null;
  country?: string | null;
  context?: Record<string, string | number | boolean>;
  timestamp?: number;
};

/**************************************************************************
 * CLASSES
 ***************************************************************************/

/**
 * Crisp WebsiteAudit Resource
 */
class WebsiteAudit extends BaseResource {
  /**
   * Create Audit Log
   */
  createAuditLog(websiteID: string, auditLog: WebsiteAuditLogCreate) {
    return this.crisp.post(
      this.crisp.prepareRestUrl(["website", websiteID, "audit", "log"]),

      null, auditLog
    );
  };

  /**
   * List Audit Logs
   */
  listAuditLogs(
    websiteID: string, pageNumber: number = 1, filterUserID?: string | null,
      filterNamespace?: string | null, filterDateStart?: string | null,
      filterDateEnd?: string | null
  ): Promise<WebsiteAuditLog[]> {
    const query: Record<string, unknown> = {};

    if (filterUserID !== undefined && filterUserID !== null) {
      query.filter_user_id = filterUserID;
    }

    if (filterNamespace !== undefined && filterNamespace !== null) {
      query.filter_namespace = filterNamespace;
    }

    if (filterDateStart !== undefined && filterDateStart !== null) {
      query.filter_date_start = filterDateStart;
    }

    if (filterDateEnd !== undefined && filterDateEnd !== null) {
      query.filter_date_end = filterDateEnd;
    }

    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "audit", "log", "list", String(pageNumber)
      ]),

      query
    );
  };
}

/**************************************************************************
 * EXPORTS
 ***************************************************************************/

export default WebsiteAudit;
