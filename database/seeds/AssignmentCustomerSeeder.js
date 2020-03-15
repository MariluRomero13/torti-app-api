'use strict'

/*
|--------------------------------------------------------------------------
| AssignmentCustomerSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const { assignment_customers } = use('./data.json')
class AssignmentCustomerSeeder {
  async run () {
  }

  static async _run() {
    for (const assignment_customer of assignment_customers) {
      await Factory.model('App/Models/AssignmentCustomer').create(assignment_customer)
    }
  }
}

module.exports = AssignmentCustomerSeeder
