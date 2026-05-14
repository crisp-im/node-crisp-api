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
 * TYPES
 ***************************************************************************/

export type WebsiteBatchConversationsOperation = {
  inbox_id?: string;
  sessions?: string[];
}

export type WebsiteBatchReportOperation = {
  sessions: string[];
  flag: string;
}

export type WebsiteBatchBlockOperation = {
  sessions: string[];
  blocked: boolean;
}

export type WebsiteBatchRoutingOperationAssigned = {
  user_id: string;
}

export type WebsiteBatchRoutingOperation = {
  sessions: string[];
  assigned: WebsiteBatchRoutingOperationAssigned | null;
}

export type WebsiteBatchInboxOperation = {
  sessions: string[];
  inbox_id: string | null;
}

export type WebsiteBatchPeopleOperationInner = {
  profiles?: string[];
  search?: string;
}

/**************************************************************************
 * CLASSES
 ***************************************************************************/

/**
 * Crisp WebsiteBatch Resource
 */
class WebsiteBatch extends BaseResource {
  /**
   * Batch Resolve Conversations
   */
  batchResolveConversations(
    websiteID: string, operation: WebsiteBatchConversationsOperation
  ) {
    return this.crisp.patch(
      this.crisp.prepareRestUrl(["website", websiteID, "batch", "resolve"]),

      null, operation
    );
  };

  /**
   * Batch Unresolve Conversations
   */
  batchUnresolveConversations(
    websiteID: string, operation: WebsiteBatchConversationsOperation
  ) {
    return this.crisp.patch(
      this.crisp.prepareRestUrl(["website", websiteID, "batch", "unresolve"]),

      null, operation
    );
  };

  /**
   * Batch Read Conversations
   * @memberof WebsiteBatch
   * @public
   * @method batchReadConversations
   * @param {string} websiteID
   * @param {object} operation
   * @return {Promise}
   */
  batchReadConversations(
    websiteID: string, operation: WebsiteBatchConversationsOperation
  ) {
    return this.crisp.patch(
      this.crisp.prepareRestUrl(["website", websiteID, "batch", "read"]),

      null, operation
    );
  };

  /**
   * Batch Unread Conversations
   */
  batchUnreadConversations(
    websiteID: string, operation: WebsiteBatchConversationsOperation
  ) {
    return this.crisp.patch(
      this.crisp.prepareRestUrl(["website", websiteID, "batch", "unread"]),

      null, operation
    );
  };

  /**
   * Batch Remove Conversations
   * @memberof WebsiteBatch
   * @public
   * @method batchRemoveConversations
   * @param {string} websiteID
   * @param {object} operation
   * @return {Promise}
   */
  batchRemoveConversations(
    websiteID: string, operation: WebsiteBatchConversationsOperation
  ) {
    return this.crisp.patch(
      this.crisp.prepareRestUrl(["website", websiteID, "batch", "remove"]),

      null, operation
    );
  };

  /**
   * Batch Remove People
   * @memberof WebsiteBatch
   * @public
   * @method batchRemovePeople
   * @param {string} websiteID
   * @param {object} people
   * @return {Promise}
   */
  batchRemovePeople(
    websiteID: string, people: WebsiteBatchPeopleOperationInner
  ) {
    return this.crisp.patch(
      this.crisp.prepareRestUrl(["website", websiteID, "batch", "remove"]),

      null,

      {
        people: people
      }
    );
  };

  /**
   * Batch Report Conversations
   */
  batchReportConversations(
    websiteID: string, operation: WebsiteBatchReportOperation
  ) {
    return this.crisp.post(
      this.crisp.prepareRestUrl(["website", websiteID, "batch", "report"]),

      null, operation
    );
  };

  /**
   * Batch Block Conversations
   */
  batchBlockConversations(
    websiteID: string, operation: WebsiteBatchBlockOperation
  ) {
    return this.crisp.patch(
      this.crisp.prepareRestUrl(["website", websiteID, "batch", "block"]),

      null, operation
    );
  };

  /**
   * Batch Routing Conversations
   */
  batchRoutingConversations(
    websiteID: string, operation: WebsiteBatchRoutingOperation
  ) {
    return this.crisp.patch(
      this.crisp.prepareRestUrl(["website", websiteID, "batch", "routing"]),

      null, operation
    );
  };

  /**
   * Batch Inbox Conversations
   */
  batchInboxConversations(
    websiteID: string, operation: WebsiteBatchInboxOperation
  ) {
    return this.crisp.patch(
      this.crisp.prepareRestUrl(["website", websiteID, "batch", "inbox"]),

      null, operation
    );
  };
}

/**************************************************************************
 * EXPORTS
 ***************************************************************************/

export default WebsiteBatch;
