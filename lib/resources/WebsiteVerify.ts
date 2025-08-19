/*
 * node-crisp-api
 *
 * Copyright 2022, Crisp IM SAS
 * Author: Valerian Saliou <valerian@valeriansaliou.name>
 */

import Crisp from "@/crisp";

export interface WebsiteVerifyKeyData {
  data?: WebsiteVerifyKey;
}

export interface WebsiteVerifySettings {
  enabled?: boolean;
}

export interface WebsiteVerifyKey {
  secret?: string;
}

export interface WebsiteVerifySettingsUpdate {
  enabled?: boolean;
}


/**
 * Crisp WebsiteVerify Resource
 */
class WebsiteVerify {
  private crisp: Crisp;

  constructor(crisp: Crisp) {
    this.crisp = crisp;
  }

  /**
   * Get Verify Settings
   */
  getVerifySettings(websiteID: string) : Promise<WebsiteVerifySettings> {
    return this.crisp.get(
      this.crisp.prepareRestUrl(["website", websiteID, "verify", "settings"])
    );
  };

  /**
   * Update Verify Settings
   */
  updateVerifySettings(websiteID: string, settings: WebsiteVerifySettingsUpdate) {
    return this.crisp.patch(
      this.crisp.prepareRestUrl(["website", websiteID, "verify", "settings"]),

      null, settings
    );
  };

  /**
   * Get Verify Key
   */
  getVerifyKey(websiteID: string) : Promise<WebsiteVerifyKey> {
    return this.crisp.get(
      this.crisp.prepareRestUrl(["website", websiteID, "verify", "key"])
    );
  };

  /**
   * Roll Verify Key
   */
  rollVerifyKey(websiteID: string) {
    return this.crisp.post(
      this.crisp.prepareRestUrl(["website", websiteID, "verify", "key"]),

      null, null
    );
  };
}


export default WebsiteVerify;
