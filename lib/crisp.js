/*
 * Bundle: Crisp
 * Project: Crisp - Node API
 * Author: Baptiste Jamin http://jamin.me/
 * Copyright: 2016, Crisp IM
 */

"use strict";

var EventEmitter = require("fbemitter").EventEmitter;
var got          = require("got");
var pjson        = require('../package.json');
var __Promise    = (
  (typeof Promise !== "undefined") ?
    Promise : require("q").Promise
);

//Rest default configuration
Crisp.DEFAULT_REST_HOST       = "https://api.crisp.chat";
Crisp.DEFAULT_REST_BASE_PATH  = "/v1/";
Crisp.DEFAULT_USERAGENT       = "node-crisp-api/"

var DEFAULT_TIMEOUT           = 10000;

//Realtime default configuration
Crisp.DEFAULT_REALTIME_HOST   = "https://app.relay.crisp.chat";


Crisp.DEFAULT_REALTIME_EVENTS = [
    "message:updated",
    "message:send",
    "message:received",
    "message:compose:send",
    "message:compose:receive",
    "message:acknowledge:read:send",
    "message:acknowledge:read:received",
    "message:acknowledge:delivered",
    "message:notify:unread:send",
    "message:notify:unread:received",
    "session:update_availability",
    "session:update_verify",
    "session:set_email",
    "session:set_phone",
    "session:set_address",
    "session:set_data",
    "session:set_avatar",
    "session:set_nickname",
    "session:set_state",
    "session:set_block",
    "session:set_segments",
    "session:set_opened",
    "session:set_closed",
    "session:set_mentions",
    "session:set_routing",
    "session:removed",
    "session:request:initiated",
    "session:sync:capabilities",
    "session:sync:geolocation",
    "session:sync:system",
    "session:sync:network",
    "session:sync:timezone",
    "session:sync:locales",
    "session:sync:pages",
    "session:sync:events",
    "people:profile:created",
    "people:profile:removed",
    "people:bind:session",
    "people:sync:profile",
    "people:import:progress",
    "people:import:done",
    "campaign:progress",
    "campaign:dispatched",
    "campaign:running",
    "bucket:url:upload:generated",
    "bucket:url:avatar:generated",
    "bucket:url:campaign:generated",
    "bucket:url:helpdesk:generated",
    "bucket:url:processing:generated",
    "media:animation:listed",
    "website:update_visitors_count",
    "website:update_operators_availability",
    "website:users:available",
    "email:subscribe",
    "email:track:view"
];

var resources = {
  UserProfile           : require("./resources/UserProfile"),
  Website               : require("./resources/Website"),
  WebsiteOperators      : require("./resources/WebsiteOperators"),
  WebsiteStats          : require("./resources/WebsiteStats"),
  WebsiteSettings       : require("./resources/WebsiteSettings"),
  WebsiteConversations  : require("./resources/WebsiteConversations"),
  WebsitePeople         : require("./resources/WebsitePeople"),
  PluginSubscriptions   : require("./resources/PluginSubscriptions")
};

/**
 * Crisp API Library
 * @class
 * @classdesc This is the Crisp Library. Handles REST and Realtime operatios
 */

function Crisp() {

  this.auth = {};

  this._rest = {
    host: Crisp.DEFAULT_REST_HOST,
    basePath: Crisp.DEFAULT_REST_BASE_PATH
  };

  this._tier = "user";

  this._realtime = {
    host : Crisp.DEFAULT_REALTIME_HOST
  };

  this._useragent = Crisp.DEFAULT_USERAGENT + pjson.version;

  this._socket = null;

  this._emitter = new EventEmitter();

  this._bindedEvents = [];

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
      throw new Error("Crisp, setRestHost: parameter host should be a string");
    }
  },

  /**
   * Sets the tier
   * @memberof Crisp
   * @method setTier
   */
  setTier : function(tier) {
    if (tier === "plugin") {
      this._tier = tier;
    } else {
      this._tier = "user";
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
  },

  /**
   * Binds socket to the main object
   * @memberof Crisp
   * @method _prepareSocket
   */
  _prepareSocket : function() {
    var realTimehost = this._realtime.host;

    if (!this._socket) {
      this._socket = require('socket.io-client')(realTimehost, {
        transports: ["websocket"]
      });
    }

    var self = this;

    self._emitAuthenticate();

    this._socket.on("reconnect", function() {
      self._emitAuthenticate();
    });
  },


  /**
   * Authenticate
   * @memberof Crisp
   * @method authenticate
   */
  authenticate : function(identifier, key) {
    var auth = this.auth;

    auth.identifier = identifier;
    auth.key = key;

    auth.token = Buffer.from(identifier + ":" + key).toString("base64");
  },

  /**
   * Method wrapper to get a ressource
   * @memberof Crisp
   * @method get
   */
  get : function(resource, query) {
    var self = this;

    query = (query || {});
    return new __Promise(function(resolve, reject) {
      self._request(
        resource, "get", query, null, resolve, reject
      );
    });
  },

  /**
   * Method wrapper to post a ressource
   * @memberof Crisp
   * @method post
   */
  post : function(resource, query, body) {
    var self = this;

    query = (query || {});
    return new __Promise(function(resolve, reject) {
      self._request(
        resource, "post", query, body || {}, resolve, reject
      );
    });
  },

  /**
   * Method wrapper to patch a ressource
   * @memberof Crisp
   * @method patch
   */
  patch : function(resource, query, body) {
    var self = this;

    query = (query || {});
    return new __Promise(function(resolve, reject) {
      self._request(
        resource, "patch", query, body || {}, resolve, reject
      );
    });
  },

  /**
   * Method wrapper to put a ressource
   * @memberof Crisp
   * @method put
   */
  put : function(resource, query, body) {
    var self = this;

    query = (query || {});
    return new __Promise(function(resolve, reject) {
      self._request(
        resource, "put", query, body || {}, resolve, reject
      );
    });
  },

  /**
   * Method wrapper to head a ressource
   * @memberof Crisp
   * @method head
   */
  head : function(resource, query, body) {
    var self = this;

    query = (query || {});
    return new __Promise(function(resolve, reject) {
      self._request(
        resource, "head", query, null, resolve, reject
      );
    });
  },

  /**
   * Method wrapper to delete a ressource
   * @memberof Crisp
   * @method delete
   */
  delete : function(resource, query, body) {
    var self = this;

    query = (query || {});
    return new __Promise(function(resolve, reject) {
      self._request(
        resource, "delete", query, null, resolve, reject
      );
    });
  },

  /**
   * get a ressource
   * @memberof Crisp
   * @method _request
   */
  _request : function(resource, method, query, body, resolve, reject) {
    var _parameters = {
      json    : true,
      timeout : DEFAULT_TIMEOUT,

      headers : {
        "User-Agent"   : this._useragent,
        "X-Crisp-Tier" : this._tier
      }
    };

    // Add authorization?
    if (this.auth.token) {
      _parameters.headers.Authorization = ("Basic " + this.auth.token);
    }

    // Add body?
    if (body) {
      _parameters.body = body;
    }

    // Add query?
    if (query) {
      _parameters.query = query;
    }

    // Proceed request
    got[method](resource, _parameters)
      .catch(function(error) {
        return Promise.resolve(error);
      })
      .then(function(response, error) {
        var data = response.body;

        // Request error?
        if (!response.statusCode) {
          return reject({
            reason     : "error",
            message    : "internal_error",
	    statusCode : 500,
            data       : {
              namespace : "request",
              message   : ("Got request error: " + (response.name || "Unknown"))
            }
          });
        }

        // Response error?
        if (response.statusCode >= 400) {
          return reject({
            reason     : "error",
            message    : ((response.body || {}).reason || "http_error"),
	    statusCode : response.statusCode,
            data       : {
              namespace : "response",
              message   : ("Got response status: " + response.statusCode)
            }
          });
        }

        // Regular response
        return resolve(
          (response.body || {}).data || {}
        );
      });
  },

  /**
   * Authenticate client
   * @memberof Crisp
   * @method _emitAuthenticate
   */
  _emitAuthenticate : function() {
    var auth = this.auth;

    if (!auth.identifier || !auth.key) {
      throw new Error(
        "Crisp, cannot listen for events as you did not authenticate"
      );
    }

    this._socket.emit("authentication", {
      username : auth.identifier,
      password : auth.key,
      events   : Crisp.DEFAULT_REALTIME_EVENTS
    });
  },

  /**
   * Check if the socket exists
   * @memberof Crisp
   * @method _assertSocket
   */
  _assertSocket : function() {
    if (!this._socket) {
      throw new Error("Crisp, you should be connected");
    }
  },

  /**
   * Check if the socket exists
   * @memberof Crisp
   * @method _assertSocket
   * @param {string} event
   * @param {Function} callback
   */
  on : function(event, callback) {
    if (typeof event !== "string") {
      throw new Error("Crisp, on: parameter event should be a string");
    }

    if (typeof callback !== "function") {
      throw new Error("Crisp, on: parameter callback should be a function");
    }

    this._emitter.addListener(event, callback);

    // If no already subscribed, we subscribe it
    if (this._bindedEvents.indexOf(event) === -1) {
      var _emitter = this._emitter;

      this._bindedEvents.push(event);

      // Socket not connected? Connect now.
      if (!this._socket) {
        this._prepareSocket();
      }

      // Listen for event
      this._socket.on(event, function(data) {
        _emitter.emit(event, data);
      });
    }
  }

};

module.exports = Crisp;
module.exports.Crisp = Crisp;
