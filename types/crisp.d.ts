export = Crisp;
/**
 * Crisp API Library
 * @class
 * @classdesc This is the Crisp Library. Handles REST and RTM operations
 */
declare function Crisp(): void;
declare class Crisp {
    /**
     * @public
     * @type {*}
    */
    public bucket: any;
    /**
     * @public
     * @type {*}
    */
    public media: any;
    /**
     * @public
     * @type {*}
    */
    public plugin: any;
    /**
     * @public
     * @type {*}
    */
    public website: any;
    /**
     * @public
     * @type {object}
    */
    public auth: object;
    /**
     * @private
     * @type {object}
    */
    private _rest;
    /**
     * @private
     * @type {object}
    */
    private _rtm;
    /**
     * @private
     * @type {string}
    */
    private _useragent;
    /**
     * @private
     * @type {object}
    */
    private _emitter;
    /**
     * @private
     * @type {object|null}
    */
    private _socket;
    /**
     * @private
     * @type {object|null}
    */
    private _loopback;
    /**
     * @private
     * @type {number|null}
    */
    private _lastEventRebind;
    /**
     * @private
     * @type {object|null}
    */
    private _brokerScheduler;
    /**
     * @private
     * @type {Array}
    */
    private _brokerBindHooks;
    /**
     * @private
     * @type {object}
    */
    private _boundEvents;
    setRestHost: (host: string) => undefined;
    setRtmHost: (host: string) => undefined;
    setRtmMode: (mode: string) => undefined;
    setTier: (tier: string) => undefined;
    authenticate: (identifier: string, key: string) => undefined;
    authenticateTier: (tier: string, identifier: string, key: string) => undefined;
    head: (resource: string, query: object, body: object) => Promise<any>;
    get: (resource: string, query: object) => Promise<any>;
    post: (resource: string, query: object, body: object) => Promise<any>;
    patch: (resource: string, query: object, body: object) => Promise<any>;
    put: (resource: string, query: object, body: object) => Promise<any>;
    delete: (resource: string, query: object, body: object) => Promise<any>;
    on: (event: string, callback: Function) => Promise<any>;
    receiveHook: (body: object) => undefined;
    verifyHook: (secret: string, body: object, timestamp: string, signature: string) => boolean;
    verifyWidget: (secret: string, body: object, timestamp: string, signature: string) => boolean;
    rebindSocket: () => Promise<any>;
    _prepareRestUrl: (paths: any[]) => string;
    _prepareServices: () => undefined;
    _prepareResources: (serviceMap: object, resources: any[]) => undefined;
    _prepareBroker: (fnBindHook: Function) => Promise<any>;
    _connectLoopback: () => Promise<any>;
    _connectSocket: (rtmHostOverride: string) => Promise<any>;
    _emitAuthenticateSocket: () => undefined;
    _unstackBrokerBindHooks: (modeInstance: object) => undefined;
    _request: (resource: string, method: string, query: object, body: object, resolve: Function, reject: Function) => undefined;
    _readErrorResponseReason: (method: string, statusCode: number, response: object) => string;
    _verifySignature: (secret: string, body: object, timestamp: string, signature: string) => boolean;
}

declare namespace RTM_MODES {
    let WebSockets: string;
    let WebHooks: string;
}

declare namespace Crisp {
    import DEFAULT_RTM_MODE = RTM_MODES.WebSockets;

    export {
        RTM_MODES,
        AVAILABLE_RTM_MODES,
        DEFAULT_REQUEST_TIMEOUT,
        DEFAULT_SOCKET_TIMEOUT,
        DEFAULT_SOCKET_RECONNECT_DELAY,
        DEFAULT_SOCKET_RECONNECT_DELAY_MAX,
        DEFAULT_SOCKET_RECONNECT_FACTOR,
        DEFAULT_BROKER_SCHEDULE,
        DEFAULT_EVENT_REBIND_INTERVAL_MIN,
        DEFAULT_USERAGENT_PREFIX,
        DEFAULT_REST_HOST,
        DEFAULT_REST_BASE_PATH,
        DEFAULT_RTM_MODE,
        DEFAULT_RTM_EVENTS, Crisp
    };
}

declare var AVAILABLE_RTM_MODES: string[];
declare var DEFAULT_REQUEST_TIMEOUT: number;
declare var DEFAULT_SOCKET_TIMEOUT: number;
declare var DEFAULT_SOCKET_RECONNECT_DELAY: number;
declare var DEFAULT_SOCKET_RECONNECT_DELAY_MAX: number;
declare var DEFAULT_SOCKET_RECONNECT_FACTOR: number;
declare var DEFAULT_BROKER_SCHEDULE: number;
declare var DEFAULT_EVENT_REBIND_INTERVAL_MIN: number;
declare var DEFAULT_USERAGENT_PREFIX: string;
declare var DEFAULT_REST_HOST: string;
declare var DEFAULT_REST_BASE_PATH: string;
declare var DEFAULT_RTM_EVENTS: string[];
