/*
 * node-crisp-api
 *
 * Copyright 2022, Crisp IM SAS
 * Author: Baptiste Jamin <baptiste@crisp.chat>
 */

import BaseResource from "./BaseResource";

export interface PeopleStatistics {
  total?: number;
}

export interface PeopleSuggestedSegment {
  segment?: string;
  count?: number;
}

export interface PeopleSuggestedDataKey {
  key?: string;
  count?: number;
}

export interface PeopleSuggestedEvent {
  text?: string;
  count?: number;
}

export interface PeopleProfile extends PeopleProfileCard {
  people_id?: string;
}

export interface PeopleProfileNew {
  people_id?: string;
}

export interface PeopleProfileCard {
  email?: string;
  person?: PeopleProfileCardPerson;
  company?: PeopleProfileCardCompany;
  segments?: string[];
  notepad?: string;
  active?: PeopleProfileCardActive;
  score?: number;
  created_at?: number;
  updated_at?: number;
}

export interface PeopleProfileUpdateCard {
  email?: string;
  person?: PeopleProfileCardPerson;
  company?: PeopleProfileCardCompany;
  segments?: string[];
  notepad?: string;
  active?: number;
}

export interface PeopleProfileCardPerson {
  nickname?: string;
  avatar?: string;
  gender?: string;
  phone?: string;
  address?: string;
  description?: string;
  website?: string;
  timezone?: number;
  profiles?: PeopleProfileCardPersonProfile[];
  employment?: PeopleProfileCardPersonEmployment;
  geolocation?: PeopleProfileCardGeolocation;
  locales?: string[];
}

export interface PeopleProfileCardPersonProfile {
  type?: string;
  handle?: string;
}

export interface PeopleProfileCardPersonEmployment {
  name?: string;
  domain?: string;
  title?: string;
  role?: string;
  seniority?: string;
}

export interface PeopleProfileCardCompany {
  name?: string;
  legal_name?: string;
  domain?: string;
  url?: string;
  description?: string;
  timezone?: number;
  phones?: string[];
  emails?: string[];
  geolocation?: PeopleProfileCardGeolocation;
  metrics?: PeopleProfileCardCompanyMetrics;
  tags?: string[];
}

export interface PeopleProfileCardCompanyMetrics {
  employees?: number;
  market_cap?: number;
  raised?: number;
  arr?: number;
}

export interface PeopleProfileCardGeolocation {
  country?: string;
  region?: string;
  city?: string;
  coordinates?: PeopleProfileCardGeolocationCoordinates;
}

export interface PeopleProfileCardGeolocationCoordinates {
  latitude?: number;
  longitude?: number;
}

export interface PeopleProfileCardActive {
  now?: boolean;
  last?: number;
}

export interface PeopleCampaign {
  campaign_id?: string;
  type?: string;
  name?: string;
  created_at?: number;
  updated_at?: number;
  dispatched_at?: number;
  occurred_at?: number;
  statistics?: string[];
}

export interface PeopleEvent {
  text?: string;
  data?: object;
  color?: string;
  timestamp?: number;
}

export interface PeopleData {
  data?: Record<string, any>;
}

export interface PeopleSubscription {
  email?: boolean;
}

export interface PeopleSubscriptionUpdate {
  email?: boolean;
}

export interface PeopleProfileImportSetup {
  url?: string;
  mapping?: PeopleProfileImportSetupMapping[];
  options?: PeopleProfileImportSetupOptions;
}

export interface PeopleProfileImportSetupMapping {
  column?: number;
  field?: string;
}

export interface PeopleProfileImportSetupOptions {
  column_separator?: string;
  skip_header?: boolean;
}


/**
 * Crisp WebsitePeople Resource
 * @class
 * @classdesc This is the Crisp Website People Resource
 */
class WebsitePeople extends BaseResource {
  /**
   * Get People Statistics
   */
  getPeopleStatistics(websiteID: string) : Promise<PeopleStatistics> {
    return this.crisp.get(
      this.crisp.prepareRestUrl(["website", websiteID, "people", "stats"])
    );
  };

  /**
   * List Suggested People Segments
   */
  listSuggestedPeopleSegments(websiteID: string, pageNumber: number) : Promise<PeopleSuggestedSegment[]> {
    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "people", "suggest", "segments", String(pageNumber)
      ])
    );
  };

  /**
   * Delete Suggested People Segment
   */
  deleteSuggestedPeopleSegment(websiteID: string, segment: string) {
    return this.crisp.delete(
      this.crisp.prepareRestUrl([
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
   */
  listSuggestedPeopleDataKeys(websiteID: string, pageNumber: number) : Promise<PeopleSuggestedDataKey[]> {
    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "people", "suggest", "data", String(pageNumber)
      ])
    );
  };

  /**
   * Delete Suggested People Data Key
   */
  deleteSuggestedPeopleDataKey(websiteID: string, key: string) {
    return this.crisp.delete(
      this.crisp.prepareRestUrl([
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
   */
  listSuggestedPeopleEvents(websiteID: string, pageNumber: number) : Promise<PeopleSuggestedEvent[]> {
    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "people", "suggest", "events", String(pageNumber)
      ])
    );
  };

  /**
   * Delete Suggested People Event
   */
  deleteSuggestedPeopleEvent(websiteID: string, text: string) {
    return this.crisp.delete(
      this.crisp.prepareRestUrl([
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
   */
  listPeopleProfiles(
    websiteID: string, pageNumber: number, searchField?: string, searchOrder?: string, searchOperator?: string,
      searchFilter?: string, searchText?: string
  ) : Promise<PeopleProfile[]> {
    // Generate query
    let query = {};

    if (searchField) {
      // @ts-ignore
      query.sort_field = searchField;
    }
    if (searchOrder) {
      // @ts-ignore
      query.sort_order = searchOrder;
    }
    if (searchOperator) {
      // @ts-ignore
      query.search_operator = searchOperator;
    }
    if (searchFilter) {
      // @ts-ignore
      query.search_filter = searchFilter;
    }
    if (searchText) {
      // @ts-ignore
      query.search_text = searchText;
    }

    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "people", "profiles", String(pageNumber)
      ]),

      query
    );
  };

  /**
   * Add New People Profile
   */
  addNewPeopleProfile(websiteID: string, profile: PeopleProfileUpdateCard) {
    return this.crisp.post(
      this.crisp.prepareRestUrl(["website", websiteID, "people", "profile"]),

      null, profile
    );
  };

  /**
   * Check If People Profile Exists
   */
  checkPeopleProfileExists(websiteID: string, peopleID: string) {
    return this.crisp.head(
      this.crisp.prepareRestUrl([
        "website", websiteID, "people", "profile", peopleID
      ])
    );
  };

  /**
   * Save People Profile
   */
  getPeopleProfile(websiteID: string, peopleID: string) {
    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "people", "profile", peopleID
      ])
    );
  };

  /**
   * Get People Profile
   */
  savePeopleProfile(websiteID: string, peopleID: string, profile: PeopleProfileUpdateCard) {
    return this.crisp.put(
      this.crisp.prepareRestUrl([
        "website", websiteID, "people", "profile", peopleID
      ]),

      null, profile
    );
  };

  /**
   * Update People Profile
   */
  updatePeopleProfile(websiteID: string, peopleID: string, profile: PeopleProfileUpdateCard) {
    return this.crisp.patch(
      this.crisp.prepareRestUrl([
        "website", websiteID, "people", "profile", peopleID
      ]),

      null, profile
    );
  };

  /**
   * Remove People Profile
   */
  removePeopleProfile(websiteID: string, peopleID: string) {
    return this.crisp.delete(
      this.crisp.prepareRestUrl([
        "website", websiteID, "people", "profile", peopleID
      ])
    );
  };

  /**
   * List People Conversations
   */
  listPeopleConversations(websiteID: string, peopleID: string, pageNumber: number) : Promise<string[]> {
    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "people", "conversations", peopleID, "list",
          String(pageNumber)
      ])
    );
  };

  /**
   * List People Campaigns
   */
  listPeopleCampaigns(websiteID: string, peopleID: string, pageNumber: number) : Promise<PeopleCampaign[]> {
    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "people", "campaigns", peopleID, "list",
          String(pageNumber)
      ])
    );
  };

  /**
   * Add A People Event
   */
  addPeopleEvent(websiteID: string, peopleID: string, peopleEvent: PeopleEvent) {
    return this.crisp.post(
      this.crisp.prepareRestUrl([
        "website", websiteID, "people", "events", peopleID
      ]),

      null, peopleEvent
    );
  };

  /**
   * List People Events
   */
  listPeopleEvents(websiteID: string, peopleID: string, pageNumber: number) : Promise<PeopleEvent[]> {
    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "people", "events", peopleID, "list",
          String(pageNumber)
      ])
    );
  };

  /**
   * Get People Data
   */
  getPeopleData(websiteID: string, peopleID: string) : Promise<PeopleData> {
    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "people", "data", peopleID
      ])
    );
  };

  /**
   * Save People Data
   */
  savePeopleData(websiteID: string, peopleID: string, peopleData: Record<string, any>) {
    return this.crisp.put(
      this.crisp.prepareRestUrl([
        "website", websiteID, "people", "data", peopleID
      ]),

      null, peopleData
    );
  };

  /**
   * Update People Data
   */
  updatePeopleData(websiteID: string, peopleID: string, peopleData: Record<string, any>) {
    return this.crisp.patch(
      this.crisp.prepareRestUrl([
        "website", websiteID, "people", "data", peopleID
      ]),

      null, peopleData
    );
  };

  /**
   * Get People Subscription Status
   */
  getPeopleSubscriptionStatus(websiteID: string, peopleID: string) : Promise<PeopleSubscription> {
    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "people", "subscription", peopleID
      ])
    );
  };

  /**
   * Update People Subscription Status
   */
  updatePeopleSubscriptionStatus(
    websiteID: string, peopleID: string, peopleSubscription: PeopleSubscriptionUpdate
  ) {
    return this.crisp.patch(
      this.crisp.prepareRestUrl([
        "website", websiteID, "people", "subscription", peopleID
      ]),

      null, peopleSubscription
    );
  };

  /**
   * Export People Profiles
   */
  exportPeopleProfiles(websiteID: string) {
    return this.crisp.post(
      this.crisp.prepareRestUrl([
        "website", websiteID, "people", "export", "profiles"
      ]),

      null, null
    );
  };

  /**
   * Import People Profiles
   */
  importPeopleProfiles(websiteID: string, importSetup: PeopleProfileImportSetup) {
    return this.crisp.post(
      this.crisp.prepareRestUrl([
        "website", websiteID, "people", "import", "profiles"
      ]),

      null, importSetup
    );
  };
}

export default WebsitePeople;
