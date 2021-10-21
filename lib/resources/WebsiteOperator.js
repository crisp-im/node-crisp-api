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
  this.listWebsiteOperators = function(websiteID) {
    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteID, "operators", "list"
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
        "website", websiteID, "operators", "active"
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
        "website", websiteID, "operators", "active"
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
      crisp._prepareRestUrl(["website", websiteID, "operators", "email"]),

      null, emailData
    );
  };

  /**
   * Get A Website Operator
   * @memberof WebsiteOperator
   * @method getWebsiteOperator
   * @return Promise
   */
  this.getWebsiteOperator = function(websiteID, userID) {
    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteID, "operator", userID
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
   * @method changeOperatorMembership
   * @return Promise
   */
  this.changeOperatorMembership = function(websiteID, userID, role, title) {
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
   * @method unlinkOperatorFromWebsite
   * @return Promise
   */
  this.unlinkOperatorFromWebsite = function(websiteID, userID) {
    return crisp.delete(
      crisp._prepareRestUrl(["website", websiteID, "operator", userID])
    );
  };
}


module.exports = WebsiteOperator;

