'use strict'

/*
|--------------------------------------------------------------------------
| RoleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const { roles } = use('./data.json')
class RoleSeeder {
  async run () {
  }

  static async _run() {
    for (const role of roles) {
      await Factory.model('App/Models/Role').create(role)
    }
  }
}

module.exports = RoleSeeder
