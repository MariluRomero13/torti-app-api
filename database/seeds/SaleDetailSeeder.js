'use strict'

/*
|--------------------------------------------------------------------------
| SaleDetailSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const { sales_details } = use('./data.json')
class SaleDetailSeeder {
  async run () {
  }

  static async _run() {
    for (const sale_detail of sales_details) {
      await Factory.model('App/Models/SaleDetail').create(sale_detail)
    }
  }
}

module.exports = SaleDetailSeeder
