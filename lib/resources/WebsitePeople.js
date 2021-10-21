/*
 * node-crisp-api
 *
 * Copyright 2021, Crisp IM SARL
 * Author: Baptiste Jamin <baptiste@crisp.chat>
 */


"use strict";


/**
 * Crisp WebsitePeople Resource
 * @class
 * @classdesc This is the Crisp Website People Resource
 */
function WebsitePeople(crisp) {
  /**
   * Get People Statistics
   * @memberof WebsitePeople
   * @method getPeopleStatistics
   * @return Promise
   */
  this.getPeopleStatistics = function(websiteID) {
    return crisp.get(
      crisp._prepareRestUrl(["website", websiteID, "people", "stats"])
    );
  };

  /**
   * List Suggested People Segments
   * @memberof WebsitePeople
   * @method listSuggestedPeopleSegments
   * @return Promise
   */
  this.listSuggestedPeopleSegments = function(websiteID, pageNumber) {
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
   * @return Promise
   */
  this.deleteSuggestedPeopleSegment = function(websiteID, segment) {
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
   * @return Promise
   */
  this.listSuggestedPeopleDataKeys = function(websiteID, pageNumber) {
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
   * @return Promise
   */
  this.deleteSuggestedPeopleDataKey = function(websiteID, key) {
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
   * @return Promise
   */
  this.listSuggestedPeopleEvents = function(websiteID, pageNumber) {
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
   * @return Promise
   */
  this.deleteSuggestedPeopleEvent = function(websiteID, text) {
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
   * @return Promise
   */
  this.listPeopleProfiles = function(
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
   * @return Promise
   */
  this.addNewPeopleProfile = function(websiteID, profile) {
    return crisp.post(
      crisp._prepareRestUrl(["website", websiteID, "people", "profile"]),

      null, profile
    );
  };

  /**
   * Check If People Profile Exists
   * @memberof WebsitePeople
   * @method checkPeopleProfileExists
   * @return Promise
   */
  this.checkPeopleProfileExists = function(websiteID, peopleID) {
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
   * @return Promise
   */
  this.getPeopleProfile = function(websiteID, peopleID) {
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
   * @return Promise
   */
  this.savePeopleProfile = function(websiteID, peopleID, profile) {
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
   * @return Promise
   */
  this.updatePeopleProfile = function(websiteID, peopleID, profile) {
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
   * @return Promise
   */
  this.removePeopleProfile = function(websiteID, peopleID) {
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
   * @return Promise
   */
  this.listPeopleConversations = function(websiteID, peopleID, pageNumber) {
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
   * @return Promise
   */
  this.listPeopleCampaigns = function(websiteID, peopleID, pageNumber) {
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
   * @return Promise
   */
  this.addPeopleEvent = function(websiteID, peopleID, peopleEvent) {
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
   * @return Promise
   */
  this.listPeopleEvents = function(websiteID, peopleID, pageNumber) {
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
   * @return Promise
   */
  this.getPeopleData = function(websiteID, peopleID) {
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
   * @return Promise
   */
  this.savePeopleData = function(websiteID, peopleID, peopleData) {
    return crisp.put(
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
   * @return Promise
   */
  this.getPeopleSubscriptionStatus = function(websiteID, peopleID) {
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
   * @return Promise
   */
  this.updatePeopleSubscriptionStatus = function(
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
   * @return Promise
   */
  this.exportPeopleProfiles = function(websiteID) {
    return crisp.post(
      crisp._prepareRestUrl([
        "website", websiteID, "people", "export", "profiles"
      ]),

      null, {}
    );
  };

  /**
   * Import People Profiles
   * @memberof WebsitePeople
   * @method importPeopleProfiles
   * @return Promise
   */
  this.importPeopleProfiles = function(websiteID, importSetup) {
    return crisp.post(
      crisp._prepareRestUrl([
        "website", websiteID, "people", "import", "profiles"
      ]),

      null, importSetup
    );
  };
}


module.exports = WebsitePeople;
