/*
 * node-crisp-api
 *
 * Copyright 2022, Crisp IM SAS
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
Crisp.DEFAULT_REQUEST_TIMEOUT            = 10000;
Crisp.DEFAULT_SOCKET_TIMEOUT             = 10000;
Crisp.DEFAULT_SOCKET_RECONNECT_DELAY     = 5000;
Crisp.DEFAULT_SOCKET_RECONNECT_DELAY_MAX = 10000;
Crisp.DEFAULT_SOCKET_RECONNECT_FACTOR    = 0.75;
Crisp.DEFAULT_SOCKET_SCHEDULE            = 500;
Crisp.DEFAULT_USERAGENT_PREFIX           = "node-crisp-api/";


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
  "session:set_subject",
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


// REST API services
var services = {
  Bucket  : require("./services/Bucket"),
  Media   : require("./services/Media"),
  Plugin  : require("./services/Plugin"),
  Website : require("./services/Website")
};


/**
 * Crisp API Library
 * @class
 * @classdesc This is the Crisp Library. Handles REST and RTM operations
 */
function Crisp() {
  this.auth = {};

  /**
   * @private
   * @type {string}
  */
  this._tier = "user";

  /** @private */
  this._rest = {
    host     : Crisp.DEFAULT_REST_HOST,
    basePath : Crisp.DEFAULT_REST_BASE_PATH
  };

  /** @private */
  this._rtm  = {
    host : Crisp.DEFAULT_RTM_HOST
  };

  /** @private */
  this._useragent       = (Crisp.DEFAULT_USERAGENT_PREFIX + pkg.version);

  /** @private */
  this._emitter         = new EventEmitter();

  /** @private */
  this._socket          = null;

  /** @private */
  this._socketScheduler = null;

  /** @private */
  this._socketBindHooks = [];

  /** @private */
  this._boundEvents     = [];

  // Prepare
  this._prepareServices();
}


Crisp.prototype = {
  /**
   * Set the REST API host
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
   * Set the RTM API host
   * @memberof Crisp
   * @method setRtmHost
   * @param {string} host - Hostname
   */
  setRtmHost : function(host) {
    if (typeof host === "string") {
      this._rtm.host = host;
    } else {
      throw new Error("[Crisp] setRtmHost: parameter host should be a string");
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
    // Ensure all input arguments are set
    if (typeof event !== "string") {
      throw new Error("[Crisp] on: parameter event should be a string");
    }
    if (typeof callback !== "function") {
      throw new Error("[Crisp] on: parameter callback should be a function");
    }

    // Disallow unrecognized event names
    if (Crisp.DEFAULT_RTM_EVENTS.indexOf(event) === -1) {
      throw new Error(
        "[Crisp] on: parameter event value is not recognized: '" + event + "'"
      );
    }

    // Important: we do not allow .on() to be called once socket is connected, \
    //   as we consider event listeners must be bound once all together. This \
    //   prevents bogous integrations from sending flood of 'socket:bind'` to \
    //   the RTM API.
    if (this._socket) {
      throw new Error(
        "[Crisp] on: socket is already bound, please bind event earlier on: "  +
          "'" + event + "'"
      );
    }

    // Add listener to emitter
    this._emitter.addListener(event, callback);

    // Subscribe event on the socket
    if (this._boundEvents.indexOf(event) === -1) {
      this._boundEvents.push(event);

      // Socket not connected? Connect now.
      this._prepareSocket(
        function(socket, emitter) {
          // Listen for event (once socket is bound)
          socket.on(event, function(data) {
            emitter.emit(event, data);
          });
        }
      );
    }
  },

  /**
   * Prepare a URI based from path segments
   * @memberof Crisp
   * @private
   * @method _prepareRestUrl
   * @param {Array} paths - List of paths ['session', 'login']
   */
  _prepareRestUrl : function(paths) {
    if (Array.isArray(paths)) {
      var output = this._rest.host + this._rest.basePath;

      output += paths.join("/");

      return output;
    }

    throw new Error(
      "[Crisp] prepareRestUrl: parameter host should be an Array"
    );
  },

  /**
   * Binds services to the main object
   * @memberof Crisp
   * @private
   * @method _prepareServices
   */
  _prepareServices : function() {
    // Bind services
    for (var name in services) {
      var serviceInstance = new services[name]();

      // No resources defined in service?
      if (!serviceInstance._resources  ||
            serviceInstance._resources.length === 0) {
        throw new Error("Service '" + name + "' has no resources defined");
      }

      // Prepare all resources (for service)
      this._prepareResources(
        serviceInstance, serviceInstance._resources
      );

      this[(name[0].toLowerCase() + name.substring(1))] = serviceInstance;
    }
  },

  /**
   * Binds resources to the service object
   * @memberof Crisp
   * @private
   * @param {object} serviceInstance
   * @param {Array} resources
   * @method _prepareResources
   */
  _prepareResources : function(serviceInstance, resources) {
    for (var i = 0; i < resources.length; i++) {
      var resourceConstructor = require("./resources/" + resources[i]);

      // Instanciate resource, which will auto-bind itself to service prototype
      new resourceConstructor(serviceInstance, this);
    }
  },

  /**
   * Binds socket to the main object
   * @memberof Crisp
   * @private
   * @method _prepareSocket
   * @param {function} fnBindHook
   */
  _prepareSocket : function(fnBindHook) {
    var self = this;

    var rtmHost = this._rtm.host;

    // Append bind hook to pending stack
    this._socketBindHooks.push(fnBindHook);

    // Make sure to prepare socket once? (defer socket binding, waiting that \
    //   all listeners have been bound, that way we submit the list of \
    //   filtered events to the RTM API once, and never again in the future)
    if (this._socketScheduler === null) {
      // Socket is already set? We should not even have entered there.
      if (this._socket) {
        throw new Error("[Crisp] illegal call to prepare socket (tie break)");
      }

      this._socketScheduler = setTimeout(function() {
        self._socket = require('socket.io-client')(rtmHost, {
          transports           : ["websocket"],
          timeout              : Crisp.DEFAULT_SOCKET_TIMEOUT,
          reconnection         : true,
          reconnectionDelay    : Crisp.DEFAULT_SOCKET_RECONNECT_DELAY,
          reconnectionDelayMax : Crisp.DEFAULT_SOCKET_RECONNECT_DELAY_MAX,
          randomizationFactor  : Crisp.DEFAULT_SOCKET_RECONNECT_FACTOR
        });

        self._emitAuthenticate();

        // Setup base socket event listeners
        self._socket.on("reconnect", function() {
          self._emitAuthenticate();
        });

        self._socket.on("unauthorized", function() {
          throw new Error(
            "[Crisp] cannot listen for events as authentication is invalid"
          );
        });

        // Setup user socket event listeners
        while (self._socketBindHooks.length > 0) {
          self._socketBindHooks.shift()(
            self._socket, self._emitter
          );
        }
      }, Crisp.DEFAULT_SOCKET_SCHEDULE);
    }
  },

  /**
   * Perform a request
   * @memberof Crisp
   * @private
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
            reason  : "error",
            message : "internal_error",
            code    : 500,

            data    : {
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
          var data_message   = ((response.body || {}).data || {}).message;

          return reject({
            reason  : "error",
            message : reason_message,
            code    : response.statusCode,

            data    : {
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
   * @private
   * @method _emitAuthenticate
   */
  _emitAuthenticate : function() {
    var auth = this.auth;
    var tier = this._tier;

    if (!this._socket) {
      throw new Error(
        "[Crisp] cannot listen for events as socket is not yet bound"
      );
    }
    if (!auth.identifier || !auth.key) {
      throw new Error(
        "[Crisp] cannot listen for events as you did not authenticate"
      );
    }
    if (this._boundEvents.length === 0) {
      throw new Error(
        "[Crisp] cannot listen for events as no event is being listened to"
      );
    }

    this._socket.emit("authentication", {
      username : auth.identifier,
      password : auth.key,
      tier     : tier,
      events   : this._boundEvents
    });
  }
};


module.exports = Crisp;
module.exports.Crisp = Crisp;
