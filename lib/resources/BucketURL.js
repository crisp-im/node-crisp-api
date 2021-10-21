/*
 * node-crisp-api
 *
 * Copyright 2021, Crisp IM SARL
 * Author: Baptiste Jamin <baptiste@crisp.chat>
 */


"use strict";


/**
 * Crisp BucketURL Resource
 * @class
 * @classdesc This is the Crisp Bucket URL Resource
 */
function BucketURL(crisp) {
  /**
   * Generates a bucket URL.
   * @memberof BucketURL
   * @method post
   * @return Promise
   */
  this.generate = function(data) {
    return crisp.post(crisp._prepareRestUrl(["bucket", "url", "generate"]), {}, data);
  };
}


module.exports = BucketURL;
