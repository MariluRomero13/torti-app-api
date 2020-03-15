'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const { users } = use('./data.json')
class UserSeeder {
  async run () {
  }

  static async _run() {
    for (const user of users) {
      await Factory.model('App/Models/User').create(user)
    }
  }
}

module.exports = UserSeeder
