/*
 * node-crisp-api
 *
 * Copyright 2022, Crisp IM SAS
 * Author: Baptiste Jamin <baptiste@crisp.chat>
 */

/**************************************************************************
 * IMPORTS
 ***************************************************************************/

// NPM
import { URL } from "url";
import Crypto from "crypto";

import got from "got";
import { io as socketio } from "socket.io-client";
import { Socket } from "socket.io-client";
import mitt, { Emitter } from "mitt";

// PROJECT: SERVICES
import Bucket, { BucketServiceInterface } from "@/services/bucket";
import Media, { MediaServiceInterface } from "@/services/media";
import Plugin, { PluginServiceInterface } from "@/services/plugin";
import Website, { WebsiteServiceInterface } from "@/services/website";

/**************************************************************************
 * TYPES
 ***************************************************************************/

export type RTM_MODES = "websockets" | "webhooks";

export type CrispTier = "user" | "plugin";

/**************************************************************************
 * CONSTANTS
 ***************************************************************************/

const AVAILABLE_RTM_MODES = [
  "websockets",
  "webhooks"
];

const VERSION = "__PKG_VERSION_PLACEHOLDER__";

// Base configuration
const DEFAULT_REQUEST_TIMEOUT = 10000;
const DEFAULT_SOCKET_TIMEOUT = 10000;
const DEFAULT_SOCKET_RECONNECT_DELAY = 5000;
const DEFAULT_SOCKET_RECONNECT_DELAY_MAX = 10000;
const DEFAULT_SOCKET_RECONNECT_FACTOR = 0.75;
const DEFAULT_BROKER_SCHEDULE = 500;
const DEFAULT_EVENT_REBIND_INTERVAL_MIN = 2500;
const DEFAULT_USERAGENT_PREFIX = "node-crisp-api/";

// REST API defaults
const DEFAULT_REST_HOST = "https://api.crisp.chat";
const DEFAULT_REST_BASE_PATH = "/v1/";

// RTM API defaults
const DEFAULT_RTM_MODE = "websockets";

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
  "plugin:settings:saved"
];

// REST API services
const services = {
  Bucket: Bucket,
  Media: Media,
  Plugin: Plugin,
  Website: Website
};

/**************************************************************************
 * INTERFACES
 ***************************************************************************/

interface CrispAuth {
  tier: CrispTier;
  identifier: string | null;
  key: string | null;
  token: string | null;
}

/**************************************************************************
 * CLASSES
 ***************************************************************************/

/**
 * Crisp
 */
class Crisp {
  public bucket: BucketServiceInterface = (
    new Bucket() as unknown as BucketServiceInterface
  );

  public media: MediaServiceInterface = (
    new Media() as unknown as MediaServiceInterface
  );

  public plugin: PluginServiceInterface = (
    new Plugin() as unknown as PluginServiceInterface
  );

  public website: WebsiteServiceInterface = (
    new Website() as unknown as WebsiteServiceInterface
  );

  /**
   * @deprecated Use import { RTM_MODES } instead
   */
  public static RTM_MODES = {
    WebSockets: "websockets" as RTM_MODES,
    WebHooks: "webhooks" as RTM_MODES
  };

  public auth: CrispAuth = {
    tier: "user",
    identifier: null,
    key: null,
    token: null
  };

  protected _rest = {
    host: DEFAULT_REST_HOST,
    basePath: DEFAULT_REST_BASE_PATH
  };

  protected _rtm = {
    host: "",
    mode: DEFAULT_RTM_MODE as RTM_MODES
  };

  protected _useragent = (DEFAULT_USERAGENT_PREFIX + VERSION);

  protected _emitter = mitt();

  protected _socket: Socket | null = null;
  protected _loopback: Emitter<Record<string, unknown>> | null = null;

  protected _lastEventRebind = null;

  protected _brokerScheduler: typeof setTimeout | null = null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars
  protected _brokerBindHooks: ((modeInstance: any, emitter: any) => void)[] = [];

  protected _boundEvents = {};

  /**
   * Constructor
   */
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

  /* eslint-disable @typescript-eslint/no-explicit-any */

  /**
   * Method wrapper to HEAD a resource
   */
  head(resource: string, query?: object | null): Promise<any> {
    return new Promise((resolve, reject) => {
      this.__request(
        resource, "head", (query || {}), null, resolve, reject
      );
    });
  }

  /**
   * Method wrapper to GET a resource
   */
  get(resource: string, query?: object): Promise<any> {
    return new Promise((resolve, reject) => {
      this.__request(
        resource, "get", (query || {}), null, resolve, reject
      );
    });
  }

  /**
   * Method wrapper to POST a resource
   */
  post(
    resource: string, query: object | null, body: object | null
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      this.__request(
        resource, "post", (query || {}), (body || {}), resolve, reject
      );
    });
  }

  /**
   * Method wrapper to PATCH a resource
   */
  patch(
    resource: string, query: object | null, body: object | null
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      this.__request(
        resource, "patch", (query || {}), (body || {}), resolve, reject
      );
    });
  }

  /**
   * Method wrapper to PUT a resource
   */
  put(
    resource: string, query: object | null, body: object | null
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      this.__request(
        resource, "put", (query || {}), (body || {}), resolve, reject
      );
    });
  }

  /**
   * Method wrapper to DELETE a resource
   */
  delete(
    resource: string, query?: object | null, body?: object | null
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      this.__request(
        resource, "delete", (query || {}), (body || null), resolve, reject
      );
    });
  }

  /* eslint-enable @typescript-eslint/no-explicit-any */

  /**
   * Binds RTM event
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars
  on(event: string, callback: (data: any) => any) {
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
      let rtmMode = this._rtm.mode;

      // Mark event as bound
      this._boundEvents[event] = true;

      // Broker not connected? Connect now.
      return this.__prepareBroker(
        (instance, emitter) => {
          // Listen for event? (once instance is bound)
          switch (rtmMode) {
            case "websockets": {
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
  receiveHook(body: Record<string, unknown>) {
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
        this._loopback.emit(body.event as string, body.data);
      });

      return null;
    }

    return new Error("[Crisp] receiveHook: hook loopback not bound");
  }

  /**
   * Verifies an event string and checks that signatures match (used for Web \
   *   Hooks)
   */
  verifyHook(
    secret: string, body: object, timestamp: number, signature: string
  ) {
    if (this._loopback) {
      return this.__verifySignature(secret, body, timestamp, signature);
    }

    // Default: not verified (loopback not /yet?/ bound)
    return false;
  }

  /**
   * Verifies an event string and checks that signatures match (used for \
   *   Widgets)
   */
  verifyWidget(
    secret: string, body: object, timestamp: number, signature: string
  ) {
    return this.__verifySignature(secret, body, timestamp, signature);
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
    const nowTime = Date.now();

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
      let output = this._rest.host + this._rest.basePath;

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
  protected _prepareServices() {
    // Bind services
    for (const name in services) {
      const serviceInstance = new services[name]();

      // Acquire service map
      const serviceMap = this[(name[0].toLowerCase() + name.substring(1))];

      // No resources defined in service?
      if (!serviceInstance.__resources  ||
            serviceInstance.__resources.length === 0) {
        throw new Error(
          "[Crisp] prepareServices: service '" + name + "' has no resources "  +
            "defined"
        );
      }

      // Prepare all resources (for service)
      this.__prepareResources(
        serviceMap, serviceInstance.__resources
      );
    }
  }

  /**
   * Binds resources to the service object
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private __prepareResources(serviceMap: any, resources: any) {
    for (let i = 0; i < resources.length; i++) {
      const resourceConstructor = resources[i];
      const resourceInstance = new resourceConstructor(this);

      // Bind each method of the resource instance to the service map
      const methodNames = Object.getOwnPropertyNames(
        Object.getPrototypeOf(resourceInstance)
      );

      for (const methodName of methodNames) {
        if (methodName !== "constructor") {
          serviceMap[methodName] = resourceInstance[methodName].bind(
            resourceInstance
          );
        }
      }
    }
  }

  /**
   * Binds broker to the main object
   */
  private __prepareBroker(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars
    fnBindHook: (modeInstance: any, emitter: any) => void
  ) {
    return new Promise((resolve, reject) => {
      const rtmMode = this._rtm.mode;
      const rtmHostOverride = this._rtm.host;

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

        // @ts-ignore
        this._brokerScheduler = setTimeout(() => {
          switch (rtmMode) {
            case "websockets": {
              // Connect to socket now
              // Notice: will unstack broker bind hooks once ready
              this.__connectSocket(rtmHostOverride)
                .then(resolve)
                .catch(reject);

              break;
            }

            case "webhooks": {
              // Connect to loopback now
              this.__connectLoopback()
                .then(resolve)
                .catch(reject);

              break;
            }

            default: {
              const unsupportedError = new Error(
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
  private __connectLoopback() {
    return Promise.resolve()
      .then(() => {
        // Assign emitter to loopback
        this._loopback = this._emitter;

        // Unstack broker bind hooks immediately
        this.__unstackBrokerBindHooks(this._loopback);

        return Promise.resolve();
      });
  }

  /**
   * Connects socket, using preferred RTM API host (used for WebSockets)
   */
  private __connectSocket(rtmHostOverride: string) {
    return Promise.resolve()
      .then(() => {
        // Any override RTM API host?
        if (rtmHostOverride) {
          return Promise.resolve({
            socket: {
              app: rtmHostOverride
            }
          });
        }

        // Acquire RTM API URL from remote
        let restUrlSegments;

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
        const rtmHostAffinity = (endpoints?.socket?.app || null);

        // No RTM API host acquired?
        if (rtmHostAffinity === null) {
          throw new Error(
            "[Crisp] connectSocket: could not acquire target host to "  +
              "connect to, is your session valid for tier?"
          );
        }

        // Parse target RTM API host as an URL object
        const rtmHostUrl = new URL(rtmHostAffinity);

        // Connect to socket
        // @ts-ignore
        this._socket = socketio(rtmHostUrl.origin, {
          path: (rtmHostUrl.pathname || "/"),
          transports: ["websocket"],
          timeout: DEFAULT_SOCKET_TIMEOUT,
          reconnection: true,
          reconnectionDelay: DEFAULT_SOCKET_RECONNECT_DELAY,
          reconnectionDelayMax: DEFAULT_SOCKET_RECONNECT_DELAY_MAX,
          randomizationFactor: DEFAULT_SOCKET_RECONNECT_FACTOR
        });

        this.__emitAuthenticateSocket();

        // Setup base socket event listeners
        this._socket?.io.on("reconnect", () => {
          this.__emitAuthenticateSocket();
        });

        this._socket?.on("unauthorized", () => {
          throw new Error(
            "[Crisp] connectSocket: cannot listen for events as "  +
              "authentication is invalid"
          );
        });

        // Setup user socket event listeners
        this.__unstackBrokerBindHooks(this._socket);

        return Promise.resolve();
      });
  }

  /**
   * Authenticates client (used for WebSockets)
   */
  private __emitAuthenticateSocket() {
    const auth = this.auth;
    const boundEvents = Object.keys(this._boundEvents);

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
      username: auth.identifier,
      password: auth.key,
      tier: auth.tier,
      events: boundEvents
    });
  }

  /**
   * Unstacks pending broker bind hooks
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private __unstackBrokerBindHooks(modeInstance: any) {
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
  private __request(
    resource: string,
    method: string,
    query: object,
    body: object | null,
    // eslint-disable-next-line no-unused-vars
    resolve: (value: unknown) => void,
    // eslint-disable-next-line no-unused-vars
    reject: (reason?: unknown) => void
  ) {
    let requestParameters = {
      responseType: "json",
      timeout: DEFAULT_REQUEST_TIMEOUT,

      headers: {
        "User-Agent": this._useragent,
        "X-Crisp-Tier": this.auth.tier
      },

      throwHttpErrors: false
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
      const params = new URLSearchParams();

      Object.entries(query).forEach(([ key, value ]) => {
        if (value === null || value === undefined) {
          return;
        }

        if (typeof value === "object") {
          params.append(key, JSON.stringify(value));
        } else {
          params.append(key, String(value));
        }
      });

      // @ts-ignore
      requestParameters.searchParams = params;
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
            reason: "error",
            message: "internal_error",
            code: 500,

            data: {
              namespace: "request",

              message: (
                "Got request error: " + (response.name || "Unknown")
              )
            }
          });
        }

        // Response error?
        if (response.statusCode >= 400) {
          let reasonMessage = this.__readErrorResponseReason(
            method, response.statusCode, response
          );

          const dataMessage = (response?.body?.data?.message || "");

          return reject({
            reason: "error",
            message: reasonMessage,
            code: response.statusCode,

            data: {
              namespace: "response",

              message: (
                "Got response error: " + (dataMessage || reasonMessage)
              )
            }
          });
        }

        // Regular response
        return resolve(
          (response?.body?.data || {})
        );
      });
  }

  /**
   * Reads reason for error response
   */
  private __readErrorResponseReason(
    method: string, statusCode: number, response: object
  ) {
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
    // @ts-ignore
    return ((response?.body?.reason || "http_error"));
  }

  /**
   * Verifies an event string and checks that signatures match
   */
  private __verifySignature(
    secret: string, body: object, timestamp: number, signature: string
  ) {
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

/**************************************************************************
 * EXPORTS
 ***************************************************************************/

export * from "@/resources";
export { Crisp };
export default Crisp;
