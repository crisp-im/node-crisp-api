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
import BucketURL from "@/resources/BucketURL";

/**
 * Bucket Service
 */
class BucketService {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  public __resources: any[] = [
    BucketURL
  ];
}

export interface BucketServiceInterface extends
  BucketURL {}

export default BucketService;
