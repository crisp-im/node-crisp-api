/*
 * node-crisp-api
 *
 * Copyright 2022, Crisp IM SAS
 * Author: Baptiste Jamin <baptiste@crisp.chat>
 */


"use strict";


/**
 * Crisp WebsiteOperator Resource
 * @class
 * @classdesc This is the Crisp Operator Resource
 */
function WebsiteOperator(service, crisp) {
  /**
   * List Website Operators
   * @memberof WebsiteOperator
   * @public
   * @method listWebsiteOperators
   * @param {string} websiteID
   * @return {Promise}
   */
  service.listWebsiteOperators = function(websiteID) {
    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteID, "operators", "list"
      ])
    );
  };

  /**
   * List Last Active Website Operators
   * @memberof WebsiteOperator
   * @public
   * @method listLastActiveWebsiteOperators
   * @param {string} websiteID
   * @return {Promise}
   */
  service.listLastActiveWebsiteOperators = function(websiteID) {
    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteID, "operators", "active"
      ])
    );
  };

  /**
   * Flush Last Active Website Operators
   * @memberof WebsiteOperator
   * @public
   * @method flushLastActiveWebsiteOperators
   * @param {string} websiteID
   * @return {Promise}
   */
  service.flushLastActiveWebsiteOperators = function(websiteID) {
    return crisp.delete(
      crisp._prepareRestUrl([
        "website", websiteID, "operators", "active"
      ])
    );
  };

  /**
   * Send Email To Website Operators
   * @memberof WebsiteOperator
   * @public
   * @method sendEmailToWebsiteOperators
   * @param {string} websiteID
   * @param {object} emailData
   * @return {Promise}
   */
  service.sendEmailToWebsiteOperators = function(websiteID, emailData) {
    return crisp.post(
      crisp._prepareRestUrl(["website", websiteID, "operators", "email"]),

      null, emailData
    );
  };

  /**
   * Get A Website Operator
   * @memberof WebsiteOperator
   * @public
   * @method getWebsiteOperator
   * @param {string} websiteID
   * @param {string} userID
   * @return {Promise}
   */
  service.getWebsiteOperator = function(websiteID, userID) {
    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteID, "operator", userID
      ])
    );
  };

  /**
   * Invite A Website Operator
   * @memberof WebsiteOperator
   * @public
   * @method inviteWebsiteOperator
   * @param {string} websiteID
   * @param {string} email
   * @param {string} role
   * @param {string} verify
   * @return {Promise}
   */
  service.inviteWebsiteOperator = function(websiteID, email, role, verify) {
    return crisp.post(
      crisp._prepareRestUrl(["website", websiteID, "operator"]),

      null,

      {
        email  : email,
        role   : role,
        verify : verify
      }
    );
  };

  /**
   * Change Operator Membership
   * @memberof WebsiteOperator
   * @public
   * @method changeOperatorMembership
   * @param {string} websiteID
   * @param {string} userID
   * @param {string} role
   * @param {string} title
   * @return {Promise}
   */
  service.changeOperatorMembership = function(websiteID, userID, role, title) {
    return crisp.patch(
      crisp._prepareRestUrl(["website", websiteID, "operator", userID]),

      null,

      {
        role  : role,
        title : title
      }
    );
  };

  /**
   * Unlink Operator From Website
   * @memberof WebsiteOperator
   * @public
   * @method unlinkOperatorFromWebsite
   * @param {string} websiteID
   * @param {string} userID
   * @return {Promise}
   */
  service.unlinkOperatorFromWebsite = function(websiteID, userID) {
    return crisp.delete(
      crisp._prepareRestUrl(["website", websiteID, "operator", userID])
    );
  };
}


module.exports = WebsiteOperator;

