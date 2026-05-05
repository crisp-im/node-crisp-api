/*
 * This file is part of node-crisp-api
 *
 * Copyright (c) 2026 Crisp IM SAS
 * All rights belong to Crisp IM SAS
 */

/**************************************************************************
 * IMPORTS
 ***************************************************************************/

// PROJECT: RESOURCES
import BaseResource from "./BaseResource";

/**************************************************************************
 * TYPES
 ***************************************************************************/

export type WebsiteConnectEndpoints = {
  socket?: WebsiteConnectEndpointsSocket;
  rescue?: WebsiteConnectEndpointsRescue;
}

export type WebsiteConnectEndpointsSocket = {
  app?: string;
  stream?: string;
}

export type WebsiteConnectEndpointsRescue = {
  socket?: WebsiteConnectEndpointsSocket;
}

/**************************************************************************
 * CLASSES
 ***************************************************************************/

/**
 * Crisp WebsiteConnect Resource
 */
class WebsiteConnect extends BaseResource {
  /**
   * Get Connect Endpoints
   */
  getConnectEndpoints(websiteID: string): Promise<WebsiteConnectEndpoints> {
    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "connect", "endpoints"
      ])
    );
  };
}

/**************************************************************************
 * EXPORTS
 ***************************************************************************/

export default WebsiteConnect;
