'use strict'

/*
|--------------------------------------------------------------------------
| EmployeeSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const { employees } = use('./data.json')
class EmployeeSeeder {
  async run () {
  }

  static async _run() {
    for (const employee of employees) {
      await Factory.model('App/Models/Employee').create(employee)
    }
  }
}

module.exports = EmployeeSeeder
