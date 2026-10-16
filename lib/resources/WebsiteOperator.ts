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
 * INTERFACES
 ***************************************************************************/

export interface WebsiteOperatorListOne {
  type?: string;
  details?: WebsiteOperator;
}

export interface WebsiteOperatorData {
  data?: WebsiteOperator;
}

export interface WebsiteOperator {
  userID?: string;
  email?: string;
  avatar?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  title?: string;
  availability?: string;
  hasToken?: boolean;
  identifier?: string;
  key?: string;
}

export interface WebsiteOperatorsLastActiveListOne {
  userID?: string;
  avatar?: string;
  nickname?: string;
  timestamp?: number;
}

export interface WebsiteOperatorEmail {
  recipient?: string;
  userID?: string;
  subject?: string;
  message?: string;
  target?: WebsiteOperatorEmailTarget;
}

export interface WebsiteOperatorEmailTarget {
  label?: string;
  url?: string;
}

/**************************************************************************
 * CLASSES
 ***************************************************************************/

/**
 * Crisp WebsiteOperator Resource
 */
class WebsiteOperatorService extends BaseResource {
  /**
   * List Website Operators
   */
  listWebsiteOperators(websiteID: string): Promise<WebsiteOperatorListOne[]> {
    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "operators", "list"
      ])
    );
  };

  /**
   * List Last Active Website Operators
   */
  listLastActiveWebsiteOperators(
    websiteID: string
  ): Promise<WebsiteOperatorsLastActiveListOne[]> {
    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "operators", "active"
      ])
    );
  };

  /**
   * Send Email To Website Operators
   */
  sendEmailToWebsiteOperators(
    websiteID: string, emailData: WebsiteOperatorEmail
  ) {
    return this.crisp.post(
      this.crisp.prepareRestUrl(["website", websiteID, "operators", "email"]),

      null, emailData
    );
  };

  /**
   * Get A Website Operator
   */
  getWebsiteOperator(
    websiteID: string, userID: string
  ): Promise<WebsiteOperator> {
    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "operator", userID
      ])
    );
  };
}

/**************************************************************************
 * EXPORTS
 ***************************************************************************/

export default WebsiteOperatorService;

