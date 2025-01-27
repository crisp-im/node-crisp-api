/*
 * node-crisp-api
 *
 * Copyright 2022, Crisp IM SAS
 * Author: Baptiste Jamin <baptiste@crisp.chat>
 */


"use strict";


// Imports
var pkg           = require("../package.json");
var got           = require("got");

var URL           = require("url").URL;
var Crypto        = require("crypto");
var EventEmitter  = require("fbemitter").EventEmitter;


// RTM modes available
Crisp.RTM_MODES           = {
  WebSockets : "websockets",
  WebHooks   : "webhooks"
};

Crisp.AVAILABLE_RTM_MODES = [
  Crisp.RTM_MODES.WebSockets,
  Crisp.RTM_MODES.WebHooks
];


// Base configuration
Crisp.DEFAULT_REQUEST_TIMEOUT            = 10000;
Crisp.DEFAULT_SOCKET_TIMEOUT             = 10000;
Crisp.DEFAULT_SOCKET_RECONNECT_DELAY     = 5000;
Crisp.DEFAULT_SOCKET_RECONNECT_DELAY_MAX = 10000;
Crisp.DEFAULT_SOCKET_RECONNECT_FACTOR    = 0.75;
Crisp.DEFAULT_BROKER_SCHEDULE            = 500;
Crisp.DEFAULT_EVENT_REBIND_INTERVAL_MIN  = 2500;
Crisp.DEFAULT_USERAGENT_PREFIX           = "node-crisp-api/";


// REST API defaults
Crisp.DEFAULT_REST_HOST      = "https://api.crisp.chat";
Crisp.DEFAULT_REST_BASE_PATH = "/v1/";


// RTM API defaults
Crisp.DEFAULT_RTM_MODE   = Crisp.RTM_MODES.WebSockets;

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
  "session:sync:topic",
  "session:set_state",
  "session:set_block",
  "session:set_segments",
  "session:set_opened",
  "session:set_closed",
  "session:set_participants",
  "session:set_mentions",
  "session:set_routing",
  "session:set_inbox",
  "session:removed",
  "session:error",

  // Message Events
  "message:updated",
  "message:send",
  "message:received",
  "message:removed",
  "message:compose:send",
  "message:compose:receive",
  "message:acknowledge:read:send",
  "message:acknowledge:read:received",
  "message:acknowledge:delivered",
  "message:acknowledge:ignored",
  "message:notify:unread:send",
  "message:notify:unread:received",

  // Spam Events
  "spam:message",
  "spam:decision",

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
  /**
   * @public
   * @type {*}
  */
  this.bucket = {};

  /**
   * @public
   * @type {*}
  */
  this.media = {};

  /**
   * @public
   * @type {*}
  */
  this.plugin = {};

  /**
   * @public
   * @type {*}
  */
  this.website = {};

  /**
   * @public
   * @type {object}
  */
  this.auth = {
    tier       : "user",
    identifier : null,
    key        : null,
    token      : null
  };

  /**
   * @private
   * @type {object}
  */
  this._rest = {
    host     : Crisp.DEFAULT_REST_HOST,
    basePath : Crisp.DEFAULT_REST_BASE_PATH
  };

  /**
   * @private
   * @type {object}
  */
  this._rtm  = {
    host : null,
    mode : Crisp.DEFAULT_RTM_MODE
  };

  /**
   * @private
   * @type {string}
  */
  this._useragent       = (Crisp.DEFAULT_USERAGENT_PREFIX + pkg.version);

  /**
   * @private
   * @type {object}
  */
  this._emitter         = new EventEmitter();

  /**
   * @private
   * @type {object|null}
  */
  this._socket          = null;

  /**
   * @private
   * @type {object|null}
  */
  this._loopback        = null;

  /**
   * @private
   * @type {number|null}
  */
  this._lastEventRebind = null;

  /**
   * @private
   * @type {object|null}
  */
  this._brokerScheduler = null;

  /**
   * @private
   * @type {Array}
  */
  this._brokerBindHooks = [];

  /**
   * @private
   * @type {object}
  */
  this._boundEvents     = {};

  // Prepare
  this._prepareServices();
}


Crisp.prototype = {
  /**
   * Sets the REST API host
   * @memberof Crisp
   * @public
   * @method setRestHost
   * @param {string} host - Hostname
   * @return {undefined}
   */
  setRestHost : function(host) {
    if (typeof host === "string") {
      this._rest.host = host;
    } else {
      throw new Error("[Crisp] setRestHost: parameter host should be a string");
    }
  },

  /**
   * Sets the RTM API host
   * @memberof Crisp
   * @public
   * @method setRtmHost
   * @param {string} host - Hostname
   * @return {undefined}
   */
  setRtmHost : function(host) {
    if (typeof host === "string") {
      this._rtm.host = host;
    } else {
      throw new Error("[Crisp] setRtmHost: parameter host should be a string");
    }
  },

  /**
   * Sets the RTM channel mode (ie. WebSockets or Web Hooks)
   * @memberof Crisp
   * @public
   * @method setRtmMode
   * @param {string} mode - RTM mode ('websockets' or 'webhooks')
   * @return {undefined}
   */
  setRtmMode : function(mode) {
    if (Crisp.AVAILABLE_RTM_MODES.indexOf(mode) !== -1) {
      this._rtm.mode = mode;
    } else {
      throw new Error(
        "[Crisp] setRtmMode: parameter mode value should be one of: "  +
          Crisp.AVAILABLE_RTM_MODES.join(", ")
      );
    }
  },

  /**
   * Sets the authentication tier
   * @memberof Crisp
   * @public
   * @method setTier
   * @param {string} tier
   * @return {undefined}
   */
  setTier : function(tier) {
    this.auth.tier = (tier || "user");
  },

  /**
   * Authenticates
   * @memberof Crisp
   * @public
   * @method authenticate
   * @param {string} identifier
   * @param {string} key
   * @return {undefined}
   */
  authenticate : function(identifier, key) {
    var auth = this.auth;

    // Store credentials
    auth.identifier = identifier;
    auth.key        = key;

    // Assign pre-computed authentication token
    auth.token = Buffer.from(identifier + ":" + key).toString("base64");
  },

  /**
   * Authenticates (with tier)
   * @memberof Crisp
   * @public
   * @method authenticateTier
   * @param {string} tier
   * @param {string} identifier
   * @param {string} key
   * @return {undefined}
   */
  authenticateTier : function(tier, identifier, key) {
    this.setTier(tier);
    this.authenticate(identifier, key);
  },

  /**
   * Method wrapper to HEAD a resource
   * @memberof Crisp
   * @public
   * @method head
   * @param {string} resource
   * @param {object} query
   * @param {object} body
   * @return {Promise}
   */
  head : function(resource, query, body) {
    var self = this;

    return new Promise(function(resolve, reject) {
      self._request(
        resource, "head", (query || {}), null, resolve, reject
      );
    });
  },

  /**
   * Method wrapper to GET a resource
   * @memberof Crisp
   * @public
   * @method get
   * @param {string} resource
   * @param {object} query
   * @param {object} body
   * @return {Promise}
   */
  get : function(resource, query) {
    var self = this;

    return new Promise(function(resolve, reject) {
      self._request(
        resource, "get", (query || {}), null, resolve, reject
      );
    });
  },

  /**
   * Method wrapper to POST a resource
   * @memberof Crisp
   * @public
   * @method post
   * @param {string} resource
   * @param {object} query
   * @param {object} body
   * @return {Promise}
   */
  post : function(resource, query, body) {
    var self = this;

    return new Promise(function(resolve, reject) {
      self._request(
        resource, "post", (query || {}), (body || {}), resolve, reject
      );
    });
  },

  /**
   * Method wrapper to PATCH a resource
   * @memberof Crisp
   * @public
   * @method patch
   * @param {string} resource
   * @param {object} query
   * @param {object} body
   * @return {Promise}
   */
  patch : function(resource, query, body) {
    var self = this;

    return new Promise(function(resolve, reject) {
      self._request(
        resource, "patch", (query || {}), (body || {}), resolve, reject
      );
    });
  },

  /**
   * Method wrapper to PUT a resource
   * @memberof Crisp
   * @public
   * @method put
   * @param {string} resource
   * @param {object} query
   * @param {object} body
   * @return {Promise}
   */
  put : function(resource, query, body) {
    var self = this;

    return new Promise(function(resolve, reject) {
      self._request(
        resource, "put", (query || {}), (body || {}), resolve, reject
      );
    });
  },

  /**
   * Method wrapper to DELETE a resource
   * @memberof Crisp
   * @public
   * @method delete
   * @param {string} resource
   * @param {object} query
   * @param {object} body
   * @return {Promise}
   */
  delete : function(resource, query, body) {
    var self = this;

    return new Promise(function(resolve, reject) {
      self._request(
        resource, "delete", (query || {}), (body || null), resolve, reject
      );
    });
  },

  /**
   * Binds RTM event
   * @memberof Crisp
   * @public
   * @method on
   * @param {string} event
   * @param {function} callback
   * @return {Promise}
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
    //   or loopback is bound as we consider event listeners must be bound \
    //   once all together. This prevents bogous integrations from sending \
    //   flood of 'socket:bind'` to the RTM API, if using WebSockets. Web \
    //   Hooks follows the same scheme for consistency's sake.
    if (this._socket || this._loopback) {
      throw new Error(
        "[Crisp] on: connector is already bound, please listen to event "  +
          "earlier on: '" + event + "'"
      );
    }

    // Add listener to emitter
    this._emitter.addListener(event, callback);

    // Subscribe event on the broker
    if (this._boundEvents[event] !== true) {
      var rtmMode = this._rtm.mode;

      // Mark event as bound
      this._boundEvents[event] = true;

      // Broker not connected? Connect now.
      return this._prepareBroker(
        function(instance, emitter) {
          // Listen for event? (once instance is bound)
          switch (rtmMode) {
            case Crisp.RTM_MODES.WebSockets: {
              // Listen on socket event
              instance.on(event, function(data) {
                emitter.emit(event, data);
              });

              break;
            }
          }
        }
      );
    }

    return Promise.resolve();
  },

  /**
   * Receives a raw event and dispatches it to the listener (used for Web Hooks)
   * @memberof Crisp
   * @public
   * @method receiveHook
   * @param {object} body
   * @return {undefined}
   */
  receiveHook : function(body) {
    var self = this;

    if (self._loopback) {
      // Ensure payload is readable
      if (!body || typeof body !== "object") {
        return new Error("[Crisp] receiveHook: empty hook payload");
      }

      // Ensure payload is properly formatted
      if (!body.event || !body.data  ||
            typeof body.event !== "string" || typeof body.data !== "object") {
        return new Error("[Crisp] receiveHook: malformatted hook payload");
      }

      // Check if event is subscribed to? (in routing table)
      // Notice: if not in routing table, then silently discard the event w/o \
      //   any error, as we do not want an HTTP failure status to be sent in \
      //   response by the implementor.
      if (self._boundEvents[body.event] !== true) {
        return null;
      }

      // Dispatch event to event bus
      // Notice: go asynchronous, so that the event is processed ASAP and \
      //   dispatched on the event bus later, as the hook might be received \
      //   synchronously over HTTP.
      process.nextTick(function() {
        self._loopback.emit(body.event, body.data);
      });

      return null;
    }

    return new Error("[Crisp] receiveHook: hook loopback not bound");
  },

  /**
   * Verifies an event string and checks that signatures match (used for Web \
   *   Hooks)
   * @memberof Crisp
   * @public
   * @method verifyHook
   * @param {string} secret
   * @param {object} body
   * @param {string} timestamp
   * @param {string} signature
   * @return {boolean}
   */
  verifyHook : function(secret, body, timestamp, signature) {
    if (this._loopback) {
      return this._verifySignature(secret, body, timestamp, signature);
    }

    // Default: not verified (loopback not /yet?/ bound)
    return false;
  },

  /**
   * Verifies an event string and checks that signatures match (used for \
   *   Widgets)
   * @memberof Crisp
   * @public
   * @method verifyWidget
   * @param {string} secret
   * @param {object} body
   * @param {string} timestamp
   * @param {string} signature
   * @return {boolean}
   */
  verifyWidget : function(secret, body, timestamp, signature) {
    return this._verifySignature(secret, body, timestamp, signature);
  },

  /**
   * Rebinds socket events (used for WebSockets)
   * @memberof Crisp
   * @public
   * @method rebind
   * @return {Promise}
   */
  rebindSocket : function() {
    var self = this;

    if (!self._socket) {
      throw new Error(
        "[Crisp] rebindSocket: cannot rebind a socket that is not yet bound"
      );
    }

    // Make sure that the library user is not rebinding too frequently (which \
    //   is illegal)
    var nowTime = Date.now();

    if (self._lastEventRebind !== null  &&
          ((nowTime - self._lastEventRebind)  <
              Crisp.DEFAULT_EVENT_REBIND_INTERVAL_MIN)) {
      throw new Error(
        "[Crisp] rebindSocket: cannot rebind, last rebind was requested too "  +
          "recently"
      );
    }

    return Promise.resolve()
      .then(function() {
        // Rebind to socket events (eg. newly bound websites)
        self._lastEventRebind = nowTime;

        self._socket.emit("socket:bind", {});

        return Promise.resolve();
      });
  },

  /**
   * Prepares a URI based from path segments
   * @memberof Crisp
   * @private
   * @method _prepareRestUrl
   * @param {Array} paths - List of paths ['session', 'login']
   * @return {string}
   */
  _prepareRestUrl : function(paths) {
    if (Array.isArray(paths) === true) {
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
   * @return {undefined}
   */
  _prepareServices : function() {
    // Bind services
    for (var name in services) {
      var serviceInstance = new services[name]();

      // Acquire service map
      var serviceMap = this[(name[0].toLowerCase() + name.substring(1))];

      // No service map available?
      if (!serviceMap) {
        throw new Error(
          "[Crisp] prepareServices: service '" + name + "' has no map available"
        );
      }

      // No resources defined in service?
      if (!serviceInstance._resources  ||
            serviceInstance._resources.length === 0) {
        throw new Error(
          "[Crisp] prepareServices: service '" + name + "' has no resources "  +
            "defined"
        );
      }

      // Prepare all resources (for service)
      this._prepareResources(
        serviceMap, serviceInstance._resources
      );
    }
  },

  /**
   * Binds resources to the service object
   * @memberof Crisp
   * @private
   * @method _prepareResources
   * @param {object} serviceMap
   * @param {Array} resources
   * @return {undefined}
   */
  _prepareResources : function(serviceMap, resources) {
    for (var i = 0; i < resources.length; i++) {
      var resourceConstructor = require("./resources/" + resources[i]);

      // Instanciate resource, which will auto-bind itself to service prototype
      new resourceConstructor(serviceMap, this);
    }
  },

  /**
   * Binds broker to the main object
   * @memberof Crisp
   * @private
   * @method _prepareBroker
   * @param {function} fnBindHook
   * @return {Promise}
   */
  _prepareBroker : function(fnBindHook) {
    var self = this;

    return new Promise(function(resolve, reject) {
      var rtmMode         = self._rtm.mode,
          rtmHostOverride = self._rtm.host;

      // Append bind hook to pending stack
      self._brokerBindHooks.push(fnBindHook);

      // Make sure to prepare broker once? (defer broker binding, waiting that \
      //   all listeners have been bound, that way we submit the list of \
      //   filtered events to the RTM API once, and never again in the future)
      if (self._brokerScheduler === null) {
        // Socket or loopback already set? We should not even have entered \
        //   there.
        if (self._socket || self._loopback) {
          throw new Error(
            "[Crisp] prepareBroker: illegal call to prepare broker (tie break)"
          );
        }

        self._brokerScheduler = setTimeout(function() {
          switch (rtmMode) {
            case Crisp.RTM_MODES.WebSockets: {
              // Connect to socket now
              // Notice: will unstack broker bind hooks once ready
              self._connectSocket(rtmHostOverride)
                .then(resolve)
                .catch(reject);

              break;
            }

            case Crisp.RTM_MODES.WebHooks: {
              // Connect to loopback now
              self._connectLoopback()
                .then(resolve)
                .catch(reject);

              break;
            }

            default: {
              var unsupportedError = new Error(
                "[Crisp] prepareBroker: mode of RTM broker unsupported "  +
                  "('" + rtmMode + "')"
              );

              reject(unsupportedError);
            }
          }
        }, Crisp.DEFAULT_BROKER_SCHEDULE);
      } else {
        // Pass-through
        resolve();
      }
    });
  },

  /**
   * Connects loopback (used for Web Hooks)
   * @memberof Crisp
   * @private
   * @method _connectLoopback
   * @return {Promise}
   */
  _connectLoopback : function() {
    var self = this;

    return Promise.resolve()
      .then(function() {
        // Assign emitter to loopback
        self._loopback = self._emitter;

        // Unstack broker bind hooks immediately
        self._unstackBrokerBindHooks(self._loopback);

        return Promise.resolve();
      });
  },

  /**
   * Connects socket, using preferred RTM API host (used for WebSockets)
   * @memberof Crisp
   * @private
   * @method _connectSocket
   * @param {string} rtmHostOverride
   * @return {Promise}
   */
  _connectSocket : function(rtmHostOverride) {
    var self = this;

    return Promise.resolve()
      .then(function() {
        // Any override RTM API host?
        if (rtmHostOverride) {
          return Promise.resolve({
            socket : {
              app : rtmHostOverride
            }
          });
        }

        // Acquire RTM API URL from remote
        var restUrlSegments;

        switch (self.auth.tier) {
          case "plugin": {
            restUrlSegments = ["plugin", "connect", "endpoints"];

            break;
          }

          default: {
            restUrlSegments = ["user", "connect", "endpoints"];
          }
        }

        return self.get(
          self._prepareRestUrl(restUrlSegments)
        )
          .catch(function() {
            // Void error (consider as empty response)
            return Promise.resolve({});
          });
      })
      .then(function(endpoints) {
        var rtmHostAffinity = ((endpoints.socket || {}).app || null);

        // No RTM API host acquired?
        if (rtmHostAffinity === null) {
          throw new Error(
            "[Crisp] connectSocket: could not acquire target host to "  +
              "connect to, is your session valid for tier?"
          );
        }

        // Parse target RTM API host as an URL object
        var rtmHostUrl = new URL(rtmHostAffinity);

        // Connect to socket
        self._socket = require("socket.io-client")(rtmHostUrl.origin, {
          path                 : (rtmHostUrl.pathname || "/"),
          transports           : ["websocket"],
          timeout              : Crisp.DEFAULT_SOCKET_TIMEOUT,
          reconnection         : true,
          reconnectionDelay    : Crisp.DEFAULT_SOCKET_RECONNECT_DELAY,
          reconnectionDelayMax : Crisp.DEFAULT_SOCKET_RECONNECT_DELAY_MAX,
          randomizationFactor  : Crisp.DEFAULT_SOCKET_RECONNECT_FACTOR
        });

        self._emitAuthenticateSocket();

        // Setup base socket event listeners
        self._socket.io.on("reconnect", function() {
          self._emitAuthenticateSocket();
        });

        self._socket.on("unauthorized", function() {
          throw new Error(
            "[Crisp] connectSocket: cannot listen for events as "  +
              "authentication is invalid"
          );
        });

        // Setup user socket event listeners
        self._unstackBrokerBindHooks(self._socket);

        return Promise.resolve();
      });
  },

  /**
   * Authenticates client (used for WebSockets)
   * @memberof Crisp
   * @private
   * @method _emitAuthenticateSocket
   * @return {undefined}
   */
  _emitAuthenticateSocket : function() {
    var auth        = this.auth,
        boundEvents = Object.keys(this._boundEvents);

    if (!this._socket) {
      throw new Error(
        "[Crisp] emitAuthenticateSocket: cannot listen for events as socket "  +
          "is not yet bound"
      );
    }
    if (!auth.identifier || !auth.key) {
      throw new Error(
        "[Crisp] emitAuthenticateSocket: cannot listen for events as you "  +
          "did not authenticate"
      );
    }
    if (boundEvents.length === 0) {
      throw new Error(
        "[Crisp] emitAuthenticateSocket: cannot listen for events as no "  +
          "event is being listened to"
      );
    }

    this._socket.emit("authentication", {
      username : auth.identifier,
      password : auth.key,
      tier     : auth.tier,
      events   : boundEvents
    });
  },

  /**
   * Unstacks pending broker bind hooks
   * @memberof Crisp
   * @private
   * @method _unstackBrokerBindHooks
   * @param {object} modeInstance
   * @return {undefined}
   */
  _unstackBrokerBindHooks : function(modeInstance) {
    // Setup user socket event listeners
    while (this._brokerBindHooks.length > 0) {
      this._brokerBindHooks.shift()(
        modeInstance, this._emitter
      );
    }
  },

  /**
   * Performs a request to REST API
   * @memberof Crisp
   * @private
   * @method _request
   * @param {string} resource
   * @param {string} method
   * @param {object} query
   * @param {object} body
   * @param {function} resolve
   * @param {function} reject
   * @return {undefined}
   */
  _request : function(resource, method, query, body, resolve, reject) {
    var self = this;

    var requestParameters = {
      responseType    : "json",
      timeout         : Crisp.DEFAULT_REQUEST_TIMEOUT,

      headers         : {
        "User-Agent"   : self._useragent,
        "X-Crisp-Tier" : self.auth.tier
      },

      throwHttpErrors : false
    };

    // Add authorization?
    if (self.auth.token) {
      requestParameters.headers.Authorization = ("Basic " + self.auth.token);
    }

    // Add body?
    if (body) {
      requestParameters.json = body;
    }

    // Add query?
    if (query) {
      requestParameters.searchParams = query;
    }

    // Proceed request
    got[method](resource, requestParameters)
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
          var reason_message = self._readErrorResponseReason(
            method, response.statusCode, response
          );
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
   * Reads reason for error response
   * @memberof Crisp
   * @private
   * @method _readErrorResponseReason
   * @param {string} method
   * @param {number} statusCode
   * @param {object} response
   * @return {string}
   */
  _readErrorResponseReason : function(method, statusCode, response) {
    // HEAD method? As HEAD requests do not expect any response body, then we \
    //   cannot map a reason from the response.
    if (method === "head") {
      // 5xx errors?
      if (statusCode >= 500) {
        return "server_error";
      }

      // 4xx errors?
      if (statusCode >= 400) {
        return "route_error";
      }
    }

    // Other methods must hold a response body, therefore we can fallback on \
    //   an HTTP error if we fail to acquire any reason at all.
    return ((response.body || {}).reason || "http_error");
  },

  /**
   * Verifies an event string and checks that signatures match
   * @memberof Crisp
   * @private
   * @method verifyHook
   * @param {string} secret
   * @param {object} body
   * @param {string} timestamp
   * @param {string} signature
   * @return {boolean}
   */
  _verifySignature : function(secret, body, timestamp, signature) {
    // Ensure all provided data is valid
    if (!secret || !signature || !body || typeof body !== "object"  ||
          !timestamp || isNaN(timestamp) === true) {
      return false;
    }

    // Compute local trace
    var localTrace = ("[" + timestamp + ";" + JSON.stringify(body) + "]");

    // Create local HMAC
    var localMac = Crypto.createHmac("sha256", secret);

    localMac.update(localTrace);

    // Compute local signature, and compare
    var localSignature = localMac.digest("hex");

    return (
      (signature === localSignature) ? true : false
    );
  }
};


module.exports = Crisp;
module.exports.Crisp = Crisp;
