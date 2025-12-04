/*
 * This file is part of node-crisp-api
 *
 * Copyright (c) 2025 Crisp IM SAS
 * All rights belong to Crisp IM SAS
 */

/**************************************************************************
 * IMPORTS
 ***************************************************************************/

// PROJECT: RESOURCES
import PluginConnect from "@/resources/PluginConnect";
import PluginSubscription from "@/resources/PluginSubscription";

/**************************************************************************
 * CLASSES
 ***************************************************************************/

/**
 * Crisp Plugin Service
 */
class PluginService {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  public __resources: any[] = [
    PluginConnect,
    PluginSubscription
  ];
}

/**************************************************************************
 * EXPORTS
 ***************************************************************************/

export interface PluginServiceInterface extends
  PluginConnect,
  PluginSubscription {
}

export default PluginService;
