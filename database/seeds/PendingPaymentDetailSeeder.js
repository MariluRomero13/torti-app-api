'use strict'

/*
|--------------------------------------------------------------------------
| PendingPaymentDetailSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const { pending_payment_details } = use('./data.json')
class PendingPaymentDetailSeeder {
  async run () {
  }

  static async _run() {
    for (const pending_payment_detail of pending_payment_details) {
      await Factory.model('App/Models/PendingPaymentDetail').create(pending_payment_detail)
    }
  }
}

module.exports = PendingPaymentDetailSeeder
