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
import BaseResource from "./BaseResource";

/**************************************************************************
 * CLASSES
 ***************************************************************************/

/**
 * Crisp MediaAnimation Resource
 */
class MediaAnimation extends BaseResource {
  /**
   * List Animation Medias
   */
  listAnimationMedias(pageNumber: number, listID: string, searchQuery: object) {
    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "media", "animation", "list", String(pageNumber)
      ]),

      {
        list_id: listID,
        search_query: searchQuery
      }
    );
  };
}

/**************************************************************************
 * EXPORTS
 ***************************************************************************/

export default MediaAnimation;
