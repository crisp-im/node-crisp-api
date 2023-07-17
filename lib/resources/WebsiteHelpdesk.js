/*
 * node-crisp-api
 *
 * Copyright 2023, Crisp IM SAS
 * Author: Valerian Saliou <valerian@valeriansaliou.name>
 */


"use strict";


/**
 * Crisp WebsiteHelpdesk Resource
 * @class
 * @classdesc This is the Crisp Website Helpdesk Resource
 */
function WebsiteHelpdesk(service, crisp) {
  /**
   * Check If Helpdesk Exists
   * @memberof WebsiteConversation
   * @public
   * @method checkHelpdeskExists
   * @param {string} websiteID
   * @return {Promise}
   */
  service.checkHelpdeskExists = function(websiteID) {
    return crisp.head(
      crisp._prepareRestUrl(["website", websiteID, "helpdesk"])
    );
  };

  /**
   * Resolve Helpdesk
   * @memberof WebsiteConversation
   * @public
   * @method resolveHelpdesk
   * @param {string} websiteID
   * @return {Promise}
   */
  service.resolveHelpdesk = function(websiteID) {
    return crisp.get(
      crisp._prepareRestUrl(["website", websiteID, "helpdesk"])
    );
  };

  /**
   * Initialize Helpdesk
   * @memberof WebsiteConversation
   * @public
   * @method initializeHelpdesk
   * @param {string} websiteID
   * @param {string} name
   * @param {string} domainBasic
   * @return {Promise}
   */
  service.initializeHelpdesk = function(websiteID, name, domainBasic) {
    return crisp.post(
      crisp._prepareRestUrl(["website", websiteID, "helpdesk"]), null,

      {
        name         : name,
        domain_basic : domainBasic
      }
    );
  };

  /**
   * Delete Helpdesk
   * @memberof WebsiteConversation
   * @public
   * @method deleteHelpdesk
   * @param {string} websiteID
   * @param {string} verify
   * @return {Promise}
   */
  service.deleteHelpdesk = function(websiteID, verify) {
    return crisp.delete(
      crisp._prepareRestUrl(["website", websiteID, "helpdesk"]), null,

      {
        verify : verify
      }
    );
  };

  /**
   * List Helpdesk Locales
   * @memberof WebsiteConversation
   * @public
   * @method listHelpdeskLocales
   * @param {string} websiteID
   * @param {number} pageNumber
   * @return {Promise}
   */
  service.listHelpdeskLocales = function(websiteID, pageNumber) {
    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteID, "helpdesk", "locales", pageNumber
      ])
    );
  };

  /**
   * Add Helpdesk Locale
   * @memberof WebsiteConversation
   * @public
   * @method addHelpdeskLocale
   * @param {string} websiteID
   * @param {string} locale
   * @return {Promise}
   */
  service.addHelpdeskLocale = function(websiteID, locale) {
    return crisp.post(
      crisp._prepareRestUrl(["website", websiteID, "helpdesk", "locale"]),

      null,

      {
        locale : locale
      }
    );
  };

  /**
   * Check If Helpdesk Locale Exists
   * @memberof WebsiteConversation
   * @public
   * @method checkHelpdeskLocaleExists
   * @param {string} websiteID
   * @param {string} locale
   * @return {Promise}
   */
  service.checkHelpdeskLocaleExists = function(websiteID, locale) {
    return crisp.head(
      crisp._prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale
      ])
    );
  };

  /**
   * Resolve Helpdesk Locale
   * @memberof WebsiteConversation
   * @public
   * @method resolveHelpdeskLocale
   * @param {string} websiteID
   * @param {string} locale
   * @return {Promise}
   */
  service.resolveHelpdeskLocale = function(websiteID, locale) {
    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale
      ])
    );
  };

  /**
   * Delete Helpdesk Locale
   * @memberof WebsiteConversation
   * @public
   * @method deleteHelpdeskLocale
   * @param {string} websiteID
   * @param {string} locale
   * @return {Promise}
   */
  service.deleteHelpdeskLocale = function(websiteID, locale) {
    return crisp.delete(
      crisp._prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale
      ])
    );
  };

  /**
   * List Helpdesk Locale Articles
   * @memberof WebsiteConversation
   * @public
   * @method listHelpdeskLocaleArticles
   * @param {string} websiteID
   * @param {string} locale
   * @param {number} pageNumber
   * @return {Promise}
   */
  service.listHelpdeskLocaleArticles = function(websiteID, locale, pageNumber) {
    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale, "articles",
          pageNumber
      ])
    );
  };

  /**
   * Add A New Helpdesk Locale Article
   * @memberof WebsiteConversation
   * @public
   * @method addNewHelpdeskLocaleArticle
   * @param {string} websiteID
   * @param {string} locale
   * @param {string} title
   * @return {Promise}
   */
  service.addNewHelpdeskLocaleArticle = function(websiteID, locale, title) {
    return crisp.post(
      crisp._prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale, "article"
      ]),

      null,

      {
        title : title
      }
    );
  };

  /**
   * Check If Helpdesk Locale Article Exists
   * @memberof WebsiteConversation
   * @public
   * @method checkHelpdeskLocaleArticleExists
   * @param {string} websiteID
   * @param {string} locale
   * @param {string} articleId
   * @return {Promise}
   */
  service.checkHelpdeskLocaleArticleExists = function(
    websiteID, locale, articleId
  ) {
    return crisp.head(
      crisp._prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale, "article", articleId
      ])
    );
  };

  /**
   * Resolve Helpdesk Locale Article
   * @memberof WebsiteConversation
   * @public
   * @method resolveHelpdeskLocaleArticle
   * @param {string} websiteID
   * @param {string} locale
   * @param {string} articleId
   * @return {Promise}
   */
  service.resolveHelpdeskLocaleArticle = function(
    websiteID, locale, articleId
  ) {
    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale, "article",
          articleId
      ])
    );
  };

  /**
   * Save Helpdesk Locale Article
   * @memberof WebsiteConversation
   * @public
   * @method saveHelpdeskLocaleArticle
   * @param {string} websiteID
   * @param {string} locale
   * @param {string} articleId
   * @param {object} article
   * @return {Promise}
   */
  service.saveHelpdeskLocaleArticle = function(
    websiteID, locale, articleId, article
  ) {
    return crisp.put(
      crisp._prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale, "article",
          articleId
      ]),

      null, article
    );
  };

  /**
   * Update Helpdesk Locale Article
   * @memberof WebsiteConversation
   * @public
   * @method updateHelpdeskLocaleArticle
   * @param {string} websiteID
   * @param {string} locale
   * @param {string} articleId
   * @param {object} article
   * @return {Promise}
   */
  service.updateHelpdeskLocaleArticle = function(
    websiteID, locale, articleId, article
  ) {
    return crisp.patch(
      crisp._prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale, "article",
          articleId
      ]),

      null, article
    );
  };

  /**
   * Delete Helpdesk Locale Article
   * @memberof WebsiteConversation
   * @public
   * @method deleteHelpdeskLocaleArticle
   * @param {string} websiteID
   * @param {string} locale
   * @param {string} articleId
   * @return {Promise}
   */
  service.deleteHelpdeskLocaleArticle = function(websiteID, locale, articleId) {
    return crisp.delete(
      crisp._prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale, "article",
          articleId
      ])
    );
  };

  /**
   * Resolve Helpdesk Locale Article Category
   * @memberof WebsiteConversation
   * @public
   * @method resolveHelpdeskLocaleArticleCategory
   * @param {string} websiteID
   * @param {string} locale
   * @param {string} articleId
   * @return {Promise}
   */
  service.resolveHelpdeskLocaleArticleCategory = function(
    websiteID, locale, articleId
  ) {
    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale, "article",
          articleId, "category"
      ])
    );
  };

  /**
   * Update Helpdesk Locale Article Category
   * @memberof WebsiteConversation
   * @public
   * @method updateHelpdeskLocaleArticleCategory
   * @param {string} websiteID
   * @param {string} locale
   * @param {string} articleId
   * @param {string} categoryId
   * @param {string} [sectionId]
   * @return {Promise}
   */
  service.updateHelpdeskLocaleArticleCategory = function(
    websiteID, locale, articleId, categoryId, sectionId
  ) {
    // Generate body
    var _body = {
      category_id : categoryId
    };

    if (sectionId !== undefined) {
      _body.section_id = sectionId;
    }

    return crisp.patch(
      crisp._prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale, "article",
          articleId, "category"
      ]),

      null, _body
    );
  };

  /**
   * List Helpdesk Locale Article Alternates
   * @memberof WebsiteConversation
   * @public
   * @method listHelpdeskLocaleArticleAlternates
   * @param {string} websiteID
   * @param {string} locale
   * @param {string} articleId
   * @return {Promise}
   */
  service.listHelpdeskLocaleArticleAlternates = function(
    websiteID, locale, articleId
  ) {
    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale, "article",
          articleId, "alternates"
      ])
    );
  };

  /**
   * Check If Helpdesk Locale Article Alternate Exists
   * @memberof WebsiteConversation
   * @public
   * @method checkHelpdeskLocaleArticleAlternateExists
   * @param {string} websiteID
   * @param {string} locale
   * @param {string} articleId
   * @param {string} localeLinked
   * @return {Promise}
   */
  service.checkHelpdeskLocaleArticleAlternateExists = function(
    websiteID, locale, articleId, localeLinked
  ) {
    return crisp.head(
      crisp._prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale, "article",
          articleId, "alternate", localeLinked
      ])
    );
  };
  /**
   * Resolve Helpdesk Locale Article Alternate
   * @memberof WebsiteConversation
   * @public
   * @method resolveHelpdeskLocaleArticleAlternate
   * @param {string} websiteID
   * @param {string} locale
   * @param {string} articleId
   * @param {string} localeLinked
   * @return {Promise}
   */
  service.resolveHelpdeskLocaleArticleAlternate = function(
    websiteID, locale, articleId, localeLinked
  ) {
    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale, "article",
          articleId, "alternate", localeLinked
      ])
    );
  };

  /**
   * Save Helpdesk Locale Article Alternate
   * @memberof WebsiteConversation
   * @public
   * @method saveHelpdeskLocaleArticleAlternate
   * @param {string} websiteID
   * @param {string} locale
   * @param {string} articleId
   * @param {string} localeLinked
   * @param {string} articleIdLinked
   * @return {Promise}
   */
  service.saveHelpdeskLocaleArticleAlternate = function(
    websiteID, locale, articleId, localeLinked, articleIdLinked
  ) {
    return crisp.put(
      crisp._prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale, "article",
          articleId, "alternate", localeLinked
      ]),

      null,

      {
        article_id : articleIdLinked
      }
    );
  };

  /**
   * Delete Helpdesk Locale Article Alternate
   * @memberof WebsiteConversation
   * @public
   * @method deleteHelpdeskLocaleArticleAlternate
   * @param {string} websiteID
   * @param {string} locale
   * @param {string} articleId
   * @param {string} localeLinked
   * @return {Promise}
   */
  service.deleteHelpdeskLocaleArticleAlternate = function(
    websiteID, locale, articleId, localeLinked
  ) {
    return crisp.delete(
      crisp._prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale, "article",
          articleId, "alternate", localeLinked
      ])
    );
  };

  /**
   * Publish Helpdesk Locale Article
   * @memberof WebsiteConversation
   * @public
   * @method publishHelpdeskLocaleArticle
   * @param {string} websiteID
   * @param {string} locale
   * @param {string} articleId
   * @return {Promise}
   */
  service.publishHelpdeskLocaleArticle = function(
    websiteID, locale, articleId
  ) {
    return crisp.post(
      crisp._prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale, "article",
          articleId, "publish"
      ])
    );
  };

  /**
   * Unpublish Helpdesk Locale Article
   * @memberof WebsiteConversation
   * @public
   * @method unpublishHelpdeskLocaleArticle
   * @param {string} websiteID
   * @param {string} locale
   * @param {string} articleId
   * @return {Promise}
   */
  service.unpublishHelpdeskLocaleArticle = function(
    websiteID, locale, articleId
  ) {
    return crisp.post(
      crisp._prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale, "article",
           articleId, "unpublish"
      ])
    );
  };

  /**
   * List Helpdesk Locale Categories
   * @memberof WebsiteConversation
   * @public
   * @method listHelpdeskLocaleCategories
   * @param {string} websiteID
   * @param {string} locale
   * @param {number} pageNumber
   * @return {Promise}
   */
  service.listHelpdeskLocaleCategories = function(
    websiteID, locale, pageNumber
  ) {
    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale, "categories",
          pageNumber
      ])
    );
  };

  /**
   * Add Helpdesk Locale Category
   * @memberof WebsiteConversation
   * @public
   * @method addHelpdeskLocaleCategory
   * @param {string} websiteID
   * @param {string} locale
   * @param {string} name
   * @return {Promise}
   */
  service.addHelpdeskLocaleCategory = function(websiteID, locale, name) {
    return crisp.post(
      crisp._prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale, "category"
      ]),

      null,

      {
        name : name
      }
    );
  };

  /**
   * Check If Helpdesk Locale Category Exists
   * @memberof WebsiteConversation
   * @public
   * @method checkHelpdeskLocaleCategoryExists
   * @param {string} websiteID
   * @param {string} locale
   * @param {string} categoryId
   * @return {Promise}
   */
  service.checkHelpdeskLocaleCategoryExists = function(
    websiteID, locale, categoryId
  ) {
    return crisp.head(
      crisp._prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale, "category",
          categoryId
      ])
    );
  };

  /**
   * Resolve Helpdesk Locale Category
   * @memberof WebsiteConversation
   * @public
   * @method resolveHelpdeskLocaleCategory
   * @param {string} websiteID
   * @param {string} locale
   * @param {string} categoryId
   * @return {Promise}
   */
  service.resolveHelpdeskLocaleCategory = function(
    websiteID, locale, categoryId
  ) {
    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale, "category",
          categoryId
      ])
    );
  };

  /**
   * Save Helpdesk Locale Category
   * @memberof WebsiteConversation
   * @public
   * @method saveHelpdeskLocaleCategory
   * @param {string} websiteID
   * @param {string} locale
   * @param {string} categoryId
   * @param {object} category
   * @return {Promise}
   */
  service.saveHelpdeskLocaleCategory = function(
    websiteID, locale, categoryId, category
  ) {
    return crisp.put(
      crisp._prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale, "category",
          categoryId
      ]),

      null, category
    );
  };
  /**
   * Update Helpdesk Locale Category
   * @memberof WebsiteConversation
   * @public
   * @method updateHelpdeskLocaleCategory
   * @param {string} websiteID
   * @param {string} locale
   * @param {string} categoryId
   * @param {object} category
   * @return {Promise}
   */
  service.updateHelpdeskLocaleCategory = function(
    websiteID, locale, categoryId, category
  ) {
    return crisp.patch(
      crisp._prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale, "category",
          categoryId
      ]),

      null, category
    );
  };

  /**
   * Delete Helpdesk Locale Category
   * @memberof WebsiteConversation
   * @public
   * @method deleteHelpdeskLocaleCategory
   * @param {string} websiteID
   * @param {string} locale
   * @param {string} categoryId
   * @return {Promise}
   */
  service.deleteHelpdeskLocaleCategory = function(
    websiteID, locale, categoryId
  ) {
    return crisp.delete(
      crisp._prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale, "category",
          categoryId
      ])
    );
  };

  /**
   * List Helpdesk Locale Sections
   * @memberof WebsiteConversation
   * @public
   * @method listHelpdeskLocaleSections
   * @param {string} websiteID
   * @param {string} locale
   * @param {string} categoryId
   * @param {number} pageNumber
   * @return {Promise}
   */
  service.listHelpdeskLocaleSections = function(
    websiteID, locale, categoryId, pageNumber
  ) {
    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale, "category",
          categoryId, "sections", pageNumber
      ])
    );
  };

  /**
   * Add Helpdesk Locale Section
   * @memberof WebsiteConversation
   * @public
   * @method addHelpdeskLocaleSection
   * @param {string} websiteID
   * @param {string} locale
   * @param {string} categoryId
   * @param {string} name
   * @return {Promise}
   */
  service.addHelpdeskLocaleSection = function(
    websiteID, locale, categoryId, name
  ) {
    return crisp.post(
      crisp._prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale, "category",
          categoryId, "section"
      ]),

      null,

      {
        name : name
      }
    );
  };

  /**
   * Check If Helpdesk Locale Section Exists
   * @memberof WebsiteConversation
   * @public
   * @method checkHelpdeskLocaleSectionExists
   * @param {string} websiteID
   * @param {string} locale
   * @param {string} categoryId
   * @param {string} sectionId
   * @return {Promise}
   */
  service.checkHelpdeskLocaleSectionExists = function(
    websiteID, locale, categoryId, sectionId
  ) {
    return crisp.head(
      crisp._prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale, "category",
          categoryId, "section", sectionId
      ])
    );
  };

  /**
   * Resolve Helpdesk Locale Section
   * @memberof WebsiteConversation
   * @public
   * @method resolveHelpdeskLocaleSection
   * @param {string} websiteID
   * @param {string} locale
   * @param {string} categoryId
   * @param {string} sectionId
   * @return {Promise}
   */
  service.resolveHelpdeskLocaleSection = function(
    websiteID, locale, categoryId, sectionId
  ) {
    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale, "category",
          categoryId, "section", sectionId
      ])
    );
  };

  /**
   * Save Helpdesk Locale Section
   * @memberof WebsiteConversation
   * @public
   * @method saveHelpdeskLocaleSection
   * @param {string} websiteID
   * @param {string} locale
   * @param {string} categoryId
   * @param {string} sectionId
   * @param {object} section
   * @return {Promise}
   */
  service.saveHelpdeskLocaleSection = function(
    websiteID, locale, categoryId, sectionId, section
  ) {
    return crisp.put(
      crisp._prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale, "category",
          categoryId, "section", sectionId
      ]),

      null, section
    );
  };

  /**
   * Update Helpdesk Locale Section
   * @memberof WebsiteConversation
   * @public
   * @method updateHelpdeskLocaleSection
   * @param {string} websiteID
   * @param {string} locale
   * @param {string} categoryId
   * @param {string} sectionId
   * @param {object} section
   * @return {Promise}
   */
  service.updateHelpdeskLocaleSection = function(
    websiteID, locale, categoryId, sectionId, section
  ) {
    return crisp.patch(
      crisp._prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale, "category",
          categoryId, "section", sectionId
      ]),

      null, section
    );
  };

  /**
   * Delete Helpdesk Locale Section
   * @memberof WebsiteConversation
   * @public
   * @method deleteHelpdeskLocaleSection
   * @param {string} websiteID
   * @param {string} locale
   * @param {string} categoryId
   * @param {string} sectionId
   * @return {Promise}
   */
  service.deleteHelpdeskLocaleSection = function(
    websiteID, locale, categoryId, sectionId
  ) {
    return crisp.delete(
      crisp._prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale, "category",
          categoryId, "section", sectionId
      ])
    );
  };

  /**
   * Map Helpdesk Locale Feedback Ratings
   * @memberof WebsiteConversation
   * @public
   * @method mapHelpdeskLocaleFeedbackRatings
   * @param {string} websiteID
   * @param {string} locale
   * @param {string} [filterDateStart]
   * @param {string} [filterDateEnd]
   * @return {Promise}
   */
  service.mapHelpdeskLocaleFeedbackRatings = function(
    websiteID, locale, filterDateStart, filterDateEnd
  ) {
    filterDateStart = (filterDateStart || null);
    filterDateEnd   = (filterDateEnd   || null);

    // Generate query
    var _query = {};

    if (filterDateStart !== null) {
      _query.filter_date_start = filterDateStart;
    }
    if (filterDateEnd !== null) {
      _query.filter_date_end = filterDateEnd;
    }

    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale, "feedback",
          "ratings"
      ]),

      _query
    );
  };
  /**
   * List Helpdesk Locale Feedbacks
   * @memberof WebsiteConversation
   * @public
   * @method listHelpdeskLocaleFeedbacks
   * @param {string} websiteID
   * @param {string} locale
   * @param {number} pageNumber
   * @param {string} [filterDateStart]
   * @param {string} [filterDateEnd]
   * @return {Promise}
   */
  service.listHelpdeskLocaleFeedbacks = function(
    websiteID, locale, pageNumber, filterDateStart, filterDateEnd
  ) {
    filterDateStart = (filterDateStart || null);
    filterDateEnd   = (filterDateEnd   || null);

    // Generate query
    var _query = {};

    if (filterDateStart !== null) {
      _query.filter_date_start = filterDateStart;
    }
    if (filterDateEnd !== null) {
      _query.filter_date_end = filterDateEnd;
    }

    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale, "feedback", "list",
          pageNumber
      ]),

      _query
    );
  };

  /**
   * Import External Helpdesk To Locale
   * @memberof WebsiteConversation
   * @public
   * @method importExternalHelpdeskToLocale
   * @param {string} websiteID
   * @param {string} locale
   * @param {string} helpdeskUrl
   * @return {Promise}
   */
  service.importExternalHelpdeskToLocale = function(
    websiteID, locale, helpdeskUrl
  ) {
    return crisp.post(
      crisp._prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale, "import"
      ]),

      null,

      {
        helpdesk_url : helpdeskUrl
      }
    );
  };

  /**
   * Export Helpdesk Locale Articles
   * @memberof WebsiteConversation
   * @public
   * @method exportHelpdeskLocaleArticles
   * @param {string} websiteID
   * @param {string} locale
   * @return {Promise}
   */
  service.exportHelpdeskLocaleArticles = function(websiteID, locale) {
    return crisp.post(
      crisp._prepareRestUrl([
        "website", websiteID, "helpdesk", "locale", locale, "export"
      ])
    );
  };

  /**
   * List Helpdesk Redirections
   * @memberof WebsiteConversation
   * @public
   * @method listHelpdeskRedirections
   * @param {string} websiteID
   * @param {number} pageNumber
   * @return {Promise}
   */
  service.listHelpdeskRedirections = function(websiteID, pageNumber) {
    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteID, "helpdesk", "redirections", pageNumber
      ])
    );
  };

  /**
   * Add Helpdesk Redirection
   * @memberof WebsiteConversation
   * @public
   * @method addHelpdeskRedirection
   * @param {string} websiteID
   * @param {string} redirectionPath
   * @param {string} redirectionTarget
   * @return {Promise}
   */
  service.addHelpdeskRedirection = function(
    websiteID, redirectionPath, redirectionTarget
  ) {
    return crisp.post(
      crisp._prepareRestUrl(["website", websiteID, "helpdesk", "redirection"]),

      null,

      {
        path   : redirectionPath,
        target : redirectionTarget
      }
    );
  };

  /**
   * Check If Helpdesk Redirection Exists
   * @memberof WebsiteConversation
   * @public
   * @method checkHelpdeskRedirectionExists
   * @param {string} websiteID
   * @param {string} redirectionId
   * @return {Promise}
   */
  service.checkHelpdeskRedirectionExists = function(websiteID, redirectionId) {
    return crisp.head(
      crisp._prepareRestUrl([
        "website", websiteID, "helpdesk", "redirection", redirectionId
      ])
    );
  };

  /**
   * Resolve Helpdesk Redirection
   * @memberof WebsiteConversation
   * @public
   * @method resolveHelpdeskRedirection
   * @param {string} websiteID
   * @param {string} redirectionId
   * @return {Promise}
   */
  service.resolveHelpdeskRedirection = function(websiteID, redirectionId) {
    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteID, "helpdesk", "redirection", redirectionId
      ])
    );
  };

  /**
   * Delete Helpdesk Redirection
   * @memberof WebsiteConversation
   * @public
   * @method deleteHelpdeskRedirection
   * @param {string} websiteID
   * @param {string} redirectionId
   * @return {Promise}
   */
  service.deleteHelpdeskRedirection = function(websiteID, redirectionId) {
    return crisp.delete(
      crisp._prepareRestUrl([
        "website", websiteID, "helpdesk", "redirection", redirectionId
      ])
    );
  };

  /**
   * Resolve Helpdesk Settings
   * @memberof WebsiteConversation
   * @public
   * @method resolveHelpdeskSettings
   * @param {string} websiteID
   * @return {Promise}
   */
  service.resolveHelpdeskSettings = function(websiteID) {
    return crisp.get(
      crisp._prepareRestUrl(["website", websiteID, "helpdesk", "settings"])
    );
  };

  /**
   * Save Helpdesk Settings
   * @memberof WebsiteConversation
   * @public
   * @method saveHelpdeskSettings
   * @param {string} websiteID
   * @param {object} settings
   * @return {Promise}
   */
  service.saveHelpdeskSettings = function(websiteID, settings) {
    return crisp.patch(
      crisp._prepareRestUrl(["website", websiteID, "helpdesk", "settings"]),

      null, settings
    );
  };

  /**
   * Resolve Helpdesk Domain
   * @memberof WebsiteConversation
   * @public
   * @method resolveHelpdeskDomain
   * @param {string} websiteID
   * @return {Promise}
   */
  service.resolveHelpdeskDomain = function(websiteID) {
    return crisp.get(
      crisp._prepareRestUrl(["website", websiteID, "helpdesk", "domain"])
    );
  };

  /**
   * Request Helpdesk Domain Change
   * @memberof WebsiteConversation
   * @public
   * @method requestHelpdeskDomainChange
   * @param {string} websiteID
   * @param {string} basic
   * @param {string} custom
   * @return {Promise}
   */
  service.requestHelpdeskDomainChange = function(websiteID, basic, custom) {
    // Generate body
    var _body = {};

    if (basic !== undefined) {
      _body.basic = basic;
    }
    if (custom !== undefined) {
      _body.custom = custom;
    }

    return crisp.patch(
      crisp._prepareRestUrl(["website", websiteID, "helpdesk", "domain"]),

      null, _body
    );
  };

  /**
   * Generate Helpdesk Domain Setup Flow
   * @memberof WebsiteConversation
   * @public
   * @method generateHelpdeskDomainSetupFlow
   * @param {string} websiteID
   * @param {string} [custom]
   * @return {Promise}
   */
  service.generateHelpdeskDomainSetupFlow = function(websiteID, custom) {
    custom = (custom || null);

    // Generate query
    var _query = {};

    if (custom !== null) {
      _query.custom = custom;
    }

    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteID, "helpdesk", "domain", "setup"
      ]),

      _query
    );
  };
}


module.exports = WebsiteHelpdesk;
