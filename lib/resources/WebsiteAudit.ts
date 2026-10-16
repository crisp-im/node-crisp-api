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
}

/**************************************************************************
 * EXPORTS
 ***************************************************************************/

export default WebsiteAudit;
