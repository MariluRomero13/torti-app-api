'use strict'

/*
|--------------------------------------------------------------------------
| CustomerSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const { customers } = use('./data.json')
class CustomerSeeder {
  async run () {
  }

  static async _run() {
    for (const customer of customers) {
      await Factory.model('App/Models/Customer').create(customer)
    }
  }
}

module.exports = CustomerSeeder
