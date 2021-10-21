/*
 * node-crisp-api
 *
 * Copyright 2021, Crisp IM SARL
 * Author: Baptiste Jamin <baptiste@crisp.chat>
 */


"use strict";


/**
 * Crisp WebsiteOperator Resource
 * @class
 * @classdesc This is the Crisp Operator Resource
 */
function WebsiteOperator(crisp) {
  /**
   * List Website Operators
   * @memberof WebsiteOperator
   * @method listWebsiteOperators
   * @return Promise
   */
  this.listWebsiteOperators = function(websiteId) {
    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteId, "operators", "list"
      ])
    );
  };

  /**
   * List Last Active Website Operators
   * @memberof WebsiteOperator
   * @method listLastActiveWebsiteOperators
   * @return Promise
   */
  this.listLastActiveWebsiteOperators = function(websiteID) {
    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteId, "operators", "active"
      ])
    );
  };

  /**
   * Flush Last Active Website Operators
   * @memberof WebsiteOperator
   * @method flushLastActiveWebsiteOperators
   * @return Promise
   */
  this.flushLastActiveWebsiteOperators = function(websiteID) {
    return crisp.delete(
      crisp._prepareRestUrl([
        "website", websiteId, "operators", "active"
      ])
    );
  };

  /**
   * Send Email To Website Operators
   * @memberof WebsiteOperator
   * @method sendEmailToWebsiteOperators
   * @return Promise
   */
  this.sendEmailToWebsiteOperators = function(websiteID, emailData) {
    return crisp.post(
      crisp._prepareRestUrl(["website", websiteId, "operators", "email"]),

      {}, emailData
    );
  };

  /**
   * Get A Website Operator
   * @memberof WebsiteOperator
   * @method getWebsiteOperator
   * @return Promise
   */
  this.getWebsiteOperator = function(websiteId, userId) {
    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteId, "operator", userId
      ])
    );
  };

  /**
   * Invite A Website Operator
   * @memberof WebsiteOperator
   * @method inviteWebsiteOperator
   * @return Promise
   */
  this.inviteWebsiteOperator = function(websiteID, email, role, verify) {
    return crisp.post(
      crisp._prepareRestUrl(["website", websiteId, "operator"]),

      {},

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
   * @method changeOperatorMembership
   * @return Promise
   */
  this.changeOperatorMembership = function(websiteID, userID, role, title) {
    return crisp.patch(
      crisp._prepareRestUrl(["website", websiteId, "operator", userID]),

      {},

      {
        role  : role,
        title : title
      }
    );
  };

  /**
   * Unlink Operator From Website
   * @memberof WebsiteOperator
   * @method unlinkOperatorFromWebsite
   * @return Promise
   */
  this.unlinkOperatorFromWebsite = function(websiteID, userID) {
    return crisp.delete(
      crisp._prepareRestUrl(["website", websiteId, "operator", userID])
    );
  };
}


module.exports = WebsiteOperator;

