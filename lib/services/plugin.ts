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
import PluginConnect from "@/resources/PluginConnect";
import PluginSubscription from "@/resources/PluginSubscription";

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

export interface PluginServiceInterface extends
  PluginConnect,
  PluginSubscription {
}

export default PluginService;
