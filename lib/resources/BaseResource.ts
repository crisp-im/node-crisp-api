/*
 * This file is part of node-crisp-api
 *
 * Copyright (c) 2025 Crisp IM SAS
 * All rights belong to Crisp IM SAS
 */

/**************************************************************************
 * IMPORTS
 ***************************************************************************/

// PROJECT: MAIN
import Crisp from "@/crisp";

/**************************************************************************
 * CLASSES
 ***************************************************************************/

/**
 * Crisp Base Resource
 */
class BaseResource {
  protected crisp: Crisp;

  /**
   * Constructor
   */
  constructor(crisp: Crisp) {
    this.crisp = crisp;
  }
}

/**************************************************************************
 * EXPORTS
 ***************************************************************************/

export default BaseResource;
