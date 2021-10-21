/*
 * node-crisp-api
 *
 * Copyright 2021, Crisp IM SARL
 * Author: Baptiste Jamin <baptiste@crisp.chat>
 */


"use strict";


// Imports
var pkg           = require('../package.json');
var got           = require("got");

var EventEmitter  = require("fbemitter").EventEmitter;

var __Promise     = (
  (typeof Promise !== "undefined") ? Promise : require("q").Promise
);


// Base configuration
Crisp.DEFAULT_REQUEST_TIMEOUT = 10000;
Crisp.DEFAULT_USERAGENT_PREFIX = "node-crisp-api/"


// REST API defaults
Crisp.DEFAULT_REST_HOST        = "https://api.crisp.chat";
Crisp.DEFAULT_REST_BASE_PATH   = "/v1/";


// RTM API defaults
Crisp.DEFAULT_RTM_HOST   = "https://app.relay.crisp.chat";

Crisp.DEFAULT_RTM_EVENTS = [
  // Session Events
  "session:update_availability",
  "session:update_verify",
  "session:request:initiated",
  "session:set_email",
  "session:set_phone",
  "session:set_address",
  "session:set_avatar",
  "session:set_nickname",
  "session:set_data",
  "session:sync:pages",
  "session:sync:events",
  "session:sync:capabilities",
  "session:sync:geolocation",
  "session:sync:system",
  "session:sync:network",
  "session:sync:timezone",
  "session:sync:locales",
  "session:sync:rating",
  "session:set_state",
  "session:set_block",
  "session:set_segments",
  "session:set_opened",
  "session:set_closed",
  "session:set_participants",
  "session:set_mentions",
  "session:set_routing",
  "session:removed",

  // Message Events
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

  // People Events
  "people:profile:created",
  "people:profile:updated",
  "people:profile:removed",
  "people:bind:session",
  "people:sync:profile",
  "people:import:progress",
  "people:import:done",

  // Campaign Events
  "campaign:progress",
  "campaign:dispatched",
  "campaign:running",

  // Browsing Events
  "browsing:request:initiated",
  "browsing:request:rejected",

  // Call Events
  "call:request:initiated",
  "call:request:rejected",

  // Status Events
  "status:health:changed",

  // Website Event
  "website:update_visitors_count",
  "website:update_operators_availability",
  "website:users:available",

  // Bucket Events
  "bucket:url:upload:generated",
  "bucket:url:avatar:generated",
  "bucket:url:website:generated",
  "bucket:url:campaign:generated",
  "bucket:url:helpdesk:generated",
  "bucket:url:status:generated",
  "bucket:url:processing:generated",

  // Media Events
  "media:animation:listed",

  // Email Event
  "email:subscribe",
  "email:track:view",

  // Plugin Events
  "plugin:channel",
  "plugin:event",
  "plugin:settings:saved",
];


// REST API resources
var resources = {
  BucketUrl           : require("./resources/BucketURL"),
  MediaAnimation      : require("./resources/MediaAnimation"),
  PluginConnect       : require("./resources/PluginConnect"),
  PluginSubscription  : require("./resources/PluginSubscription"),
  WebsiteBase         : require("./resources/WebsiteBase"),
  WebsiteAnalytics    : require("./resources/WebsiteAnalytics"),
  WebsiteAvailability : require("./resources/WebsiteAvailability"),
  WebsiteBatch        : require("./resources/WebsiteBatch"),
  WebsiteCampaign     : require("./resources/WebsiteCampaign"),
  WebsiteConversation : require("./resources/WebsiteConversation"),
  WebsiteOperator     : require("./resources/WebsiteOperator"),
  WebsitePeople       : require("./resources/WebsitePeople"),
  WebsiteSettings     : require("./resources/WebsiteSettings"),
  WebsiteVerify       : require("./resources/WebsiteVerify"),
  WebsiteVisitors     : require("./resources/WebsiteVisitors")
};


/**
 * Crisp API Library
 * @class
 * @classdesc This is the Crisp Library. Handles REST and RTM operations
 */
function Crisp() {
  this.auth = {};

  this._tier = "user";

  this._rest = {
    host     : Crisp.DEFAULT_REST_HOST,
    basePath : Crisp.DEFAULT_REST_BASE_PATH
  };

  this._rtm = {
    host : Crisp.DEFAULT_RTM_HOST
  };

  this._useragent = (Crisp.DEFAULT_USERAGENT_PREFIX + pkg.version);

  this._emitter = new EventEmitter();

  this._socket = null;
  this._boundEvents = [];

  // Prepare
  this._prepareResources();
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
      throw new Error("[Crisp] setRestHost: parameter host should be a string");
    }
  },

  /**
   * Sets the tier
   * @memberof Crisp
   * @method setTier
   * @param {string} tier
   */
  setTier : function(tier) {
    this._tier = (tier || "user");
  },

  /**
   * Authenticate
   * @memberof Crisp
   * @method authenticate
   * @param {string} identifier
   * @param {string} key
   */
  authenticate : function(identifier, key) {
    var auth = this.auth;

    auth.identifier = identifier;
    auth.key        = key;

    auth.token      = Buffer.from(identifier + ":" + key).toString("base64");
  },

  /**
   * Authenticate (with tier)
   * @memberof Crisp
   * @method authenticateTier
   * @param {string} tier
   * @param {string} identifier
   * @param {string} key
   */
  authenticateTier : function(tier, identifier, key) {
    this.setTier(tier);
    this.authenticate(identifier, key);
  },

  /**
   * Method wrapper to HEAD a resource
   * @memberof Crisp
   * @method head
   * @param {string} resource
   * @param {object} query
   * @param {object} body
   */
  head : function(resource, query, body) {
    var self = this;

    return new __Promise(function(resolve, reject) {
      self._request(
        resource, "head", (query || {}), null, resolve, reject
      );
    });
  },

  /**
   * Method wrapper to GET a resource
   * @memberof Crisp
   * @method get
   * @param {string} resource
   * @param {object} query
   * @param {object} body
   */
  get : function(resource, query) {
    var self = this;

    return new __Promise(function(resolve, reject) {
      self._request(
        resource, "get", (query || {}), null, resolve, reject
      );
    });
  },

  /**
   * Method wrapper to POST a resource
   * @memberof Crisp
   * @method post
   * @param {string} resource
   * @param {object} query
   * @param {object} body
   */
  post : function(resource, query, body) {
    var self = this;

    return new __Promise(function(resolve, reject) {
      self._request(
        resource, "post", (query || {}), (body || {}), resolve, reject
      );
    });
  },

  /**
   * Method wrapper to PATCH a resource
   * @memberof Crisp
   * @method patch
   * @param {string} resource
   * @param {object} query
   * @param {object} body
   */
  patch : function(resource, query, body) {
    var self = this;

    return new __Promise(function(resolve, reject) {
      self._request(
        resource, "patch", (query || {}), (body || {}), resolve, reject
      );
    });
  },

  /**
   * Method wrapper to PUT a resource
   * @memberof Crisp
   * @method put
   * @param {string} resource
   * @param {object} query
   * @param {object} body
   */
  put : function(resource, query, body) {
    var self = this;

    return new __Promise(function(resolve, reject) {
      self._request(
        resource, "put", (query || {}), (body || {}), resolve, reject
      );
    });
  },

  /**
   * Method wrapper to DELETE a resource
   * @memberof Crisp
   * @method delete
   * @param {string} resource
   * @param {object} query
   * @param {object} body
   */
  delete : function(resource, query, body) {
    var self = this;

    return new __Promise(function(resolve, reject) {
      self._request(
        resource, "delete", (query || {}), (body || null), resolve, reject
      );
    });
  },

  /**
   * Bind socket event
   * @memberof Crisp
   * @method on
   * @param {string} event
   * @param {function} callback
   */
  on : function(event, callback) {
    if (typeof event !== "string") {
      throw new Error("[Crisp] on: parameter event should be a string");
    }
    if (typeof callback !== "function") {
      throw new Error("[Crisp] on: parameter callback should be a function");
    }

    this._emitter.addListener(event, callback);

    // If no already subscribed, subscribe on the socket
    if (this._boundEvents.indexOf(event) === -1) {
      var _emitter = this._emitter;

      this._boundEvents.push(event);

      // Socket not connected? Connect now.
      if (!this._socket) {
        this._prepareSocket();
      }

      // Listen for event
      this._socket.on(event, function(data) {
        _emitter.emit(event, data);
      });
    }
  },

  /**
   * Prepare a URI based from path segments
   * @memberof Crisp
   * @method _prepareRestUrl
   * @param {Array} paths - List of paths ['session', 'login']
   */
  _prepareRestUrl : function(paths) {
    if (Array.isArray(paths)) {
      var output = this._rest.host + this._rest.basePath;

      output += paths.join("/");

      return output;
    }

    throw new Error("[Crisp] prepareRestUrl: parameter host should be an Array");
  },

  /**
   * Binds resources to the main object
   * @memberof Crisp
   * @method _prepareResources
   */
  _prepareResources : function() {
    for (var name in resources) {
      this[(name[0].toLowerCase() + name.substring(1))] = (
        new resources[name](this)
      );
    }
  },

  /**
   * Binds socket to the main object
   * @memberof Crisp
   * @method _prepareSocket
   */
  _prepareSocket : function() {
    var rtmHost = this._rtm.host;

    if (!this._socket) {
      this._socket = require('socket.io-client')(rtmHost, {
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
   * Perform a request
   * @memberof Crisp
   * @method _request
   * @param {string} resource
   * @param {string} method
   * @param {object} query
   * @param {object} body
   * @param {function} resolve
   * @param {function} reject
   */
  _request : function(resource, method, query, body, resolve, reject) {
    var _parameters = {
      json    : true,
      timeout : Crisp.DEFAULT_REQUEST_TIMEOUT,

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
	          code       : 500,

            data       : {
              namespace : "request",

              message   : (
                "Got request error: " + (response.name || "Unknown")
              )
            }
          });
        }

        // Response error?
        if (response.statusCode >= 400) {
          var reason_message = ((response.body || {}).reason || "http_error");
          var data_message = ((response.body || {}).data || {}).message;

          return reject({
            reason     : "error",
            message    : reason_message,
	          code       : response.statusCode,

            data       : {
              namespace : "response",

              message   : (
                "Got response error: " + (data_message || reason_message)
              )
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
    var tier = this._tier;

    if (!auth.identifier || !auth.key) {
      throw new Error(
        "[Crisp] cannot listen for events as you did not authenticate"
      );
    }

    this._socket.emit("authentication", {
      username : auth.identifier,
      password : auth.key,
      tier     : tier,
      events   : Crisp.DEFAULT_RTM_EVENTS
    });
  },

  /**
   * Check if the socket exists
   * @memberof Crisp
   * @method _assertSocket
   */
  _assertSocket : function() {
    if (!this._socket) {
      throw new Error("[Crisp] you should be connected");
    }
  }
};


module.exports = Crisp;
module.exports.Crisp = Crisp;
