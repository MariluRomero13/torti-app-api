'use strict'

/*
|--------------------------------------------------------------------------
| PendingPaymentSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const { pending_payments } = use('./data.json')
class PendingPaymentSeeder {
  async run () {
  }

  static async _run() {
    for (const pending_payment of pending_payments) {
      await Factory.model('App/Models/PendingPayment').create(pending_payment)
    }
  }
}

module.exports = PendingPaymentSeeder
