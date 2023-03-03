/*
 * node-crisp-api
 *
 * Copyright 2022, Crisp IM SAS
 * Author: Valerian Saliou <valerian@valeriansaliou.name>
 */


"use strict";


/**
 * Crisp MediaAnimation Resource
 * @class
 * @classdesc This is the Crisp Media Animation Resource
 */
function MediaAnimation(service, crisp) {
  /**
   * List Animation Medias
   * @memberof MediaAnimation
   * @public
   * @method listAnimationMedias
   * @param {number} pageNumber
   * @param {string} listID
   * @param {object} searchQuery
   * @return {Promise}
   */
  service.listAnimationMedias = function(pageNumber, listID, searchQuery) {
    return crisp.get(
      crisp._prepareRestUrl(["media", "animation", "list", pageNumber]),

      {
        list_id      : listID,
        search_query : searchQuery
      }
    );
  };
}


module.exports = MediaAnimation;
