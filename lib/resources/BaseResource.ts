/*
 * node-crisp-api
 *
 * Copyright 2022, Crisp IM SAS
 * Author: Baptiste Jamin <baptiste@crisp.chat>
 */

/**************************************************************************
 * IMPORTS
 ***************************************************************************/

// PROJECT: MAIN
import Crisp from "@/crisp";

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

export default BaseResource;
