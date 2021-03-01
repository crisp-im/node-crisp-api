/*
 * Bundle: Resources / Buckets
 * Project: Crisp - Node API
 * Author: Mitchell R <https://github.com/mrinc>
 * Copyright: 2016, Crisp IM
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
  this.generate = function(content) {
    return crisp.post(crisp._prepareRestUrl(["bucket", "url", "generate"]), {}, content);
  };
}

module.exports = Buckets;