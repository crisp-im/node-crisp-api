/*
 * node-crisp-api
 *
 * Copyright 2022, Crisp IM SAS
 * Author: Baptiste Jamin <baptiste@crisp.chat>
 */


"use strict";


/**
 * Crisp WebsitePeople Resource
 * @class
 * @classdesc This is the Crisp Website People Resource
 */
function WebsitePeople(service, crisp) {
  /**
   * Get People Statistics
   * @memberof WebsitePeople
   * @method getPeopleStatistics
   * @param {string} websiteID
   * @return {Promise}
   */
  service.getPeopleStatistics = function(websiteID) {
    return crisp.get(
      crisp._prepareRestUrl(["website", websiteID, "people", "stats"])
    );
  };

  /**
   * List Suggested People Segments
   * @memberof WebsitePeople
   * @method listSuggestedPeopleSegments
   * @param {string} websiteID
   * @param {number} pageNumber
   * @return {Promise}
   */
  service.listSuggestedPeopleSegments = function(websiteID, pageNumber) {
    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteID, "people", "suggest", "segments", pageNumber
      ])
    );
  };

  /**
   * Delete Suggested People Segment
   * @memberof WebsitePeople
   * @method deleteSuggestedPeopleSegment
   * @param {string} websiteID
   * @param {string} segment
   * @return {Promise}
   */
  service.deleteSuggestedPeopleSegment = function(websiteID, segment) {
    return crisp.delete(
      crisp._prepareRestUrl([
        "website", websiteID, "people", "suggest", "segment"
      ]),

      null,

      {
        segment : segment
      }
    );
  };

  /**
   * List Suggested People Data Keys
   * @memberof WebsitePeople
   * @method listSuggestedPeopleDataKeys
   * @param {string} websiteID
   * @param {number} pageNumber
   * @return {Promise}
   */
  service.listSuggestedPeopleDataKeys = function(websiteID, pageNumber) {
    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteID, "people", "suggest", "data", pageNumber
      ])
    );
  };

  /**
   * Delete Suggested People Data Key
   * @memberof WebsitePeople
   * @method deleteSuggestedPeopleDataKey
   * @param {string} websiteID
   * @param {string} key
   * @return {Promise}
   */
  service.deleteSuggestedPeopleDataKey = function(websiteID, key) {
    return crisp.delete(
      crisp._prepareRestUrl([
        "website", websiteID, "people", "suggest", "data"
      ]),

      null,

      {
        key : key
      }
    );
  };

  /**
   * List Suggested People Events
   * @memberof WebsitePeople
   * @method listSuggestedPeopleEvents
   * @param {string} websiteID
   * @param {number} pageNumber
   * @return {Promise}
   */
  service.listSuggestedPeopleEvents = function(websiteID, pageNumber) {
    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteID, "people", "suggest", "events", pageNumber
      ])
    );
  };

  /**
   * Delete Suggested People Event
   * @memberof WebsitePeople
   * @method deleteSuggestedPeopleEvent
   * @param {string} websiteID
   * @param {string} text
   * @return {Promise}
   */
  service.deleteSuggestedPeopleEvent = function(websiteID, text) {
    return crisp.delete(
      crisp._prepareRestUrl([
        "website", websiteID, "people", "suggest", "event"
      ]),

      null,

      {
        text : text
      }
    );
  };

  /**
   * List People Profiles
   * @memberof WebsitePeople
   * @method listPeopleProfiles
   * @param {string} websiteID
   * @param {number} pageNumber
   * @param {string} [searchField]
   * @param {string} [searchOrder]
   * @param {string} [searchOperator]
   * @param {string} [searchFilter]
   * @param {string} [searchText]
   * @return {Promise}
   */
  service.listPeopleProfiles = function(
    websiteID, pageNumber, searchField, searchOrder, searchOperator,
      searchFilter, searchText
  ) {
    // Generate query
    var _query = {};

    if (searchField) {
      _query.sort_field = searchField;
    }
    if (searchOrder) {
      _query.sort_order = searchOrder;
    }
    if (searchOperator) {
      _query.search_operator = searchOperator;
    }
    if (searchFilter) {
      _query.search_filter = searchFilter;
    }
    if (searchText) {
      _query.search_text = searchText;
    }

    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteID, "people", "profiles", pageNumber
      ]),

      _query
    );
  };

  /**
   * Add New People Profile
   * @memberof WebsitePeople
   * @method addNewPeopleProfile
   * @param {string} websiteID
   * @param {object} profile
   * @return {Promise}
   */
  service.addNewPeopleProfile = function(websiteID, profile) {
    return crisp.post(
      crisp._prepareRestUrl(["website", websiteID, "people", "profile"]),

      null, profile
    );
  };

  /**
   * Check If People Profile Exists
   * @memberof WebsitePeople
   * @method checkPeopleProfileExists
   * @param {string} websiteID
   * @param {string} peopleID
   * @return {Promise}
   */
  service.checkPeopleProfileExists = function(websiteID, peopleID) {
    return crisp.head(
      crisp._prepareRestUrl([
        "website", websiteID, "people", "profile", peopleID
      ])
    );
  };

  /**
   * Save People Profile
   * @memberof WebsitePeople
   * @method getPeopleProfile
   * @param {string} websiteID
   * @param {string} peopleID
   * @return {Promise}
   */
  service.getPeopleProfile = function(websiteID, peopleID) {
    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteID, "people", "profile", peopleID
      ])
    );
  };

  /**
   * Get People Profile
   * @memberof WebsitePeople
   * @method savePeopleProfile
   * @param {string} websiteID
   * @param {string} peopleID
   * @param {object} profile
   * @return {Promise}
   */
  service.savePeopleProfile = function(websiteID, peopleID, profile) {
    return crisp.put(
      crisp._prepareRestUrl([
        "website", websiteID, "people", "profile", peopleID
      ]),

      null, profile
    );
  };

  /**
   * Update People Profile
   * @memberof WebsitePeople
   * @method updatePeopleProfile
   * @param {string} websiteID
   * @param {string} peopleID
   * @param {object} profile
   * @return {Promise}
   */
  service.updatePeopleProfile = function(websiteID, peopleID, profile) {
    return crisp.patch(
      crisp._prepareRestUrl([
        "website", websiteID, "people", "profile", peopleID
      ]),

      null, profile
    );
  };

  /**
   * Remove People Profile
   * @memberof WebsitePeople
   * @method removePeopleProfile
   * @param {string} websiteID
   * @param {string} peopleID
   * @return {Promise}
   */
  service.removePeopleProfile = function(websiteID, peopleID) {
    return crisp.delete(
      crisp._prepareRestUrl([
        "website", websiteID, "people", "profile", peopleID
      ])
    );
  };

  /**
   * List People Conversations
   * @memberof WebsitePeople
   * @method listPeopleConversations
   * @param {string} websiteID
   * @param {string} peopleID
   * @param {number} pageNumber
   * @return {Promise}
   */
  service.listPeopleConversations = function(websiteID, peopleID, pageNumber) {
    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteID, "people", "conversations", peopleID, "list",
          pageNumber
      ])
    );
  };

  /**
   * List People Campaigns
   * @memberof WebsitePeople
   * @method listPeopleCampaigns
   * @param {string} websiteID
   * @param {string} peopleID
   * @param {number} pageNumber
   * @return {Promise}
   */
  service.listPeopleCampaigns = function(websiteID, peopleID, pageNumber) {
    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteID, "people", "campaigns", peopleID, "list",
          pageNumber
      ])
    );
  };

  /**
   * Add A People Event
   * @memberof WebsitePeople
   * @method addPeopleEvent
   * @param {string} websiteID
   * @param {string} peopleID
   * @param {object} peopleEvent
   * @return {Promise}
   */
  service.addPeopleEvent = function(websiteID, peopleID, peopleEvent) {
    return crisp.post(
      crisp._prepareRestUrl([
        "website", websiteID, "people", "events", peopleID
      ]),

      null, peopleEvent
    );
  };

  /**
   * List People Events
   * @memberof WebsitePeople
   * @method listPeopleEvents
   * @param {string} websiteID
   * @param {string} peopleID
   * @param {number} pageNumber
   * @return {Promise}
   */
  service.listPeopleEvents = function(websiteID, peopleID, pageNumber) {
    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteID, "people", "events", peopleID, "list",
          pageNumber
      ])
    );
  };

  /**
   * Get People Data
   * @memberof WebsitePeople
   * @method getPeopleData
   * @param {string} websiteID
   * @param {string} peopleID
   * @return {Promise}
   */
  service.getPeopleData = function(websiteID, peopleID) {
    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteID, "people", "data", peopleID
      ])
    );
  };

  /**
   * Save People Data
   * @memberof WebsitePeople
   * @method savePeopleData
   * @param {string} websiteID
   * @param {string} peopleID
   * @param {object} peopleData
   * @return {Promise}
   */
  service.savePeopleData = function(websiteID, peopleID, peopleData) {
    return crisp.put(
      crisp._prepareRestUrl([
        "website", websiteID, "people", "data", peopleID
      ]),

      null, peopleData
    );
  };

  /**
   * Update People Data
   * @memberof WebsitePeople
   * @method updatePeopleData
   * @param {string} websiteID
   * @param {string} peopleID
   * @param {object} peopleData
   * @return {Promise}
   */
  service.updatePeopleData = function(websiteID, peopleID, peopleData) {
    return crisp.patch(
      crisp._prepareRestUrl([
        "website", websiteID, "people", "data", peopleID
      ]),

      null, peopleData
    );
  };

  /**
   * Get People Subscription Status
   * @memberof WebsitePeople
   * @method getPeopleSubscriptionStatus
   * @param {string} websiteID
   * @param {string} peopleID
   * @return {Promise}
   */
  service.getPeopleSubscriptionStatus = function(websiteID, peopleID) {
    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteID, "people", "subscription", peopleID
      ])
    );
  };

  /**
   * Update People Subscription Status
   * @memberof WebsitePeople
   * @method updatePeopleSubscriptionStatus
   * @param {string} websiteID
   * @param {string} peopleID
   * @param {object} peopleSubscription
   * @return {Promise}
   */
  service.updatePeopleSubscriptionStatus = function(
    websiteID, peopleID, peopleSubscription
  ) {
    return crisp.patch(
      crisp._prepareRestUrl([
        "website", websiteID, "people", "subscription", peopleID
      ]),

      null, peopleSubscription
    );
  };

  /**
   * Export People Profiles
   * @memberof WebsitePeople
   * @method exportPeopleProfiles
   * @param {string} websiteID
   * @return {Promise}
   */
  service.exportPeopleProfiles = function(websiteID) {
    return crisp.post(
      crisp._prepareRestUrl([
        "website", websiteID, "people", "export", "profiles"
      ])
    );
  };

  /**
   * Import People Profiles
   * @memberof WebsitePeople
   * @method importPeopleProfiles
   * @param {string} websiteID
   * @param {object} importSetup
   * @return {Promise}
   */
  service.importPeopleProfiles = function(websiteID, importSetup) {
    return crisp.post(
      crisp._prepareRestUrl([
        "website", websiteID, "people", "import", "profiles"
      ]),

      null, importSetup
    );
  };
}


module.exports = WebsitePeople;
