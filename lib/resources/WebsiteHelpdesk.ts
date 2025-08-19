/*
 * node-crisp-api
 *
 * Copyright 2023, Crisp IM SAS
 * Author: Valerian Saliou <valerian@valeriansaliou.name>
 */

/**************************************************************************
 * IMPORTS
 ***************************************************************************/

// PROJECT: RESOURCES
import BaseResource from "./BaseResource";

export interface Helpdesk {
  name?: string;
  url?: string;
}

export interface HelpdeskRemoveVerify {
  method: string;
  secret: string;
}

export interface HelpdeskLocale {
  locale_id?: string;
  locale?: string;
  url?: string;
  articles?: number;
  categories?: number;
}

export interface HelpdeskLocaleArticle {
  locale_id?: string;
  locale?: string;
  url?: string;
  articles?: number;
  categories?: number;
}

export interface HelpdeskLocaleArticleCategory {
  category_id?: string;
  section_id?: string;
}

export interface HelpdeskLocaleArticleAlternate {
  locale?: string;
  article_id?: string;
}

export interface HelpdeskLocaleSection {
  section_id?: string;
  name?: string;
  order?: number;
  created_at?: number;
  updated_at?: number;
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
  behavior?: HelpdeskSettingsBehavior;
  include?: HelpdeskSettingsInclude;
  access?: HelpdeskSettingsAccess;
}

export interface HelpdeskSettingsAppearance {
  logos?: HelpdeskSettingsAppearanceLogos;
  banner?: string;
}

export interface HelpdeskSettingsAppearanceLogos {
  header?: string;
  footer?: string;
}

export interface HelpdeskSettingsBehavior {
  frequentlyRead?: boolean;
  showCategoryImages?: boolean;
  showChatbox?: boolean;
  askFeedback?: boolean;
  localePicker?: boolean;
  referLink?: boolean;
  forbidIndexing?: boolean;
  statusHealthDead?: boolean;
}

export interface HelpdeskSettingsInclude {
  html?: string;
}

export interface HelpdeskSettingsAccess {
  password?: string;
}

export interface HelpdeskDomain {
  root?: string;
  basic?: string;
  custom?: string;
  verified?: boolean;
}

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
  resolveHelpdesk(websiteID: string) : Promise<Helpdesk> {
    return this.crisp.get(
      this.crisp.prepareRestUrl(["website", websiteID, "helpdesk"])
    );
  };

  /**
   * Initialize Helpdesk
   */
  initializeHelpdesk(websiteID: string, name: string, domainBasic: string) {
    return this.crisp.post(
      this.crisp.prepareRestUrl(["website", websiteID, "helpdesk"]), null,

      {
        name: name,
        domain_basic: domainBasic
      }
    );
  };

  /**
   * Delete Helpdesk
   */
  deleteHelpdesk(websiteID: string, verify: HelpdeskRemoveVerify) {
    return this.crisp.delete(
      this.crisp.prepareRestUrl(["website", websiteID, "helpdesk"]), null,

      {
        verify: verify
      }
    );
  };

  /**
   * List Helpdesk Locales
   */
  listHelpdeskLocales(websiteID: string, pageNumber: number = 1) {
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
  resolveHelpdeskLocale(websiteID: string, locale: string) : Promise<HelpdeskLocale> {
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
   * List Helpdesk Locale Articles
   */
  listHelpdeskLocaleArticles(
    websiteID: string, locale: string, pageNumber: number = 1, options: object = {}
  ) {
    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale, "articles",
        String(pageNumber)
      ]),

      options
    );
  };

  /**
   * Add A New Helpdesk Locale Article
   */
  addNewHelpdeskLocaleArticle(websiteID: string, locale: string, title: string) {
    return this.crisp.post(
      this.crisp.prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale, "article"
      ]),

      null,

      {
        title: title
      }
    );
  };

  /**
   * Check If Helpdesk Locale Article Exists
   */
  checkHelpdeskLocaleArticleExists(websiteID: string, locale: string, articleId: string) {
    return this.crisp.head(
      this.crisp.prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale, "article", articleId
      ])
    );
  };

  /**
   * Resolve Helpdesk Locale Article
   */
  resolveHelpdeskLocaleArticle(websiteID: string, locale: string, articleId: string) : Promise<HelpdeskLocaleArticle> {
    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale, "article",
        articleId
      ])
    );
  };

  /**
   * Save Helpdesk Locale Article
   */
  saveHelpdeskLocaleArticle(
    websiteID: string, locale: string, articleId: string, article: HelpdeskLocaleArticle
  ) {
    return this.crisp.put(
      this.crisp.prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale, "article",
        articleId
      ]),

      null, article
    );
  };

  /**
   * Update Helpdesk Locale Article
   */
  updateHelpdeskLocaleArticle(
    websiteID: string, locale: string, articleId: string, article: HelpdeskLocaleArticle
  ) {
    return this.crisp.patch(
      this.crisp.prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale, "article",
        articleId
      ]),

      null, article
    );
  };

  /**
   * Delete Helpdesk Locale Article
   */
  deleteHelpdeskLocaleArticle(websiteID: string, locale: string, articleId: string) {
    return this.crisp.delete(
      this.crisp.prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale, "article",
        articleId
      ])
    );
  };

  /**
   * Resolve Helpdesk Locale Article Page
   */
  resolveHelpdeskLocaleArticlePage(
    websiteID: string, locale: string, articleId: string
  ) {
    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale, "article",
        articleId, "page"
      ])
    );
  };

  /**
   * Resolve Helpdesk Locale Article Category
   */
  resolveHelpdeskLocaleArticleCategory(
    websiteID: string, locale: string, articleId: string
  ) : Promise<HelpdeskLocaleArticleCategory> {
    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale, "article",
        articleId, "category"
      ])
    );
  };

  /**
   * Update Helpdesk Locale Article Category
   */
  updateHelpdeskLocaleArticleCategory(
    websiteID: string, locale: string, articleId: string, categoryId: string, sectionId?: string
  ) {
    // Generate body
    let body = {
      category_id: categoryId
    };

    if (sectionId !== undefined) {
      // @ts-ignore
      body.section_id = sectionId;
    }

    return this.crisp.patch(
      this.crisp.prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale, "article",
        articleId, "category"
      ]),

      null, body
    );
  };

  /**
   * List Helpdesk Locale Article Alternates
   */
  listHelpdeskLocaleArticleAlternates(
    websiteID: string, locale: string, articleId: string
  ) : Promise<HelpdeskLocaleArticleAlternate[]> {
    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale, "article",
        articleId, "alternates"
      ])
    );
  };

  /**
   * Check If Helpdesk Locale Article Alternate Exists
   */
  checkHelpdeskLocaleArticleAlternateExists(
    websiteID: string, locale: string, articleId: string, localeLinked: string
  ) {
    return this.crisp.head(
      this.crisp.prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale, "article",
        articleId, "alternate", localeLinked
      ])
    );
  };

  /**
   * Resolve Helpdesk Locale Article Alternate
   */
  resolveHelpdeskLocaleArticleAlternate(
    websiteID: string, locale: string, articleId: string, localeLinked: string
  ) : Promise<HelpdeskLocaleArticleAlternate> {
    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale, "article",
        articleId, "alternate", localeLinked
      ])
    );
  };

  /**
   * Save Helpdesk Locale Article Alternate
   */
  saveHelpdeskLocaleArticleAlternate(
    websiteID: string, locale: string, articleId: string, localeLinked: string, articleIdLinked: string
  ) {
    return this.crisp.put(
      this.crisp.prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale, "article",
        articleId, "alternate", localeLinked
      ]),

      null,

      {
        article_id: articleIdLinked
      }
    );
  };

  /**
   * Delete Helpdesk Locale Article Alternate
   */
  deleteHelpdeskLocaleArticleAlternate(
    websiteID: string, locale: string, articleId: string, localeLinked: string
  ) {
    return this.crisp.delete(
      this.crisp.prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale, "article",
        articleId, "alternate", localeLinked
      ])
    );
  };

  /**
   * Publish Helpdesk Locale Article
   */
  publishHelpdeskLocaleArticle(
    websiteID: string, locale: string, articleId: string
  ) {
    return this.crisp.post(
      this.crisp.prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale, "article",
        articleId, "publish"
      ]),

      null,

      null
    );
  };

  /**
   * Unpublish Helpdesk Locale Article
   */
  unpublishHelpdeskLocaleArticle(
    websiteID: string, locale: string, articleId: string
  ) {
    return this.crisp.post(
      this.crisp.prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale, "article",
        articleId, "unpublish"
      ]),

      null,

      null
    );
  };

  /**
   * List Helpdesk Locale Categories
   */
  listHelpdeskLocaleCategories(
    websiteID: string, locale: string, pageNumber: number = 1
  ) : Promise<HelpdeskLocaleArticleCategory[]> {
    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale, "categories",
        String(pageNumber)
      ])
    );
  };

  /**
   * Add Helpdesk Locale Category
   */
  addHelpdeskLocaleCategory(websiteID: string, locale: string, name: string) {
    return this.crisp.post(
      this.crisp.prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale, "category"
      ]),

      null,

      {
        name: name
      }
    );
  };

  /**
   * Check If Helpdesk Locale Category Exists
   */
  checkHelpdeskLocaleCategoryExists(
    websiteID: string, locale: string, categoryId: string
  ) {
    return this.crisp.head(
      this.crisp.prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale, "category",
        categoryId
      ])
    );
  };

  /**
   * Resolve Helpdesk Locale Category
   */
  resolveHelpdeskLocaleCategory(
    websiteID: string, locale: string, categoryId: string
  ) : Promise<HelpdeskLocaleArticleCategory> {
    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale, "category",
        categoryId
      ])
    );
  };

  /**
   * Save Helpdesk Locale Category
   */
  saveHelpdeskLocaleCategory(
    websiteID: string, locale: string, categoryId: string, category: HelpdeskLocaleArticleCategory
  ) {
    return this.crisp.put(
      this.crisp.prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale, "category",
        categoryId
      ]),

      null, category
    );
  };
  /**
   * Update Helpdesk Locale Category
   */
  updateHelpdeskLocaleCategory(
    websiteID: string, locale: string, categoryId: string, category: HelpdeskLocaleArticleCategory
  ) {
    return this.crisp.patch(
      this.crisp.prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale, "category",
        categoryId
      ]),

      null, category
    );
  };

  /**
   * Delete Helpdesk Locale Category
   */
  deleteHelpdeskLocaleCategory(
    websiteID: string, locale: string, categoryId: string
  ) {
    return this.crisp.delete(
      this.crisp.prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale, "category",
        categoryId
      ])
    );
  };

  /**
   * List Helpdesk Locale Sections
   */
  listHelpdeskLocaleSections(
    websiteID: string, locale: string, categoryId: string, pageNumber: number = 1
  ) : Promise<HelpdeskLocaleSection[]> {
    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale, "category",
        categoryId, "sections", String(pageNumber)
      ])
    );
  };

  /**
   * Add Helpdesk Locale Section
   */
  addHelpdeskLocaleSection(
    websiteID: string, locale: string, categoryId: string, name: string
  ) {
    return this.crisp.post(
      this.crisp.prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale, "category",
        categoryId, "section"
      ]),

      null,

      {
        name: name
      }
    );
  };

  /**
   * Check If Helpdesk Locale Section Exists
   */
  checkHelpdeskLocaleSectionExists(
    websiteID: string, locale: string, categoryId: string, sectionId: string
  ) {
    return this.crisp.head(
      this.crisp.prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale, "category",
        categoryId, "section", sectionId
      ])
    );
  };

  /**
   * Resolve Helpdesk Locale Section
   */
  resolveHelpdeskLocaleSection(
    websiteID: string, locale: string, categoryId: string, sectionId: string
  ) : Promise<HelpdeskLocaleSection> {
    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale, "category",
        categoryId, "section", sectionId
      ])
    );
  };

  /**
   * Save Helpdesk Locale Section
  */
  saveHelpdeskLocaleSection(
    websiteID: string, locale: string, categoryId: string, sectionId: string, section: HelpdeskLocaleSection
  ) {
    return this.crisp.put(
      this.crisp.prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale, "category",
        categoryId, "section", sectionId
      ]),

      null, section
    );
  };

  /**
   * Update Helpdesk Locale Section
   */
  updateHelpdeskLocaleSection(
    websiteID: string, locale: string, categoryId: string, sectionId: string, section: HelpdeskLocaleSection
  ) {
    return this.crisp.patch(
      this.crisp.prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale, "category",
        categoryId, "section", sectionId
      ]),

      null, section
    );
  };

  /**
   * Delete Helpdesk Locale Section
   */
  deleteHelpdeskLocaleSection(
    websiteID: string, locale: string, categoryId: string, sectionId: string
  ) {
    return this.crisp.delete(
      this.crisp.prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale, "category",
        categoryId, "section", sectionId
      ])
    );
  };

  /**
   * Map Helpdesk Locale Feedback Ratings
   */
  mapHelpdeskLocaleFeedbackRatings(
    websiteID: string, locale: string, filterDateStart?: string | null, filterDateEnd?: string | null
  ) : Promise<HelpdeskLocaleFeedbackRatings> {
    filterDateStart = (filterDateStart || null);
    filterDateEnd   = (filterDateEnd   || null);

    // Generate query
    let query = {};

    if (filterDateStart !== null) {
      // @ts-ignore
      query.filter_date_start = filterDateStart;
    }

    if (filterDateEnd !== null) {
      // @ts-ignore
      query.filter_date_end = filterDateEnd;
    }

    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale, "feedback",
        "ratings"
      ]),

      query
    );
  };

  /**
   * List Helpdesk Locale Feedbacks
   */
  listHelpdeskLocaleFeedbacks(
    websiteID: string, locale: string, pageNumber: number = 1, filterDateStart?: string | null, filterDateEnd?: string | null
  ) : Promise<HelpdeskLocaleFeedbackItem[]> {
    filterDateStart = (filterDateStart || null);
    filterDateEnd   = (filterDateEnd   || null);

    // Generate query
    let query = {};

    if (filterDateStart !== null) {
      // @ts-ignore
      query.filter_date_start = filterDateStart;
    }

    if (filterDateEnd !== null) {
      // @ts-ignore
      query.filter_date_end = filterDateEnd;
    }

    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale, "feedback", "list",
        String(pageNumber)
      ]),

      query
    );
  };

  /**
   * Import External Helpdesk To Locale
   */
  importExternalHelpdeskToLocale(
    websiteID: string, locale: string, helpdeskUrl: string
  ) {
    return this.crisp.post(
      this.crisp.prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale, "import"
      ]),

      null,

      {
        helpdesk_url: helpdeskUrl
      }
    );
  };

  /**
   * Export Helpdesk Locale Articles
   */
  exportHelpdeskLocaleArticles(websiteID: string, locale: string) {
    return this.crisp.post(
      this.crisp.prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale, "export"
      ]),

      null,

      null
    );
  };

  /**
   * List Helpdesk Redirections
   */
  listHelpdeskRedirections(websiteID: string, pageNumber: number = 1) : Promise<HelpdeskRedirection[]> {
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
  resolveHelpdeskRedirection(websiteID: string, redirectionId: string) : Promise<HelpdeskRedirection> {
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
  resolveHelpdeskSettings(websiteID: string) : Promise<HelpdeskSettings> {
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

  /**
   * Resolve Helpdesk Domain
   */
  resolveHelpdeskDomain(websiteID: string) : Promise<HelpdeskDomain> {
    return this.crisp.get(
      this.crisp.prepareRestUrl(["website", websiteID, "helpdesk", "domain"])
    );
  };

  /**
   * Request Helpdesk Domain Change
   */
  requestHelpdeskDomainChange(websiteID: string, basic: string, custom: string) {
    // Generate body
    let body = {};

    if (basic !== undefined) {
      // @ts-ignore
      body.basic = basic;
    }

    if (custom !== undefined) {
      // @ts-ignore
      body.custom = custom;
    }

    return this.crisp.patch(
      this.crisp.prepareRestUrl(["website", websiteID, "helpdesk", "domain"]),

      null, body
    );
  };

  /**
   * Generate Helpdesk Domain Setup Flow
   */
  generateHelpdeskDomainSetupFlow(websiteID: string, custom?: string | null) {
    custom = (custom || null);

    // Generate query
    let query = {};

    if (custom !== null) {
      // @ts-ignore
      query.custom = custom;
    }

    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "helpdesk", "domain", "setup"
      ]),

      query
    );
  };
}

export default WebsiteHelpdesk;
