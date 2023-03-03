/*
 * node-crisp-api
 *
 * Copyright 2022, Crisp IM SAS
 * Author: Baptiste Jamin <baptiste@crisp.chat>
 */


"use strict";


/**
 * Crisp Bucket Service
 * @class
 * @classdesc This is the Crisp Bucket Service
 */
function Bucket() {
  /**
   * @private
   * @type {Array}
  */
  this._resources = [
    "BucketURL"
  ];
}


module.exports = Bucket;
