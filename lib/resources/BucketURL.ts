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

// BucketURLRequestFile mapping
export type BucketURLRequestFile = {
  name?: string;
  type?: string;
};

// BucketURLRequestResource mapping
export type BucketURLRequestResource = {
  type?: string;
  id?: string;
};

// BucketURLRequest mapping
export type BucketURLRequest = {
  namespace?: string;
  id?: string;
  file?: BucketURLRequestFile;
  resource?: BucketURLRequestResource;
};

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

export default BucketURL;
