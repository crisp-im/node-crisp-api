"use strict";
/*
 * node-crisp-api
 *
 * Copyright 2022, Crisp IM SAS
 * Author: Baptiste Jamin <baptiste@crisp.chat>
 */
Object.defineProperty(exports, "__esModule", { value: true });
class WebsiteService {
    constructor() {
        this.__resources = [
            "WebsiteBase",
            "WebsiteAnalytics",
            "WebsiteAvailability",
            "WebsiteBatch",
            "WebsiteCampaign",
            "WebsiteConversation",
            "WebsiteOperator",
            "WebsitePeople",
            "WebsiteHelpdesk",
            "WebsiteSettings",
            "WebsiteVerify",
            "WebsiteVisitors"
        ];
    }
}
exports.default = WebsiteService;
