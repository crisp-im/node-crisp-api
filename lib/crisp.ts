/*
 * node-crisp-api
 *
 * Copyright 2022, Crisp IM SAS
 * Author: Baptiste Jamin <baptiste@crisp.chat>
 */

// Imports
import fs            from "fs";
import got           from "got";
import { io as socketio } from "socket.io-client";

import { URL }       from "url";

import Crypto        from "crypto";
import mitt, { Emitter } from "mitt";

// RTM modes available
const RTM_MODES           = {
  WebSockets : "websockets",
  WebHooks   : "webhooks"
};

const AVAILABLE_RTM_MODES = [
  RTM_MODES.WebSockets,
  RTM_MODES.WebHooks
];

const VERSION = "__PKG_VERSION_PLACEHOLDER__";

// Base configuration
const DEFAULT_REQUEST_TIMEOUT            = 10000;
const DEFAULT_SOCKET_TIMEOUT             = 10000;
const DEFAULT_SOCKET_RECONNECT_DELAY     = 5000;
const DEFAULT_SOCKET_RECONNECT_DELAY_MAX = 10000;
const DEFAULT_SOCKET_RECONNECT_FACTOR    = 0.75;
const DEFAULT_BROKER_SCHEDULE            = 500;
const DEFAULT_EVENT_REBIND_INTERVAL_MIN  = 2500;
const DEFAULT_USERAGENT_PREFIX           = "node-crisp-api/";

// REST API defaults
const DEFAULT_REST_HOST      = "https://api.crisp.chat";
const DEFAULT_REST_BASE_PATH = "/v1/";

// RTM API defaults
const DEFAULT_RTM_MODE   = RTM_MODES.WebSockets;

const DEFAULT_RTM_EVENTS = [
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
  "session:set_origin",
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
  "message:acknowledge:unread:send",
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

  // Identity Events
  "identity:verify:request",

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
  "bucket:url:crawler:generated",

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

import Bucket from "@/services/bucket";
import Media from "@/services/media";
import Plugin from "@/services/plugin";
import Website, { WebsiteServiceInterface } from "@/services/website";

import { Socket } from "socket.io-client";


// REST API services
const services = {
  Bucket  : Bucket,
  Media   : Media,
  Plugin  : Plugin,
  Website : Website
};

interface CrispAuth {
  tier: CrispTier;
  identifier: string | null;
  key: string | null;
  token: string | null;
}

type CrispTier = "user" | "plugin";

/**
 * Crisp API Library
 * @class
 * @classdesc This is the Crisp Library. Handles REST and RTM operations
 */
class Crisp {
  public bucket: Bucket = new Bucket();
  public media: Media = new Media();
  public plugin: Plugin = new Plugin();

  public website: WebsiteServiceInterface = new Website() as unknown as WebsiteServiceInterface;

  public auth: CrispAuth = {
    tier       : "user",
    identifier : null,
    key        : null,
    token      : null
  };

  public _rest = {
    host     : DEFAULT_REST_HOST,
    basePath : DEFAULT_REST_BASE_PATH
  };

  public _rtm  = {
    host : "",
    mode : DEFAULT_RTM_MODE
  };

  public _useragent       = (DEFAULT_USERAGENT_PREFIX + VERSION);

  public _emitter         = mitt();

  public _socket: Socket | null                             = null;
  public _loopback: Emitter<Record<string, unknown>> | null = null;

  public _lastEventRebind = null;

  public _brokerScheduler: NodeJS.Timeout | null = null;

  public _brokerBindHooks: ((modeInstance: any, emitter: any) => void)[] = [];

  public _boundEvents     = {};

  constructor() {
    this._prepareServices();
  }

  /**
   * Sets the REST API host
   */
  setRestHost(host: string) {
    if (typeof host === "string") {
      this._rest.host = host;
    } else {
      throw new Error("[Crisp] setRestHost: parameter host should be a string");
    }
  }

  /**
   * Sets the RTM API host
   */
  setRtmHost(host: string) {
    if (typeof host === "string") {
      this._rtm.host = host;
    } else {
      throw new Error("[Crisp] setRtmHost: parameter host should be a string");
    }
  }

  /**
   * Sets the RTM channel mode (ie. WebSockets or Web Hooks)
   */
  setRtmMode(mode: "websockets" | "webhooks") {
    if (AVAILABLE_RTM_MODES.indexOf(mode) !== -1) {
      this._rtm.mode = mode;
    } else {
      throw new Error(
        "[Crisp] setRtmMode: parameter mode value should be one of: "  +
          AVAILABLE_RTM_MODES.join(", ")
      );
    }
  }

  /**
   * Sets the authentication tier
   */
  setTier(tier: "user" | "plugin") {
    this.auth.tier = (tier || "user");
  }

  /**
   * Authenticates
   */
  authenticate(identifier: string, key: string) {
    // Store credentials
    this.auth.identifier = identifier;
    this.auth.key        = key;

    // Assign pre-computed authentication token
    this.auth.token = Buffer.from(identifier + ":" + key).toString("base64");
  }

  /**
   * Authenticates (with tier)
   */
  authenticateTier(tier: CrispTier, identifier: string, key: string) {
    this.setTier(tier);
    this.authenticate(identifier, key);
  }

  /**
   * Method wrapper to HEAD a resource
   */
  head(resource: string, query?: object | null, body?: object | null): Promise<any> {
    return new Promise((resolve, reject) => {
      this.request(
        resource, "head", (query || {}), null, resolve, reject
      );
    });
  }

  /**
   * Method wrapper to GET a resource
   */
  get(resource: string, query?: object): Promise<any> {
    return new Promise((resolve, reject) => {
      this.request(
        resource, "get", (query || {}), null, resolve, reject
      );
    });
  }

  /**
   * Method wrapper to POST a resource
   */
  post(resource: string, query: object | null, body: object | null): Promise<any> {
    return new Promise((resolve, reject) => {
      this.request(
        resource, "post", (query || {}), (body || {}), resolve, reject
      );
    });
  }

  /**
   * Method wrapper to PATCH a resource
   */
  patch(resource: string, query: object | null, body: object | null): Promise<any> {
    return new Promise((resolve, reject) => {
      this.request(
        resource, "patch", (query || {}), (body || {}), resolve, reject
      );
    });
  }

  /**
   * Method wrapper to PUT a resource
   */
  put(resource: string, query: object | null, body: object | null): Promise<any> {
    return new Promise((resolve, reject) => {
      this.request(
        resource, "put", (query || {}), (body || {}), resolve, reject
      );
    });
  }

  /**
   * Method wrapper to DELETE a resource
   */
  delete(resource: string, query?: object | null, body?: object | null): Promise<any> {
    return new Promise((resolve, reject) => {
      this.request(
        resource, "delete", (query || {}), (body || null), resolve, reject
      );
    });
  }

  /**
   * Binds RTM event
   */
  on(event: string, callback: (data: any) => void) {
    // Ensure all input arguments are set
    if (typeof event !== "string") {
      throw new Error("[Crisp] on: parameter event should be a string");
    }
    if (typeof callback !== "function") {
      throw new Error("[Crisp] on: parameter callback should be a function");
    }

    // Disallow unrecognized event names
    if (DEFAULT_RTM_EVENTS.indexOf(event) === -1) {
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
    this._emitter.on(event, callback);

    // Subscribe event on the broker
    if (this._boundEvents[event] !== true) {
      var rtmMode = this._rtm.mode;

      // Mark event as bound
      this._boundEvents[event] = true;

      // Broker not connected? Connect now.
      return this.prepareBroker(
        (instance, emitter) => {
          // Listen for event? (once instance is bound)
          switch (rtmMode) {
            case RTM_MODES.WebSockets: {
              // Listen on socket event
              instance.on(event, (data) => {
                emitter.emit(event, data);
              });

              break;
            }
          }
        }
      );
    }

    return Promise.resolve();
  }

  /**
   * Receives a raw event and dispatches it to the listener (used for Web Hooks)
   */
  receiveHook(body: Record<string, any>) {
    if (this._loopback) {
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
      if (this._boundEvents[body.event] !== true) {
        return null;
      }

      // Dispatch event to event bus
      // Notice: go asynchronous, so that the event is processed ASAP and \
      //   dispatched on the event bus later, as the hook might be received \
      //   synchronously over HTTP.
      process.nextTick(() => {
        this._loopback.emit(body.event, body.data);
      });

      return null;
    }

    return new Error("[Crisp] receiveHook: hook loopback not bound");
  }

  /**
   * Verifies an event string and checks that signatures match (used for Web \
   *   Hooks)
   */
  verifyHook(secret: string, body: object, timestamp: number, signature: string) {
    if (this._loopback) {
      return this.verifySignature(secret, body, timestamp, signature);
    }

    // Default: not verified (loopback not /yet?/ bound)
    return false;
  }

  /**
   * Verifies an event string and checks that signatures match (used for \
   *   Widgets)
   */
  verifyWidget(secret: string, body: object, timestamp: number, signature: string) {
    return this.verifySignature(secret, body, timestamp, signature);
  }

  /**
   * Rebinds socket events (used for WebSockets)
   */
  rebindSocket() {
    if (!this._socket) {
      throw new Error(
        "[Crisp] rebindSocket: cannot rebind a socket that is not yet bound"
      );
    }

    // Make sure that the library user is not rebinding too frequently (which \
    //   is illegal)
    var nowTime = Date.now();

    if (this._lastEventRebind !== null  &&
          ((nowTime - this._lastEventRebind)  <
              DEFAULT_EVENT_REBIND_INTERVAL_MIN)) {
      throw new Error(
        "[Crisp] rebindSocket: cannot rebind, last rebind was requested too "  +
          "recently"
      );
    }

    return Promise.resolve()
      .then(() => {
        // Rebind to socket events (eg. newly bound websites)
        this._lastEventRebind = nowTime;

        this._socket.emit("socket:bind", {});

        return Promise.resolve();
      });
  }

  /**
   * Prepares a URI based from path segments
   */
  prepareRestUrl(paths: string[]) {
    if (Array.isArray(paths) === true) {
      var output = this._rest.host + this._rest.basePath;

      output += paths.join("/");

      return output;
    }

    throw new Error(
      "[Crisp] prepareRestUrl: parameter host should be an Array"
    );
  }

  /**
   * Binds services to the main object
   */
  _prepareServices() {
    // Bind services
    for (var name in services) {
      var serviceInstance = new services[name]();

      // Acquire service map
      var serviceMap = this[(name[0].toLowerCase() + name.substring(1))];

      // No service map available?
      /*if (!serviceMap) {
        throw new Error(
          "[Crisp] prepareServices: service '" + name + "' has no map available"
        );
      }*/

      // No resources defined in service?
      if (!serviceInstance.__resources  ||
            serviceInstance.__resources.length === 0) {
        throw new Error(
          "[Crisp] prepareServices: service '" + name + "' has no resources "  +
            "defined"
        );
      }

      // Prepare all resources (for service)
      this.prepareResources(
        serviceMap, serviceInstance.__resources
      );
    }
  }

  /**
   * Binds resources to the service object
   */
  private prepareResources(serviceMap: any, resources: any) {
    for (var i = 0; i < resources.length; i++) {
      var resourceConstructor = resources[i];

      const resourceInstance = new resourceConstructor(this);
      const resourceName = resourceConstructor.name;

      // Bind each method of the resource instance to the service map
      for (const methodName of Object.getOwnPropertyNames(Object.getPrototypeOf(resourceInstance))) {
        if (methodName !== "constructor") {
          serviceMap[methodName] = resourceInstance[methodName].bind(resourceInstance);
        }
      }
    }
  }

  /**
   * Binds broker to the main object
   */
  private prepareBroker(fnBindHook: (modeInstance: any, emitter: any) => void) {
    return new Promise((resolve, reject) => {
      var rtmMode         = this._rtm.mode,
          rtmHostOverride = this._rtm.host;

      // Append bind hook to pending stack
      this._brokerBindHooks.push(fnBindHook);

      // Make sure to prepare broker once? (defer broker binding, waiting that \
      //   all listeners have been bound, that way we submit the list of \
      //   filtered events to the RTM API once, and never again in the future)
      if (this._brokerScheduler === null) {
        // Socket or loopback already set? We should not even have entered \
        //   there.
        if (this._socket || this._loopback) {
          throw new Error(
            "[Crisp] prepareBroker: illegal call to prepare broker (tie break)"
          );
        }

        this._brokerScheduler = setTimeout(() => {
          switch (rtmMode) {
            case RTM_MODES.WebSockets: {
              // Connect to socket now
              // Notice: will unstack broker bind hooks once ready
              this.connectSocket(rtmHostOverride)
                .then(resolve)
                .catch(reject);

              break;
            }

            case RTM_MODES.WebHooks: {
              // Connect to loopback now
              this.connectLoopback()
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
        }, DEFAULT_BROKER_SCHEDULE);
      } else {
        // Pass-through
        resolve(true);
      }
    });
  }

  /**
   * Connects loopback (used for Web Hooks)
   */
  private connectLoopback() {
    return Promise.resolve()
      .then(() => {
        // Assign emitter to loopback
        this._loopback = this._emitter;

        // Unstack broker bind hooks immediately
        this.unstackBrokerBindHooks(this._loopback);

        return Promise.resolve();
      });
  }

  /**
   * Connects socket, using preferred RTM API host (used for WebSockets)
   */
  private connectSocket(rtmHostOverride: string) {
    return Promise.resolve()
      .then(() => {
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

        switch (this.auth.tier) {
          case "plugin": {
            restUrlSegments = ["plugin", "connect", "endpoints"];

            break;
          }

          default: {
            restUrlSegments = ["user", "connect", "endpoints"];
          }
        }

        return this.get(
          this.prepareRestUrl(restUrlSegments)
        )
          .catch(() => {
            // Void error (consider as empty response)
            return Promise.resolve({});
          });
      })
      .then((endpoints) => {
        // @ts-ignore
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
        // @ts-ignore
        this._socket = socketio(rtmHostUrl.origin, {
          path                 : (rtmHostUrl.pathname || "/"),
          transports           : ["websocket"],
          timeout              : DEFAULT_SOCKET_TIMEOUT,
          reconnection         : true,
          reconnectionDelay    : DEFAULT_SOCKET_RECONNECT_DELAY,
          reconnectionDelayMax : DEFAULT_SOCKET_RECONNECT_DELAY_MAX,
          randomizationFactor  : DEFAULT_SOCKET_RECONNECT_FACTOR
        });

        this.emitAuthenticateSocket();

        // Setup base socket event listeners
        this._socket?.io.on("reconnect", () => {
          this.emitAuthenticateSocket();
        });

        this._socket?.on("unauthorized", () => {
          throw new Error(
            "[Crisp] connectSocket: cannot listen for events as "  +
              "authentication is invalid"
          );
        });

        // Setup user socket event listeners
        this.unstackBrokerBindHooks(this._socket);

        return Promise.resolve();
      });
  }

  /**
   * Authenticates client (used for WebSockets)
   */
  private emitAuthenticateSocket() {
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
  }

  /**
   * Unstacks pending broker bind hooks
   */
  private unstackBrokerBindHooks(modeInstance: any) {
    // Setup user socket event listeners
    while (this._brokerBindHooks.length > 0) {
      this._brokerBindHooks.shift()?.(
        modeInstance, this._emitter
      );
    }
  }

  /**
   * Performs a request to REST API
   */
  private request(
    resource: string,
    method: string,
    query: object,
    body: object | null,
    resolve: (value: any) => void,
    reject: (reason?: any) => void
  ){
    let requestParameters = {
      responseType    : "json",
      timeout         : DEFAULT_REQUEST_TIMEOUT,

      headers         : {
        "User-Agent"   : this._useragent,
        "X-Crisp-Tier" : this.auth.tier
      },

      throwHttpErrors : false
    };

    // Add authorization?
    if (this.auth.token) {
      // @ts-ignore
      requestParameters.headers.Authorization = ("Basic " + this.auth.token);
    }

    // Add body?
    if (body) {
      // @ts-ignore
      requestParameters.json = body;
    }

    // Add query?
    if (query) {
      // @ts-ignore
      requestParameters.searchParams = query;
    }

    // Proceed request
    got[method](resource, requestParameters)
      .catch((error) => {
        return Promise.resolve(error);
      })
      .then((response) => {
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
          let reasonMessage = this.readErrorResponseReason(
            method, response.statusCode, response
          );
          let dataMessage   = ((response.body || {}).data || {}).message;

          return reject({
            reason  : "error",
            message : reasonMessage,
            code    : response.statusCode,

            data    : {
              namespace : "response",

              message   : (
                "Got response error: " + (dataMessage || reasonMessage)
              )
            }
          });
        }

        // Regular response
        return resolve(
          (response.body || {}).data || {}
        );
      });
  }

  /**
   * Reads reason for error response
   */
  private readErrorResponseReason(method: string, statusCode: number, response: any) {
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
  }

  /**
   * Verifies an event string and checks that signatures match
   */
  private verifySignature(secret: string, body: object, timestamp: number, signature: string) {
    // Ensure all provided data is valid
    if (!secret || !signature || !body || typeof body !== "object"  ||
          !timestamp || isNaN(timestamp) === true) {
      return false;
    }

    // Compute local trace
    let localTrace = ("[" + timestamp + ";" + JSON.stringify(body) + "]");

    // Create local HMAC
    let localMac = Crypto.createHmac("sha256", secret);

    localMac.update(localTrace);

    // Compute local signature, and compare
    let localSignature = localMac.digest("hex");

    return (
      (signature === localSignature) ? true : false
    );
  }
};


export default Crisp;
export { Crisp };
