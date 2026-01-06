/*
 * This file is part of node-crisp-api
 *
 * Copyright (c) 2026 Crisp IM SAS
 * All rights belong to Crisp IM SAS
 */

/**************************************************************************
 * IMPORTS
 ***************************************************************************/

// PROJECT: RESOURCES
import PlanSubscription from "@/resources/PlanSubscription";

/**************************************************************************
 * CLASSES
 ***************************************************************************/

/**
 * Crisp Plan Service
 */
class PlanService {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  public __resources: any[] = [
    PlanSubscription
  ];
}

/**************************************************************************
 * EXPORTS
 ***************************************************************************/

export interface PlanServiceInterface extends PlanSubscription {
}

export default PlanService;
