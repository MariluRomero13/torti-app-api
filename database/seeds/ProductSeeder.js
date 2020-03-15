'use strict'

/*
|--------------------------------------------------------------------------
| ProductSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const { products } = use('./data.json')
class ProductSeeder {
  async run () {
  }

  static async _run() {
    for (const product of products) {
      await Factory.model('App/Models/Product').create(product)
    }
  }
}

module.exports = ProductSeeder
