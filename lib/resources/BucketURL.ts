/*
 * node-crisp-api
 *
 * Copyright 2022, Crisp IM SAS
 * Author: Baptiste Jamin <baptiste@crisp.chat>
 */

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
 * @class
 * @param {object} service
 * @param {crisp} crisp
 * @classdesc This is the Crisp Bucket URL Resource
 */
class BucketURL extends BaseResource {
  /**
   * Generate Bucket URL
   * @param {BucketURLRequest} data
   */
  generateBucketURL(data: BucketURLRequest) {
    return this.crisp.post(
      this.crisp.prepareRestUrl(["bucket", "url", "generate"]), null, data
    );
  };
}

export default BucketURL;
