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

export type WebsiteTeam = {
  team_id?: string;
  name?: string;
  emoji?: string;
  operators?: string[];
  created_at?: number;
  updated_at?: number;
}

export type WebsiteTeamNew = {
  team_id?: string;
};

/**************************************************************************
 * CLASSES
 ***************************************************************************/

/**
 * Crisp WebsiteTeams Resource
 */
class WebsiteTeamsService extends BaseResource {
  /**
   * List Teams
   */
  listTeams(
    websiteID: string, pageNumber: number = 1
  ): Promise<WebsiteTeam[]> {
    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "teams", "list", String(pageNumber)
      ])
    );
  }

  /**
   * Create A New Team
   */
  createNewTeam(
    websiteID: string, team: WebsiteTeam
  ): Promise<WebsiteTeamNew> {
    return this.crisp.post(
      this.crisp.prepareRestUrl(["website", websiteID, "team"]), null, team
    );
  };

  /**
   * Check If Team Exists
   */
  checkTeamExists(websiteID: string, teamID: string) {
    return this.crisp.head(
      this.crisp.prepareRestUrl(["website", websiteID, "team", teamID])
    );
  };

  /**
   * Get Team
   */
  getTeam(websiteID: string, teamID: string): Promise<WebsiteTeam> {
    return this.crisp.get(
      this.crisp.prepareRestUrl(["website", websiteID, "team", teamID])
    );
  };

  /**
   * Save Team
   */
  saveTeam(websiteID: string, teamID: string, team: WebsiteTeam) {
    return this.crisp.put(
      this.crisp.prepareRestUrl([
        "website", websiteID, "team", teamID
      ]),

      null, team
    );
  };

  /**
   * Delete Team
   */
  deleteTeam(websiteID: string, teamID: string) {
    return this.crisp.delete(
      this.crisp.prepareRestUrl(["website", websiteID, "team", teamID])
    );
  };
}

/**************************************************************************
 * EXPORTS
 ***************************************************************************/

export default WebsiteTeamsService;
