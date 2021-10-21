/*
 * node-crisp-api
 *
 * Copyright 2021, Crisp IM SARL
 * Author: Valerian Saliou <valerian@valeriansaliou.name>
 */


"use strict";


/**
 * Crisp MediaAnimation Resource
 * @class
 * @classdesc This is the Crisp Media Animation Resource
 */
function MediaAnimation(crisp) {
  /**
   * List Animation Medias
   * @memberof MediaAnimation
   * @method listAnimationMedias
   * @return Promise
   */
  this.listAnimationMedias = function(pageNumber, listId, searchQuery) {
    return crisp.get(
      crisp._prepareRestUrl(["media", "animation", "list", pageNumber]),

      {
        list_id      : listId,
        search_query : searchQuery
      }
    );
  };
}


module.exports = MediaAnimation;
