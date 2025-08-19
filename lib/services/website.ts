/*
 * node-crisp-api
 *
 * Copyright 2022, Crisp IM SAS
 * Author: Baptiste Jamin <baptiste@crisp.chat>
 */

import WebsiteBase from "@/resources/WebsiteBase";
import WebsiteAnalytics from "@/resources/WebsiteAnalytics";
import WebsiteAvailability from "@/resources/WebsiteAvailability";
import WebsiteBatch from "@/resources/WebsiteBatch";
import WebsiteCampaign from "@/resources/WebsiteCampaign";
import WebsiteConversation from "@/resources/WebsiteConversation";
import WebsiteOperator from "@/resources/WebsiteOperator";
import WebsitePeople from "@/resources/WebsitePeople";
import WebsiteHelpdesk from "@/resources/WebsiteHelpdesk";
import WebsiteSettings from "@/resources/WebsiteSettings";
import WebsiteVerify from "@/resources/WebsiteVerify";
import WebsiteVisitors from "@/resources/WebsiteVisitors";

class WebsiteService {
  public __resources: any[] = [
    WebsiteBase,
    WebsiteAnalytics,
    WebsiteAvailability,
    WebsiteBatch,
    WebsiteCampaign,
    WebsiteConversation,
    WebsiteOperator,
    WebsitePeople,
    WebsiteHelpdesk,
    WebsiteSettings,
    WebsiteVerify,
    WebsiteVisitors
  ];
}

export default WebsiteService;
