/*
 * node-crisp-api
 *
 * Copyright 2022, Crisp IM SAS
 * Author: Baptiste Jamin <baptiste@crisp.chat>
 */

/**************************************************************************
 * IMPORTS
 ***************************************************************************/

// PROJECT: RESOURCES
import MediaAnimation from "@/resources/MediaAnimation";

/**************************************************************************
 * CLASSES
 ***************************************************************************/

/**
 * Crisp Media Service
 */
class MediaService {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  public __resources: any[] = [
    MediaAnimation
  ];
}

/**************************************************************************
 * EXPORTS
 ***************************************************************************/

export interface MediaServiceInterface extends
  MediaAnimation {}

export default MediaService;
