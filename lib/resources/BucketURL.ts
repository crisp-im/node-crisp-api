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

export type BucketURLRequestFile = {
  name?: string;
  type?: string;
};

export type BucketURLRequestResource = {
  type?: string;
  id?: string;
};

export type BucketURLRequest = {
  namespace?: string;
  id?: string;
  file?: BucketURLRequestFile;
  resource?: BucketURLRequestResource;
};

/**************************************************************************
 * CLASSES
 ***************************************************************************/

/**
 * Crisp BucketURL Resource
 */
class BucketURL extends BaseResource {
  /**
   * Generate Bucket URL
   */
  generateBucketURL(data: BucketURLRequest) {
    return this.crisp.post(
      this.crisp.prepareRestUrl(["bucket", "url", "generate"]), null, data
    );
  };
}

/**************************************************************************
 * EXPORTS
 ***************************************************************************/

export default BucketURL;
