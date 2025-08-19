"use strict";
/*
 * node-crisp-api
 *
 * Copyright 2022, Crisp IM SAS
 * Author: Baptiste Jamin <baptiste@crisp.chat>
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Crisp Plugin Service
 */
class PluginService {
    constructor() {
        this.__resources = [
            "PluginConnect",
            "PluginSubscription"
        ];
    }
}
exports.default = PluginService;
