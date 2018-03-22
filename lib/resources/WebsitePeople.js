/*
 * Bundle: Ressources / WebsitePeople
 * Project: Crisp - Node API
 * Author: Baptiste Jamin http://jamin.me/
 * Copyright: 2017, Crisp IM
 */

"use strict";

var rest = require("restler");
var Q    = require("q");

/**
 * Crisp WebsitePeople Ressource
 * @class
 * @classdesc This is the Crisp Website People Ressource
 */
function WebsitePeople(crisp) {
  /**
   * Find people profile by email
   * @memberof WebsitePeopleProfile
   * @method findByEmail
   * @param {string} websiteId
   * @param {string} email
   * @return Promise
   */
  this.findByEmail = function(websiteId, email) {
    return Q.Promise(function(resolve, reject) {
      var searchFilter = [{"model":"people","criterion":"email","operator":"eq","query":[email]}];
      rest.get(crisp._prepareRestUrl(["website", websiteId, "people", "profiles"]), {
        username : crisp.auth.identifier,
        password : crisp.auth.key,
        query: {
          search_filter: JSON.stringify(searchFilter)
        }
      })
        .on('success', function(response) {
          return resolve(response.data);
        })
        .on('error', function(error) {
          return reject(error);
        })
        .on('fail', function(error) {
          return reject(new Error(error.reason));
        });
    });
  };

  /**
   * Find one people profile by data
   * @memberof WebsitePeopleProfile
   * @method findByData
   * @param {string} websiteId
   * @param {Object} data
   * @return Promise
   */
  this.findByData = function(websiteId, data) {
    return Q.Promise(function(resolve, reject) {
      var searchFilter = [];
      var dataType = typeof data;
      if (!!value && type == "object") {
        for (var attr in data) {
          var searchCriteria = {"model":"people","criterion":"data."+attr,"operator":"eq","query":[data[attr]]};
          searchFilter.push(searchCriteria);
        }
      }
      rest.get(crisp._prepareRestUrl(["website", websiteId, "people", "profiles"]), {
        username : crisp.auth.identifier,
        password : crisp.auth.key,
        query: {
          search_filter: JSON.stringify(searchFilter),
          search_operator: "and"
        }
      })
        .on('success', function(response) {
          return resolve(response.data);
        })
        .on('error', function(error) {
          return reject(error);
        })
        .on('fail', function(error) {
          return reject(new Error(error.reason));
        });
    });
  };
  
  /**
   * Find people profiles by segments
   * @memberof WebsitePeopleProfile
   * @method findBySegments
   * @param {string} websiteId
   * @param {Object} segments
   * @return Promise
   */
  this.findBySegments = function(websiteId, segments) {
    return Q.Promise(function(resolve, reject) {
      var searchFilter = [];
      segments.forEach(function(segment) {
        var searchCriteria = {"model":"people","criterion":"segments","operator":"eq","query":[segment]};
        searchFilter.push(searchCriteria);
      });
      rest.get(crisp._prepareRestUrl(["website", websiteId, "people", "profiles"]), {
        username : crisp.auth.identifier,
        password : crisp.auth.key,
        query: {
          search_filter: JSON.stringify(searchFilter),
          search_operator: "and"
        }
      })
        .on('success', function(response) {
          return resolve(response.data);
        })
        .on('error', function(error) {
          return reject(error);
        })
        .on('fail', function(error) {
          return reject(new Error(error.reason));
        });
    });
  };

  /**
   * Create an new profile
   * @memberof WebsitePeople
   * @method get
   * @param {string} websiteId
   * @param {object} params
   * @return Promise
   */
  this.createNewPeopleProfile = function(websiteId, params) {
    return Q.Promise(function(resolve, reject) {

      rest.postJson(crisp._prepareRestUrl(["website", websiteId, "people", "profile"]),
      params,
      {
        username : crisp.auth.identifier,
        password : crisp.auth.key
      })
        .on('success', function(response) {
          return resolve(response.data);
        })
        .on('error', function(error) {
          return reject(error);
        })
        .on('fail', function(error) {
          return reject(new Error(error.reason));
        });
    });
  };

  /**
   * Check if a profile exists
   * @memberof WebsitePeople
   * @method get
   * @param {string} websiteId
   * @param {string} peopleId
   * @return Promise
   */
  this.checkPeopleProfileExists = function(websiteId, peopleId) {
    return Q.Promise(function(resolve, reject) {

      rest.head(crisp._prepareRestUrl(["website", websiteId, "people", peopleId]),
      {
        username : crisp.auth.identifier,
        password : crisp.auth.key
      })
        .on('success', function(response) {
          return resolve(response.data);
        })
        .on('error', function(error) {
          return reject(error);
        })
        .on('fail', function(error) {
          return reject(new Error(error.reason));
        });
    });
  };

  /**
   * Get a profile
   * @memberof WebsitePeople
   * @method get
   * @param {string} websiteId
   * @param {string} peopleId
   * @return Promise
   */
  this.getPeopleProfile = function(websiteId, peopleId) {
    return Q.Promise(function(resolve, reject) {

      rest.get(crisp._prepareRestUrl(["website", websiteId, "people", "profile", peopleId]),
      {
        username : crisp.auth.identifier,
        password : crisp.auth.key
      })
        .on('success', function(response) {
          return resolve(response.data);
        })
        .on('error', function(error) {
          return reject(error);
        })
        .on('fail', function(error) {
          return reject(new Error(error.reason));
        });
    });
  };

  /**
   * list people profiles
   * @memberof WebsitePeople
   * @method get
   * @param {string} websiteId
   * @param {string} peopleId
   * @return Promise
   */
  this.listPeopleProfiles = function(websiteId, page) {
    return Q.Promise(function(resolve, reject) {

      rest.get(crisp._prepareRestUrl(["website", websiteId, "people", "profiles", page]),
      {
        username : crisp.auth.identifier,
        password : crisp.auth.key
      })
        .on('success', function(response) {
          return resolve(response.data);
        })
        .on('error', function(error) {
          return reject(error);
        })
        .on('fail', function(error) {
          return reject(new Error(error.reason));
        });
    });
  };

  /**
   * Removes a profile
   * @memberof WebsitePeople
   * @method get
   * @param {string} websiteId
   * @param {string} peopleId
   * @return Promise
   */
  this.removePeopleProfile = function(websiteId, peopleId) {
    return Q.Promise(function(resolve, reject) {

      rest.del(crisp._prepareRestUrl(["website", websiteId, "people", "profile", peopleId]),
      {
        username : crisp.auth.identifier,
        password : crisp.auth.key
      })
        .on('success', function(response) {
          return resolve(response.data);
        })
        .on('error', function(error) {
          return reject(error);
        })
        .on('fail', function(error) {
          return reject(new Error(error.reason));
        });
    });
  };

  /**
   * Saves a profile
   * @memberof WebsitePeople
   * @method get
   * @param {string} websiteId
   * @param {string} peopleId
   * @param {object} data
   * @return Promise
   */
  this.savePeopleProfile = function(websiteId, peopleId, data) {
    return Q.Promise(function(resolve, reject) {

      rest.putJson(crisp._prepareRestUrl(["website", websiteId, "people", "profile", peopleId]),
      data,
      {
        username : crisp.auth.identifier,
        password : crisp.auth.key
      })
        .on('success', function(response) {
          return resolve(response.data);
        })
        .on('error', function(error) {
          return reject(error);
        })
        .on('fail', function(error) {
          return reject(new Error(error.reason));
        });
    });
  };

  /**
   * Saves a profile
   * @memberof WebsitePeople
   * @method get
   * @param {string} websiteId
   * @param {string} peopleId
   * @param {object} data
   * @return Promise
   */
  this.savePeopleProfile = function(websiteId, peopleId, data) {
    return Q.Promise(function(resolve, reject) {

      rest.putJson(crisp._prepareRestUrl(["website", websiteId, "people", "profile", peopleId]),
      data,
      {
        username : crisp.auth.identifier,
        password : crisp.auth.key
      })
        .on('success', function(response) {
          return resolve(response.data);
        })
        .on('error', function(error) {
          return reject(error);
        })
        .on('fail', function(error) {
          return reject(new Error(error.reason));
        });
    });
  };

  /**
   * Updates a profile
   * @memberof WebsitePeople
   * @method get
   * @param {string} websiteId
   * @param {string} peopleId
   * @param {object} data
   * @return Promise
   */
  this.updatePeopleProfile = function(websiteId, peopleId, data) {
    return Q.Promise(function(resolve, reject) {

      rest.patchJson(crisp._prepareRestUrl(["website", websiteId, "people", "profile", peopleId]),
      data,
      {
        username : crisp.auth.identifier,
        password : crisp.auth.key
      })
        .on('success', function(response) {
          return resolve(response.data);
        })
        .on('error', function(error) {
          return reject(error);
        })
        .on('fail', function(error) {
          return reject(new Error(error.reason));
        });
    });
  };

  /**
   * List people segments
   * @memberof WebsitePeople
   * @method get
   * @param {string} websiteId
   * @param {string} peopleId
   * @param {number} page
   * @return Promise
   */
  this.listPeopleSegments = function(websiteId, page) {
    return Q.Promise(function(resolve, reject) {

      rest.get(crisp._prepareRestUrl(["website", websiteId, "people", "segments", page]),
      {
        username : crisp.auth.identifier,
        password : crisp.auth.key
      })
        .on('success', function(response) {
          return resolve(response.data);
        })
        .on('error', function(error) {
          return reject(error);
        })
        .on('fail', function(error) {
          return reject(new Error(error.reason));
        });
    });
  };

  /**
   * List people segments
   * @memberof WebsitePeople
   * @method get
   * @param {string} websiteId
   * @param {string} peopleId
   * @param {object} data
   * @return Promise
   */
  this.listPeopleSegments = function(websiteId, page) {
    return Q.Promise(function(resolve, reject) {

      rest.get(crisp._prepareRestUrl(["website", websiteId, "people", "segments", page]),
      {
        username : crisp.auth.identifier,
        password : crisp.auth.key
      })
        .on('success', function(response) {
          return resolve(response.data);
        })
        .on('error', function(error) {
          return reject(error);
        })
        .on('fail', function(error) {
          return reject(new Error(error.reason));
        });
    });
  };

  /**
   * List people conversations
   * @memberof WebsitePeople
   * @method get
   * @param {string} websiteId
   * @param {string} peopleId
   * @param {number} page
   * @return Promise
   */
  this.listPeopleConversations = function(websiteId, peopleId, page) {
    return Q.Promise(function(resolve, reject) {

      rest.get(crisp._prepareRestUrl(["website", websiteId, "people", "conversation", peopleId, "list", page]),
      {
        username : crisp.auth.identifier,
        password : crisp.auth.key
      })
        .on('success', function(response) {
          return resolve(response.data);
        })
        .on('error', function(error) {
          return reject(error);
        })
        .on('fail', function(error) {
          return reject(new Error(error.reason));
        });
    });
  };

  /**
   * Add an event
   * @memberof WebsitePeople
   * @method get
   * @param {string} websiteId
   * @param {string} peopleId
   * @param {object} event
   * @return Promise
   */
  this.addPeopleEvent = function(websiteId, peopleId, event) {
    return Q.Promise(function(resolve, reject) {

      rest.postJson(crisp._prepareRestUrl(["website", websiteId, "people", "events", peopleId]),
      event,
      {
        username : crisp.auth.identifier,
        password : crisp.auth.key
      })
        .on('success', function(response) {
          return resolve(response.data);
        })
        .on('error', function(error) {
          return reject(error);
        })
        .on('fail', function(error) {
          return reject(new Error(error.reason));
        });
    });
  };

  /**
   * List people events
   * @memberof WebsitePeople
   * @method get
   * @param {string} websiteId
   * @param {string} peopleId
   * @param {number} page
   * @return Promise
   */
  this.listPeopleEvent = function(websiteId, peopleId, page) {
    return Q.Promise(function(resolve, reject) {

      rest.get(crisp._prepareRestUrl(["website", websiteId, "people", "events", peopleId, "list", page]),
      {
        username : crisp.auth.identifier,
        password : crisp.auth.key
      })
        .on('success', function(response) {
          return resolve(response.data);
        })
        .on('error', function(error) {
          return reject(error);
        })
        .on('fail', function(error) {
          return reject(new Error(error.reason));
        });
    });
  };

  /**
   * Get people data
   * @memberof WebsitePeople
   * @method get
   * @param {string} websiteId
   * @param {string} peopleId
   * @return Promise
   */
  this.getPeopleData = function(websiteId, peopleId) {
    return Q.Promise(function(resolve, reject) {

      rest.get(crisp._prepareRestUrl(["website", websiteId, "people", "data", peopleId]),
      {
        username : crisp.auth.identifier,
        password : crisp.auth.key
      })
        .on('success', function(response) {
          return resolve(response.data);
        })
        .on('error', function(error) {
          return reject(error);
        })
        .on('fail', function(error) {
          return reject(new Error(error.reason));
        });
    });
  };

  /**
   * Update people data
   * @memberof WebsitePeople
   * @method get
   * @param {string} websiteId
   * @param {string} peopleId
   * @return Promise
   */
  this.updatePeopleData = function(websiteId, peopleId, data) {
    return Q.Promise(function(resolve, reject) {

      rest.putJson(crisp._prepareRestUrl(["website", websiteId, "people", "data", peopleId]),
      data,
      {
        username : crisp.auth.identifier,
        password : crisp.auth.key
      })
        .on('success', function(response) {
          return resolve(response.data);
        })
        .on('error', function(error) {
          return reject(error);
        })
        .on('fail', function(error) {
          return reject(new Error(error.reason));
        });
    });
  };
}

module.exports = WebsitePeople;
