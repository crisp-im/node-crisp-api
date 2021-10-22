/*
 * node-crisp-api
 *
 * Copyright 2021, Crisp IM SARL
 * Author: Baptiste Jamin <baptiste@crisp.chat>
 */


"use strict";


/**
 * Crisp Plugin Service
 * @class
 * @classdesc This is the Crisp Plugin Service
 */
function Plugin() {
  this._resources = [
    "PluginConnect",
    "PluginSubscription"
  ];
}


module.exports = Plugin;
