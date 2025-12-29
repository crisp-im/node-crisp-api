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
import BaseResource from "./BaseResource";

/**************************************************************************
 * INTERFACES
 ***************************************************************************/

export interface WebsiteSettings {
  websiteID?: string;
  name?: string;
  domain?: string;
  logo?: string;
  audit?: WebsiteSettingsAudit;
  contact?: WebsiteSettingsContact;
  inbox?: WebsiteSettingsInbox;
  emails?: WebsiteSettingsEmails;
  chatbox?: WebsiteSettingsChatbox;
}

export interface WebsiteSettingsAudit {
  log?: boolean;
}

export interface WebsiteSettingsContact {
  email?: string;
  phone?: string;
  messenger?: string;
  telegram?: string;
  twitter?: string;
  whatsapp?: string;
  instagram?: string;
}

export interface WebsiteSettingsInbox {
  lock_removal?: boolean;
  force_operator_token?: boolean;
  locale?: string;
}

export interface WebsiteSettingsEmails {
  rating?: boolean;
  transcript?: boolean;
  enrich?: boolean;
  junk_filter?: boolean;
}

export interface WebsiteSettingsChatbox {
  tile?: string;
  wait_game?: boolean;
  website_logo?: boolean;
  last_operator_face?: boolean;
  ongoing_operator_face?: boolean;
  activity_metrics?: boolean;
  operator_privacy?: boolean;
  visitor_privacy?: boolean;
  availability_tooltip?: boolean;
  hide_vacation?: boolean;
  hide_on_away?: boolean;
  hide_on_mobile?: boolean;
  position_reverse?: boolean;
  email_visitors?: boolean;
  phone_visitors?: boolean;
  force_identify?: boolean;
  ignore_privacy?: boolean;
  visitor_compose?: boolean;
  file_transfer?: boolean;
  audio_record?: boolean;
  overlay_search?: boolean;
  overlay_mode?: boolean;
  helpdesk_link?: boolean;
  helpdesk_only?: boolean;
  status_health_dead?: boolean;
  check_domain?: boolean;
  color_theme?: string;
  color_mode?: string;
  layout_theme?: string;
  text_theme?: string;
  welcome_message?: string;
  locale?: string;
  allowed_pages?: string[];
  blocked_pages?: string[];
  blocked_countries?: string[];
  blocked_locales?: string[];
}

export interface WebsiteSettingsUpdate {
  websiteID?: string;
  name?: string;
  domain?: string;
  logo?: string;
  audit?: WebsiteSettingsUpdateAudit;
  contact?: WebsiteSettingsUpdateContact;
  inbox?: WebsiteSettingsUpdateInbox;
  emails?: WebsiteSettingsUpdateEmails;
  chatbox?: WebsiteSettingsUpdateChatbox;
}

export interface WebsiteSettingsUpdateAudit {
  log?: boolean;
}

export interface WebsiteSettingsUpdateContact {
  email?: string;
  phone?: string;
  messenger?: string;
  telegram?: string;
  twitter?: string;
  whatsapp?: string;
  instagram?: string;
}

export interface WebsiteSettingsUpdateInbox {
  lock_removal?: boolean;
  force_operator_token?: boolean;
  locale?: string;
}

export interface WebsiteSettingsUpdateEmails {
  rating?: boolean;
  transcript?: boolean;
  enrich?: boolean;
  junk_filter?: boolean;
}

export interface WebsiteSettingsUpdateChatbox {
  tile?: string;
  wait_game?: boolean;
  website_logo?: boolean;
  last_operator_face?: boolean;
  ongoing_operator_face?: boolean;
  activity_metrics?: boolean;
  operator_privacy?: boolean;
  visitor_privacy?: boolean;
  availability_tooltip?: boolean;
  hide_vacation?: boolean;
  hide_on_away?: boolean;
  hide_on_mobile?: boolean;
  position_reverse?: boolean;
  email_visitors?: boolean;
  phone_visitors?: boolean;
  force_identify?: boolean;
  ignore_privacy?: boolean;
  visitor_compose?: boolean;
  file_transfer?: boolean;
  audio_record?: boolean;
  overlay_search?: boolean;
  overlay_mode?: boolean;
  helpdesk_link?: boolean;
  helpdesk_only?: boolean;
  status_health_dead?: boolean;
  check_domain?: boolean;
  color_theme?: string;
  color_mode?: string;
  layout_theme?: string;
  text_theme?: string;
  welcome_message?: string;
  locale?: string;
  allowed_pages?: string[];
  blocked_pages?: string[];
  blocked_countries?: string[];
  blocked_locales?: string[];
  blocked_ips?: string[];
}

/**************************************************************************
 * CLASSES
 ***************************************************************************/

/**
 * Crisp WebsiteSettings Resource
 */
class WebsiteSettingsService extends BaseResource {
  /**
   * Get Website Settings
   */
  getWebsiteSettings(websiteID: string): Promise<WebsiteSettings> {
    return this.crisp.get(
      this.crisp.prepareRestUrl(["website", websiteID, "settings"])
    );
  };

  /**
   * Update Website Settings
   */
  updateWebsiteSettings(websiteID: string, settings: WebsiteSettingsUpdate) {
    return this.crisp.patch(
      this.crisp.prepareRestUrl(["website", websiteID, "settings"]),

      null,
      settings
    );
  };
}

/**************************************************************************
 * EXPORTS
 ***************************************************************************/

export default WebsiteSettingsService;
