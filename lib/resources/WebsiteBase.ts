/*
 * node-crisp-api
 *
 * Copyright 2022, Crisp IM SAS
 * Author: Baptiste Jamin <baptiste@crisp.chat>
 */

/**************************************************************************
 * IMPORTS
 ***************************************************************************/

// PROJECT: RESOURCES
import BaseResource from "./BaseResource";

/**************************************************************************
 * TYPES
 ***************************************************************************/

// Website mapping
type Website = {
  website_id?:  string;
  name?:        string;
  domain?:      string;
  logo?:        string;
}

type WebsiteCreate = {
  name?:        string;
  domain?:      string;
}

type WebsiteRemoveVerify = {
  method?:  string;
  secret?:  string;
}

export type WebsiteFilter = {
  model?:      string;
  criterion?:  string;
  operator?:   string;
  query?:      Record<string, unknown>;
}

/**************************************************************************
 * CLASSES
 ***************************************************************************/

/**
 * Crisp WebsiteBase Resource
 */
class WebsiteBase extends BaseResource {
  /**
   * Check If Website Exists
   * @memberof WebsiteBase
   * @public
   * @method checkWebsiteExists
   * @param {string} domain
   * @return {Promise}
   */
  checkWebsiteExists(domain: string) {
    return this.crisp.head(
      this.crisp.prepareRestUrl(["website"]),

      {
        domain: domain
      }
    );
  };

  /**
   * Create Website
   */
  createWebsite(websiteData: WebsiteCreate) : Promise<Website> {
    return this.crisp.post(
      this.crisp.prepareRestUrl(["website"]), null, websiteData
    );
  };

  /**
   * Get A Website
   * @memberof WebsiteBase
   * @public
   * @method getWebsite
   * @param {string} websiteID
   * @return {Promise}
   */
  getWebsite(websiteID: string) : Promise<Website> {
    return this.crisp.get(
      this.crisp.prepareRestUrl(["website", websiteID])
    );
  };

  /**
   * Delete A Website
   */
  deleteWebsite(websiteID: string, verify: WebsiteRemoveVerify) {
    return this.crisp.delete(
      this.crisp.prepareRestUrl(["website", websiteID]), undefined,

      {
        verify: verify
      }
    );
  };

  /**
   * Abort Website Deletion
   */
  abortWebsiteDeletion(websiteID: string) {
    return this.crisp.delete(
      this.crisp.prepareRestUrl(["website", websiteID, "expunge"])
    );
  };
}

/**************************************************************************
 * EXPORTS
 ***************************************************************************/

export default WebsiteBase;
