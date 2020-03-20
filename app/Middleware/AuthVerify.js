'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class AuthVerify {
  async handle({ response, auth }, next) {
    try {
      await auth.check();
    } catch (error) {
      return response.status(401).send({ message: error.message });
    }
    await next();
  }
}

module.exports = AuthVerify
