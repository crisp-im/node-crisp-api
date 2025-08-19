/*
 * node-crisp-api
 *
 * Copyright 2022, Crisp IM SAS
 * Author: Baptiste Jamin <baptiste@crisp.chat>
 */

/**************************************************************************
 * IMPORTS
 ***************************************************************************/

// PROJECT: RESOURCES
import BaseResource from "./BaseResource";

// PluginConnectAccount mapping
export type PluginConnectAccount = {
  plugin_id?: string;
};

// PluginConnectAllWebsites mapping
export type PluginConnectAllWebsites = {
  website_id?: string;
  token?: string;
  settings?: object;
}

// PluginConnectWebsitesSince mapping
export type PluginConnectWebsitesSince = {
  website_id?: string;
  token?: string;
  settings?: object;
  difference?: string;
}

// PluginConnectEndpoints mapping
export type PluginConnectEndpoints = {
  socket?: PluginConnectEndpointsSocket;
}

// PluginConnectEndpointsSocket mapping
export type PluginConnectEndpointsSocket = {
  app?: string;
}

/**
 * Crisp PluginConnect Resource
 */
class PluginConnect extends BaseResource {
  /**
   * Get Connect Account
   */
  getConnectAccount(): Promise<PluginConnectAccount> {
    return this.crisp.get(
      this.crisp.prepareRestUrl(["plugin", "connect", "account"]), {}
    );
  };

  /**
   * Check Connect Session Validity
   */
  checkConnectSessionValidity() {
    return this.crisp.head(
      this.crisp.prepareRestUrl(["plugin", "connect", "session"]),

      {}
    );
  };

  /**
   * List All Connect Websites
   */
  listAllConnectWebsites(
    pageNumber: number, filterConfigured: boolean
  ): Promise<PluginConnectAllWebsites> {
    // Generate query
    let query = {
      filter_configured: (
        (filterConfigured === true) ? "1" : "0"
      )
    };

    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "plugin", "connect", "websites", "all", String(pageNumber)
      ]),

      query
    );
  };

  /**
   * List Connect Websites Since
   */
  listConnectWebsitesSince(
    dateSince: string, filterConfigured: boolean
  ): Promise<PluginConnectWebsitesSince> {
    // Generate query
    let query = {
      filter_configured: (
        (filterConfigured === true) ? "1" : "0"
      )
    };

    if (dateSince) {
      // @ts-ignore
      query.date_since = dateSince;
    }

    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "plugin", "connect", "websites", "since"
      ]),

      query
    );
  };

  /**
   * Get Connect Endpoints
   */
  getConnectEndpoints(): Promise<PluginConnectEndpoints> {
    return this.crisp.get(
      this.crisp.prepareRestUrl(["plugin", "connect", "endpoints"]), {}
    );
  };
}

export default PluginConnect;
