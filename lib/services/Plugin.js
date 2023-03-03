/*
 * node-crisp-api
 *
 * Copyright 2022, Crisp IM SAS
 * Author: Baptiste Jamin <baptiste@crisp.chat>
 */


"use strict";


/**
 * Crisp Plugin Service
 * @class
 * @classdesc This is the Crisp Plugin Service
 */
function Plugin() {
  /**
   * @private
   * @type {Array}
  */
  this._resources = [
    "PluginConnect",
    "PluginSubscription"
  ];
}


module.exports = Plugin;
