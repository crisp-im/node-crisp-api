/*
 * node-crisp-api
 *
 * Copyright 2022, Crisp IM SAS
 * Author: Valerian Saliou <valerian@valeriansaliou.name>
 */

import BaseResource from "./BaseResource";

/**
 * Crisp MediaAnimation Resource
 */
class MediaAnimation extends BaseResource {
  /**
   * List Animation Medias
   */
  listAnimationMedias(pageNumber: number, listID: string, searchQuery: object) {
    return this.crisp.get(
      this.crisp.prepareRestUrl(["media", "animation", "list", String(pageNumber)]),

      {
        list_id      : listID,
        search_query : searchQuery
      }
    );
  };
}

export default MediaAnimation;
