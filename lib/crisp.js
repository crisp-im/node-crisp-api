/*
 * Bundle: Crisp
 * Project: Crisp - Node API
 * Author: Baptiste Jamin http://jamin.me/
 * Copyright: 2016, Crisp IM
 */

"use strict";

//Rest default configuration
Crisp.DEFAULT_REST_HOST = "https://api.crisp.im";
Crisp.DEFAULT_REST_BASE_PATH = "/v1/";

//Realtime default configuration
Crisp.DEFAULT_REALTIME_HOST = "app.crisp.im";
Crisp.DEFAULT_REALTIME_PORT = "443";

var resources = {
  UserSession           : require("./resources/UserSession"),
  UserAccount           : require("./resources/UserAccount"),
  UserNotification      : require("./resources/UserNotification"),
  UserWebsites          : require("./resources/UserWebsites"),
  UserSchedule          : require("./resources/UserSchedule"),
  UserProfile           : require("./resources/UserProfile"),
  Website               : require("./resources/Website"),
  WebsiteOperator       : require("./resources/WebsiteOperator"),
  WebsiteStats          : require("./resources/WebsiteStats"),
  WebsiteSettings       : require("./resources/WebsiteSettings"),
  WebsiteConversations  : require("./resources/WebsiteConversations"),
};

/**
 * Crisp API Library
 * @class
 * @classdesc This is the Crisp Library. Handles REST and Realtime operatios
 */

function Crisp() {
  if (!(this instanceof Crisp)) {
    return new Crisp();
  }

  this.auth = {};

  this._rest = {
    host: Crisp.DEFAULT_REST_HOST,
    basePath: Crisp.DEFAULT_REST_BASE_PATH
  };

  this._prepResources();
}

Crisp.prototype = {

  /**
   * Set the Rest Endpoint host
   * @memberof Crisp
   * @method setRestHost
   * @param {string} host - Hostname
   */
  setRestHost : function(host) {
    if (typeof host === "string") {
      this._rest.host = host;
    } else {
      throw new Error("Crisp, setRestHost: parameter host should be a String");
    }
  },

  /**
   * Prepare a URI based from params
   * @memberof prepareRestUrl
   * @method _prepareRestUrl
   * @param {Array} paths - List of paths ['session', 'login']
   */

  _prepareRestUrl : function(paths) {
    if (Array.isArray(paths)) {
      var output = this._rest.host + this._rest.basePath;
      output += paths.join("/");
      return output;

    } else {
      throw new Error("Crisp, prepareRestUrl: parameter host should be an Array");
    }
  },

  /**
   * Binds ressources to the main object
   * @memberof Crisp
   * @method _prepResources
   */
  _prepResources : function() {
    for (var name in resources) {
      this[
        name[0].toLowerCase() + name.substring(1)
      ] = new resources[name](this);
    }
  }

};

module.exports = Crisp;
module.exports.Crisp = Crisp;
