/*
 * This file is part of node-crisp-api
 *
 * Copyright (c) 2026 Crisp IM SAS
 * All rights belong to Crisp IM SAS
 */

/**************************************************************************
 * IMPORTS
 ***************************************************************************/

// PROJECT: RESOURCES
import BaseResource from "./BaseResource";

/**************************************************************************
 * TYPES
 ***************************************************************************/

export type PlanSubscription = {
  id?: string;
  name?: string;
  price?: number;
  since?: string;
  trialing?: boolean;
  trial_end?: string;
  trial_end_date?: string;
  bill_period?: PlanSubscriptionBillPeriod;
  bill_valid_until?: string;
  active?: boolean;
  sandbox?: boolean;
  website?: PlanSubscriptionWebsite;
  coupon_redeemed?: boolean;
  card_id?: string;
  owner?: PlanSubscriptionOwner;
}

export type PlanSubscriptionBillPeriod = "monthly" | "yearly";

export type PlanSubscriptionWebsite = {
  id?: string;
  name?: string;
  domain?: string;
  logo?: string;
}

export type PlanSubscriptionOwner = {
  user_id?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
}

export type PlanSubscriptionCoupon = {
  code?: string;
  policy?: PlanSubscriptionCouponPolicy;
  redeem_limit?: number;
  expire_at?: string;
}

export type PlanSubscriptionCouponPolicy = {
  rebate_percent?: number;
  trial_days?: number;
}

/**************************************************************************
 * CLASSES
 ***************************************************************************/

/**
 * Crisp PlanSubscription Resource
 */
class PlanSubscriptionService extends BaseResource {
  /**
   * List All Active Plan Subscriptions
   */
  listAllActiveSubscriptions(): Promise<PlanSubscription[]> {
    return this.crisp.get(
      this.crisp.prepareRestUrl(["plans", "subscription"])
    );
  };

  /**
   * Get Plan Subscription For A Website
   */
  getPlanSubscriptionForWebsite(websiteID: string): Promise<PlanSubscription> {
    return this.crisp.get(
      this.crisp.prepareRestUrl(["plans", "subscription", websiteID])
    );
  };

  /**
   * Subscribe Website To Plan
   */
  subscribeWebsiteToPlan(websiteID: string, planID: string) {
    return this.crisp.post(
      this.crisp.prepareRestUrl(["plans", "subscription", websiteID]),

      null,

      {
        plan_id: planID
      }
    );
  };

  /**
   * Unsubscribe Plan From Website
   */
  unsubscribePlanFromWebsite(websiteID: string) {
    return this.crisp.delete(
      this.crisp.prepareRestUrl(["plans", "subscription", websiteID])
    );
  };

  /**
   * Change Bill Period For Website Plan Subscription
   */
  changeBillPeriodForWebsitePlanSubscription(
    websiteID: string,
    period: PlanSubscriptionBillPeriod
  ) {
    return this.crisp.patch(
      this.crisp.prepareRestUrl([
        "plans", "subscription", websiteID, "bill", "period"
      ]),

      null,

      {
        period
      }
    );
  };

  /**
   * Check Coupon Availability For Website Plan Subscription
   */
  checkCouponAvailabilityForWebsitePlanSubscription(
    websiteID: string,
    code: string
  ): Promise<PlanSubscriptionCoupon> {
    return this.crisp.get(
      this.crisp.prepareRestUrl(["plans", "subscription", websiteID, "coupon"]),

      {
        code
      }
    );
  };

  /**
   * Redeem Coupon For Website Plan Subscription
   */
  redeemCouponForWebsitePlanSubscription(websiteID: string, code: string) {
    return this.crisp.patch(
      this.crisp.prepareRestUrl(["plans", "subscription", websiteID, "coupon"]),

      null,

      {
        code
      }
    );
  };
}

/**************************************************************************
 * EXPORTS
 ***************************************************************************/

export default PlanSubscriptionService;
