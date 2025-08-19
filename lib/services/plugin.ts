/*
 * node-crisp-api
 *
 * Copyright 2022, Crisp IM SAS
 * Author: Baptiste Jamin <baptiste@crisp.chat>
 */

import PluginConnect from "@/resources/PluginConnect";
import PluginSubscription from "@/resources/PluginSubscription";

/**
 * Crisp Plugin Service
 */
class PluginService {
  public __resources: any[] = [
    PluginConnect,
    PluginSubscription
  ];
}

export default PluginService;
