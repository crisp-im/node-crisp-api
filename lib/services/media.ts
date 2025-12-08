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
