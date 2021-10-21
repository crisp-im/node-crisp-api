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
   * Find people profile by email
   * @memberof WebsitePeopleProfile
   * @method findByEmail
   * @return Promise
   */
  this.findByEmail = function(websiteId, email) {
    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteId, "people", "profile", email
      ]),

      {}
    );
  };


  /**
   * Find people profiles given search text
   * @memberof WebsitePeopleProfile
   * @method findWithSearchText
   * @return Promise
   */
  this.findWithSearchText = function(websiteId, searchText) {
    var query = {
      search_text: searchText
    };

    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteId, "people", "profiles"
      ]),

      query
    );
  };

  /**
   * Create an new profile
   * @memberof WebsitePeople
   * @method createNewPeopleProfile
   * @return Promise
   */
  this.createNewPeopleProfile = function(websiteId, params) {
    return crisp.post(
      crisp._prepareRestUrl([
        "website", websiteId, "people", "profile"
      ]),

      {}, params
    );
  };

  /**
   * Check if a profile exists
   * @memberof WebsitePeople
   * @method checkPeopleProfileExists
   * @return Promise
   */
  this.checkPeopleProfileExists = function(websiteId, peopleId) {
    return crisp.head(
      crisp._prepareRestUrl([
        "website", websiteId, "people", "profile", peopleId
      ]),

      {}, {}
    );
  };

  /**
   * Get a profile
   * @memberof WebsitePeople
   * @method getPeopleProfile
   * @return Promise
   */
  this.getPeopleProfile = function(websiteId, peopleId) {
    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteId, "people", "profile", peopleId
      ]),

      {}
    );
  };

  /**
   * list people profiles
   * @memberof WebsitePeople
   * @method listPeopleProfiles
   * @return Promise
   */
  this.listPeopleProfiles = function(websiteId, page) {
    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteId, "people", "profiles", page
      ]),

      {}
    );
  };

  /**
   * Removes a profile
   * @memberof WebsitePeople
   * @method removePeopleProfile
   * @return Promise
   */
  this.removePeopleProfile = function(websiteId, peopleId) {
    return crisp.delete(
      crisp._prepareRestUrl([
        "website", websiteId, "people", "profile", peopleId
      ]),

      {}, {}
    );
  };

  /**
   * Saves a profile
   * @memberof WebsitePeople
   * @method savePeopleProfile
   * @return Promise
   */
  this.savePeopleProfile = function(websiteId, peopleId, data) {
    return crisp.put(
      crisp._prepareRestUrl([
        "website", websiteId, "people", "profile", peopleId
      ]),

      {}, data
    );
  };

  /**
   * Updates a profile
   * @memberof WebsitePeople
   * @method updatePeopleProfile
   * @return Promise
   */
  this.updatePeopleProfile = function(websiteId, peopleId, data) {
    return crisp.patch(
      crisp._prepareRestUrl([
        "website", websiteId, "people", "profile", peopleId
      ]),

      {}, data
    );
  };

  /**
   * List people segments
   * @memberof WebsitePeople
   * @method listPeopleSegments
   * @return Promise
   */
  this.listPeopleSegments = function(websiteId, page) {
    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteId, "people", "segments", page
      ]),

      {}
    );
  };

  /**
   * List people conversations
   * @memberof WebsitePeople
   * @method listPeopleConversations
   * @return Promise
   */
  this.listPeopleConversations = function(websiteId, peopleId, page) {
    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteId, "people", "conversations", peopleId, "list", page
      ]),

      {}
    );
  };

  /**
   * Add an event
   * @memberof WebsitePeople
   * @method addPeopleEvent
   * @return Promise
   */
  this.addPeopleEvent = function(websiteId, peopleId, event) {
    return crisp.post(
      crisp._prepareRestUrl([
        "website", websiteId, "people", "events", peopleId
      ]),

      {}, event
    );
  };

  /**
   * List people events
   * @memberof WebsitePeople
   * @method listPeopleEvent
   * @return Promise
   */
  this.listPeopleEvent = function(websiteId, peopleId, page) {
    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteId, "people", "events", peopleId, "list", page
      ]),

      {}
    );
  };

  /**
   * Get people data
   * @memberof WebsitePeople
   * @method getPeopleData
   * @return Promise
   */
  this.getPeopleData = function(websiteId, peopleId) {
    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteId, "people", "data", peopleId
      ]),

      {}
    );
  };

  /**
   * Update people data
   * @memberof WebsitePeople
   * @method updatePeopleData
   * @return Promise
   */
  this.updatePeopleData = function(websiteId, peopleId, data) {
    return crisp.put(
      crisp._prepareRestUrl([
        "website", websiteId, "people", "data", peopleId
      ]),

      {}, data
    );
  };

  /**
   * Get people subscription status
   * @memberof WebsitePeople
   * @method getPeopleSubscriptionStatus
   * @return Promise
   */
  this.getPeopleSubscriptionStatus = function(websiteId, peopleId) {
    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteId, "people", "subscription", peopleId
      ]),

      {}
    );
  }

  /**
   * Update people subscription status
   * @memberof WebsitePeople
   * @method updatePeopleSubscriptionStatus
   * @return Promise
   */
  this.updatePeopleSubscriptionStatus = function(websiteId, peopleId, data) {
    return crisp.patch(
      crisp._prepareRestUrl([
        "website", websiteId, "people", "subscription", peopleId
      ]),

      {}, data
    );
  }
}


module.exports = WebsitePeople;
