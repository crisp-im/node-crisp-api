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

/**************************************************************************
 * CLASSES
 ***************************************************************************/

/**
 * Crisp PlanSubscription Resource
 */
class PlanSubscriptionService extends BaseResource {
  /**
   * Get Plan Subscription For A Website
   */
  getPlanSubscriptionForWebsite(websiteID: string): Promise<PlanSubscription> {
    return this.crisp.get(
      this.crisp.prepareRestUrl(["plans", "subscription", websiteID])
    );
  };
}

/**************************************************************************
 * EXPORTS
 ***************************************************************************/

export default PlanSubscriptionService;
