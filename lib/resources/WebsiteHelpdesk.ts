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
 * ENUMERATIONS
 ***************************************************************************/

export enum HelpdeskContentType {
  Articles = "articles",
  Guides = "guides",
  References = "references",
  News = "news"
}

/**************************************************************************
 * INTERFACES
 ***************************************************************************/

export interface Helpdesk {
  name?: string;
  url?: string;
}

export interface HelpdeskLocale {
  locale_id?: string;
  locale?: string;
  url?: string;
  statistics?: HelpdeskLocaleStatistics;
}

export interface HelpdeskLocaleStatistics {
  articles?: HelpdeskLocaleStatisticsContent;
  guides?: HelpdeskLocaleStatisticsContent;
  references?: HelpdeskLocaleStatisticsContent;
  news?: HelpdeskLocaleStatisticsContent;
}

export interface HelpdeskLocaleStatisticsContent {
  entries?: number;
  groups?: number;
}

export interface HelpdeskPage {
  entity_id?: string;
  title?: string;
  tree_path?: string;
  url?: string;
}

export interface HelpdeskTreeEntry {
  type?: string;
  slug?: string;
  order_indexed?: boolean;
  title?: string;
  state?: HelpdeskTreeState;
  children?: HelpdeskTreeEntry[];
}

export interface HelpdeskTreeState {
  published?: boolean;
  hidden?: boolean;
  featured?: boolean;
}

export interface HelpdeskTreeContent {
  content?: string;
}

export interface HelpdeskTreeMetadata {
  format?: string;
  title?: string;
  description?: string;
  state?: HelpdeskTreeState;
  author?: HelpdeskTreeMetadataAuthor;
  color?: string;
  image?: string;
}

export interface HelpdeskTreeMetadataAuthor {
  user_id?: string;
}

export interface HelpdeskTreeAlternates {
  [locale: string]: string;
}

export interface HelpdeskTreeAlternatesUpdate {
  [locale: string]: string | null;
}

export interface HelpdeskTreePage {
  title?: string;
  url?: string;
}

export interface HelpdeskTreePathUpdate {
  action: string;
  path?: HelpdeskTreePathUpdatePath;
  position?: number;
}

export interface HelpdeskTreePathUpdatePath {
  to: string;
}

export interface HelpdeskLocaleFeedbackRatings {
  ratings?: HelpdeskLocaleFeedbackRatingsRatings;
}

export interface HelpdeskLocaleFeedbackRatingsRatings {
  helpful?: number;
  unhelpful?: number;
}

export interface HelpdeskLocaleFeedbackItem {
  rating?: string;
  comment?: string;
  article?: HelpdeskLocaleFeedbackItemArticle;
  session?: HelpdeskLocaleFeedbackItemSession;
  created_at?: number;
}

export interface HelpdeskLocaleFeedbackItemArticle {
  article_id?: string;
  title?: string;
  url?: string;
}

export interface HelpdeskLocaleFeedbackItemSession {
  session_id?: string;
  nickname?: string;
  email?: string;
  avatar?: string;
  geolocation?: HelpdeskLocaleFeedbackItemSessionGeolocation;
  assigned?: HelpdeskLocaleFeedbackItemSessionAssigned;
}

export interface HelpdeskLocaleFeedbackItemSessionGeolocation {
  country?: string;
  region?: string;
  city?: string;
  coordinates?: HelpdeskLocaleFeedbackItemSessionGeolocationCoordinates;
}

export interface HelpdeskLocaleFeedbackItemSessionGeolocationCoordinates {
  latitude?: number;
  longitude?: number;
}

export interface HelpdeskLocaleFeedbackItemSessionAssigned {
  user_id?: string;
}

export interface HelpdeskRedirection {
  redirection_id?: string;
  path?: string;
  target?: string;
  created_at?: number;
  updated_at?: number;
}

export interface HelpdeskSettings {
  name?: string;
  appearance?: HelpdeskSettingsAppearance;
  localization?: HelpdeskSettingsLocalization;
  section?: HelpdeskSettingsSection;
  behavior?: HelpdeskSettingsBehavior;
  service?: HelpdeskSettingsService;
  include?: HelpdeskSettingsInclude;
  access?: HelpdeskSettingsAccess;
}

export interface HelpdeskSettingsAppearance {
  color?: HelpdeskSettingsAppearanceColor;
  logos?: HelpdeskSettingsAppearanceLogos;
  banner?: string;
}

export interface HelpdeskSettingsAppearanceColor {
  mode?: string;
  mode_changeable?: boolean;
}

export interface HelpdeskSettingsAppearanceLogos {
  favicon?: string;
  header?: string;
  footer?: string;
}

export interface HelpdeskSettingsLocalization {
  writing_locale?: string;
  translated_automatic?: boolean;
  translated_locales_readonly?: boolean;
}

export interface HelpdeskSettingsSection {
  articles?: string;
  guides?: string;
  references?: string;
  news?: string;
}

export interface HelpdeskSettingsBehavior {
  frequently_read?: boolean;
  show_category_images?: boolean;
  show_chatbox?: boolean;
  ask_feedback?: boolean;
  serve_markdown?: boolean;
  agent_copy_button?: boolean;
  table_of_contents?: boolean;
  locale_picker?: boolean;
  refer_link?: boolean;
  forbid_indexing?: boolean;
  status_health_dead?: boolean;
}

export interface HelpdeskSettingsService {
  mcp_server?: boolean;
}

export interface HelpdeskSettingsInclude {
  html?: string;
}

export interface HelpdeskSettingsAccess {
  restrict_mode?: string;
  password?: string;
  jwt_secret?: string;
  jwt_auth_url?: string;
}

/**************************************************************************
 * CLASSES
 ***************************************************************************/

/**
 * Crisp WebsiteHelpdesk Resource
 */
class WebsiteHelpdesk extends BaseResource {
  /**
   * Check If Helpdesk Exists
   */
  checkHelpdeskExists(websiteID: string) {
    return this.crisp.head(
      this.crisp.prepareRestUrl(["website", websiteID, "helpdesk"])
    );
  };

  /**
   * Resolve Helpdesk
   */
  resolveHelpdesk(websiteID: string): Promise<Helpdesk> {
    return this.crisp.get(
      this.crisp.prepareRestUrl(["website", websiteID, "helpdesk"])
    );
  };

  /**
   * List Helpdesk Locales
   */
  listHelpdeskLocales(
    websiteID: string, pageNumber: number = 1
  ): Promise<HelpdeskLocale[]> {
    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "helpdesk", "locales", String(pageNumber)
      ])
    );
  };

  /**
   * Add Helpdesk Locale
   */
  addHelpdeskLocale(websiteID: string, locale: string) {
    return this.crisp.post(
      this.crisp.prepareRestUrl(["website", websiteID, "helpdesk", "locale"]),

      null,

      {
        locale: locale
      }
    );
  };

  /**
   * Check If Helpdesk Locale Exists
   */
  checkHelpdeskLocaleExists(websiteID: string, locale: string) {
    return this.crisp.head(
      this.crisp.prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale
      ])
    );
  };

  /**
   * Resolve Helpdesk Locale
   */
  resolveHelpdeskLocale(
    websiteID: string, locale: string
  ): Promise<HelpdeskLocale> {
    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale
      ])
    );
  };

  /**
   * Delete Helpdesk Locale
   */
  deleteHelpdeskLocale(websiteID: string, locale: string) {
    return this.crisp.delete(
      this.crisp.prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale
      ])
    );
  };

  /**
   * List Helpdesk Pages
   */
  listHelpdeskPages(
    websiteID: string, locale: string, contentType: HelpdeskContentType,
      pageNumber: number = 1
  ): Promise<HelpdeskPage[]> {
    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "helpdesk", "page", "list", locale,
        contentType, String(pageNumber)
      ])
    );
  };

  /**
   * Resolve Helpdesk Page Entity
   */
  resolveHelpdeskPageEntity(
    websiteID: string, locale: string, contentType: HelpdeskContentType,
      entityID: string
  ): Promise<HelpdeskPage> {
    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "helpdesk", "page", "entity", locale,
        contentType, entityID
      ])
    );
  };

  /**
   * List Helpdesk Tree
   */
  listHelpdeskTree(
    websiteID: string, locale: string, contentType: HelpdeskContentType,
      pageNumber: number = 1, subPath?: string | null,
      searchTitle?: string | null, filterDateStart?: string | null,
      filterDateEnd?: string | null
  ): Promise<HelpdeskTreeEntry[]> {
    const query: Record<string, unknown> = {};

    if (subPath !== undefined && subPath !== null) {
      query.sub_path = subPath;
    }

    if (searchTitle !== undefined && searchTitle !== null) {
      query.search_title = searchTitle;
    }

    if (filterDateStart !== undefined && filterDateStart !== null) {
      query.filter_date_start = filterDateStart;
    }

    if (filterDateEnd !== undefined && filterDateEnd !== null) {
      query.filter_date_end = filterDateEnd;
    }

    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "helpdesk", "tree", "list", locale,
        contentType, String(pageNumber)
      ]),

      query
    );
  };

  /**
   * Create Helpdesk Tree Path
   */
  createHelpdeskTreePath(
    websiteID: string, locale: string, contentType: HelpdeskContentType,
      path: string
  ) {
    return this.crisp.post(
      this.crisp.prepareRestUrl([
        "website", websiteID, "helpdesk", "tree", "path", locale,
        contentType, path
      ]),

      null,
      null
    );
  };

  /**
   * Resolve Helpdesk Tree Path
   */
  resolveHelpdeskTreePath(
    websiteID: string, locale: string, contentType: HelpdeskContentType,
      path: string
  ): Promise<HelpdeskTreeEntry> {
    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "helpdesk", "tree", "path", locale,
        contentType, path
      ])
    );
  };

  /**
   * Update Helpdesk Tree Path
   */
  updateHelpdeskTreePath(
    websiteID: string, locale: string, contentType: HelpdeskContentType,
      path: string,
      update: HelpdeskTreePathUpdate
  ) {
    return this.crisp.patch(
      this.crisp.prepareRestUrl([
        "website", websiteID, "helpdesk", "tree", "path", locale,
        contentType, path
      ]),

      null, update
    );
  };

  /**
   * Delete Helpdesk Tree Path
   */
  deleteHelpdeskTreePath(
    websiteID: string, locale: string, contentType: HelpdeskContentType,
      path: string
  ) {
    return this.crisp.delete(
      this.crisp.prepareRestUrl([
        "website", websiteID, "helpdesk", "tree", "path", locale,
        contentType, path
      ])
    );
  };

  /**
   * Resolve Helpdesk Tree Content
   */
  resolveHelpdeskTreeContent(
    websiteID: string, locale: string, contentType: HelpdeskContentType,
      path: string
  ): Promise<HelpdeskTreeContent> {
    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "helpdesk", "tree", "content", locale,
        contentType, path
      ])
    );
  };

  /**
   * Save Helpdesk Tree Content
   */
  saveHelpdeskTreeContent(
    websiteID: string, locale: string, contentType: HelpdeskContentType,
      path: string,
      content: string
  ) {
    return this.crisp.put(
      this.crisp.prepareRestUrl([
        "website", websiteID, "helpdesk", "tree", "content", locale,
        contentType, path
      ]),

      null,

      {
        content: content
      }
    );
  };

  /**
   * Resolve Helpdesk Tree Metadata
   */
  resolveHelpdeskTreeMetadata(
    websiteID: string, locale: string, contentType: HelpdeskContentType,
      path: string
  ): Promise<HelpdeskTreeMetadata> {
    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "helpdesk", "tree", "metadata", locale,
        contentType, path
      ])
    );
  };

  /**
   * Update Helpdesk Tree Metadata
   */
  updateHelpdeskTreeMetadata(
    websiteID: string, locale: string, contentType: HelpdeskContentType,
      path: string,
      metadata: HelpdeskTreeMetadata
  ) {
    return this.crisp.patch(
      this.crisp.prepareRestUrl([
        "website", websiteID, "helpdesk", "tree", "metadata", locale,
        contentType, path
      ]),

      null, metadata
    );
  };

  /**
   * List Helpdesk Tree Alternates
   */
  listHelpdeskTreeAlternates(
    websiteID: string, locale: string, contentType: HelpdeskContentType,
      path: string
  ): Promise<HelpdeskTreeAlternates> {
    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "helpdesk", "tree", "alternates", locale,
        contentType, path
      ])
    );
  };

  /**
   * Update Helpdesk Tree Alternates
   */
  updateHelpdeskTreeAlternates(
    websiteID: string, locale: string, contentType: HelpdeskContentType,
      path: string, alternates: HelpdeskTreeAlternatesUpdate
  ) {
    return this.crisp.patch(
      this.crisp.prepareRestUrl([
        "website", websiteID, "helpdesk", "tree", "alternates", locale,
        contentType, path
      ]),

      null, alternates
    );
  };

  /**
   * Resolve Helpdesk Tree Page
   */
  resolveHelpdeskTreePage(
    websiteID: string, locale: string, contentType: HelpdeskContentType,
      path: string
  ): Promise<HelpdeskTreePage> {
    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "helpdesk", "tree", "page", locale,
        contentType, path
      ])
    );
  };

  /**
   * Map Helpdesk Locale Feedback Ratings
   */
  mapHelpdeskLocaleFeedbackRatings(
    websiteID: string, locale: string, contentType: HelpdeskContentType,
      filterDateStart?: string | null, filterDateEnd?: string | null
  ): Promise<HelpdeskLocaleFeedbackRatings> {
    filterDateStart = (filterDateStart || null);
    filterDateEnd   = (filterDateEnd   || null);

    // Generate query
    const query: Record<string, unknown> = {};

    if (filterDateStart !== null) {
      query.filter_date_start = filterDateStart;
    }

    if (filterDateEnd !== null) {
      query.filter_date_end = filterDateEnd;
    }

    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "helpdesk", "feedback", "ratings", locale,
        contentType
      ]),

      query
    );
  };

  /**
   * List Helpdesk Locale Feedbacks
   */
  listHelpdeskLocaleFeedbacks(
    websiteID: string, locale: string, contentType: HelpdeskContentType,
      pageNumber: number = 1, filterDateStart?: string | null,
      filterDateEnd?: string | null
  ): Promise<HelpdeskLocaleFeedbackItem[]> {
    filterDateStart = (filterDateStart || null);
    filterDateEnd   = (filterDateEnd   || null);

    // Generate query
    const query: Record<string, unknown> = {};

    if (filterDateStart !== null) {
      query.filter_date_start = filterDateStart;
    }

    if (filterDateEnd !== null) {
      query.filter_date_end = filterDateEnd;
    }

    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "helpdesk", "feedback", "list", locale,
        contentType, String(pageNumber)
      ]),

      query
    );
  };

  /**
   * List Helpdesk Redirections
   */
  listHelpdeskRedirections(
    websiteID: string, pageNumber: number = 1
  ): Promise<HelpdeskRedirection[]> {
    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "helpdesk", "redirections", String(pageNumber)
      ])
    );
  };

  /**
   * Add Helpdesk Redirection
   */
  addHelpdeskRedirection(
    websiteID: string, redirectionPath: string, redirectionTarget: string
  ) {
    return this.crisp.post(
      this.crisp.prepareRestUrl(["website", websiteID, "helpdesk", "redirection"]),

      null,

      {
        path: redirectionPath,
        target: redirectionTarget
      }
    );
  };

  /**
   * Check If Helpdesk Redirection Exists
   */
  checkHelpdeskRedirectionExists(websiteID: string, redirectionId: string) {
    return this.crisp.head(
      this.crisp.prepareRestUrl([
        "website", websiteID, "helpdesk", "redirection", redirectionId
      ])
    );
  };

  /**
   * Resolve Helpdesk Redirection
   */
  resolveHelpdeskRedirection(
    websiteID: string, redirectionId: string
  ): Promise<HelpdeskRedirection> {
    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "helpdesk", "redirection", redirectionId
      ])
    );
  };

  /**
   * Delete Helpdesk Redirection
   */
  deleteHelpdeskRedirection(websiteID: string, redirectionId: string) {
    return this.crisp.delete(
      this.crisp.prepareRestUrl([
        "website", websiteID, "helpdesk", "redirection", redirectionId
      ])
    );
  };

  /**
   * Resolve Helpdesk Settings
   */
  resolveHelpdeskSettings(websiteID: string): Promise<HelpdeskSettings> {
    return this.crisp.get(
      this.crisp.prepareRestUrl(["website", websiteID, "helpdesk", "settings"])
    );
  };

  /**
   * Save Helpdesk Settings
   */
  saveHelpdeskSettings(websiteID: string, settings: HelpdeskSettings) {
    return this.crisp.patch(
      this.crisp.prepareRestUrl(["website", websiteID, "helpdesk", "settings"]),

      null, settings
    );
  };
}

/**************************************************************************
 * EXPORTS
 ***************************************************************************/

export default WebsiteHelpdesk;
