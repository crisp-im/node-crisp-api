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

type WebsiteBatchConversationsOperation = {
  inbox_id?:  string;
  sessions?:  string[];
}

type WebsiteBatchPeopleOperationInner = {
  profiles?:  string[];
  search?:    string;
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
}


/**************************************************************************
 * EXPORTS
 ***************************************************************************/

export default WebsiteBatch;
