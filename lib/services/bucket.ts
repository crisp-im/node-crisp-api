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
import BucketURL from "@/resources/BucketURL";

/**************************************************************************
 * CLASSES
 ***************************************************************************/

/**
 * Bucket Service
 */
class BucketService {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  public __resources: any[] = [
    BucketURL
  ];
}

/**************************************************************************
 * EXPORTS
 ***************************************************************************/

export interface BucketServiceInterface extends
  BucketURL {}

export default BucketService;
