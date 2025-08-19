/*
 * node-crisp-api
 *
 * Copyright 2022, Crisp IM SAS
 * Author: Baptiste Jamin <baptiste@crisp.chat>
 */

import BucketURL from "@/resources/BucketURL";

export class BucketService {
  public __resources: any[] = [
    BucketURL
  ];
}

export interface BucketServiceInterface extends
  BucketURL {}

export default BucketService;
