/*
 * node-crisp-api
 *
 * Copyright 2022, Crisp IM SAS
 * Author: Baptiste Jamin <baptiste@crisp.chat>
 */

import MediaAnimation from "@/resources/MediaAnimation";

/**
 * Crisp Media Service
 */
export class MediaService {
  public __resources: any[] = [
    MediaAnimation
  ];
}

export interface MediaServiceInterface extends
  MediaAnimation {}

export default MediaService;
