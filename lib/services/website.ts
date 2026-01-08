/*
 * This file is part of node-crisp-api
 *
 * Copyright (c) 2025 Crisp IM SAS
 * All rights belong to Crisp IM SAS
 */

/**************************************************************************
 * IMPORTS
 ***************************************************************************/

// PROJECT: RESOURCES
import WebsiteBase from "@/resources/WebsiteBase";
import WebsiteAnalytics from "@/resources/WebsiteAnalytics";
import WebsiteAvailability from "@/resources/WebsiteAvailability";
import WebsiteBatch from "@/resources/WebsiteBatch";
import WebsiteCampaign from "@/resources/WebsiteCampaign";
import WebsiteConversation from "@/resources/WebsiteConversation";
import WebsiteHelpdesk from "@/resources/WebsiteHelpdesk";
import WebsiteInbox from "@/resources/WebsiteInbox";
import WebsiteOperator from "@/resources/WebsiteOperator";
import WebsitePeople from "@/resources/WebsitePeople";
import WebsiteSettings from "@/resources/WebsiteSettings";
import WebsiteVerify from "@/resources/WebsiteVerify";
import WebsiteVisitors from "@/resources/WebsiteVisitors";

/**************************************************************************
 * CLASSES
 ***************************************************************************/

/**
 * Website Service
 */
class WebsiteService {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  public __resources: any[] = [
    WebsiteBase,
    WebsiteAnalytics,
    WebsiteAvailability,
    WebsiteBatch,
    WebsiteCampaign,
    WebsiteConversation,
    WebsiteHelpdesk,
    WebsiteInbox,
    WebsiteOperator,
    WebsitePeople,
    WebsiteSettings,
    WebsiteVerify,
    WebsiteVisitors
  ];
}

/**************************************************************************
 * EXPORTS
 ***************************************************************************/

export interface WebsiteServiceInterface extends
  WebsiteBase,
  WebsiteAnalytics,
  WebsiteAvailability,
  WebsiteBatch,
  WebsiteCampaign,
  WebsiteConversation,
  WebsiteHelpdesk,
  WebsiteInbox,
  WebsiteOperator,
  WebsitePeople,
  WebsiteSettings,
  WebsiteVerify,
  WebsiteVisitors {
}

export default WebsiteService;
