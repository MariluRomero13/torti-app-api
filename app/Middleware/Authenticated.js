'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class Authenticated {
  async handle ({ request, auth, response }, next) {
    try {
      await auth.check()
      return response.route('home')
    } catch (error) {
      await next()
    }
  }
}

module.exports = Authenticated
