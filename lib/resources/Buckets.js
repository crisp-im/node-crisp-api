/*
 * node-crisp-api
 *
 * Copyright 2021, Crisp IM SARL
 * Author: Baptiste Jamin <baptiste@crisp.chat>
 */

"use strict";

/**
 * Crisp Buckets Resource
 * @class
 * @classdesc This is the Crisp Buckets Resource
 */
function Buckets(crisp) {
  /**
   * Generates a bucket URL.
   * @memberof Buckets
   * @method post
   * @return Promise
   */
  this.generate = function(data) {
    return crisp.post(crisp._prepareRestUrl(["bucket", "url", "generate"]), {}, data);
  };
}

module.exports = Buckets;
