/*
 * node-crisp-api
 *
 * Copyright 2022, Crisp IM SAS
 * Author: Baptiste Jamin <baptiste@crisp.chat>
 */

import Crisp from "@/crisp";

/**
 * Crisp Base Resource
 */
class BaseResource {
  protected crisp: Crisp;

  constructor(crisp: Crisp) {
    this.crisp = crisp;
  }
}

export default BaseResource;
