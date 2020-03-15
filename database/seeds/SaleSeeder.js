'use strict'

/*
|--------------------------------------------------------------------------
| SaleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const { sales } = use('./data.json')
class SaleSeeder {
  async run () {
  }

  static async _run() {
    for (const sale of sales) {
      await Factory.model('App/Models/Sale').create(sale)
    }
  }
}

module.exports = SaleSeeder
