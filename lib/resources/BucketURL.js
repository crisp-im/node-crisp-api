/*
 * node-crisp-api
 *
 * Copyright 2022, Crisp IM SAS
 * Author: Baptiste Jamin <baptiste@crisp.chat>
 */


"use strict";


/**
 * Crisp BucketURL Resource
 * @class
 * @classdesc This is the Crisp Bucket URL Resource
 */
function BucketURL(service, crisp) {
  /**
   * Generate Bucket URL
   * @memberof BucketURL
   * @method generateBucketURL
   * @param {object} data
   * @return {Promise}
   */
  service.generateBucketURL = function(data) {
    return crisp.post(
      crisp._prepareRestUrl(["bucket", "url", "generate"]), null, data
    );
  };
}


module.exports = BucketURL;
