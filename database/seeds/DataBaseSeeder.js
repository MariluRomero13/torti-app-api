'use strict'

/*
|--------------------------------------------------------------------------
| DataBaseSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const  RoleSeeder = require('./RoleSeeder')
const  UserSeeder = require('./UserSeeder')
const  EmployeeSeeder = require('./EmployeeSeeder')
const  CustomerSeeder = require('./CustomerSeeder')
const  ProductSeeder = require('./ProductSeeder')
const AssignmentCustomerSeeder = require('./AssignmentCustomerSeeder')
// const  SaleSeeder = require('./SaleSeeder')
// const  SaleDetailSeeder = require('./SaleDetailSeeder')
// const  PendingPaymentSeeder = require('./PendingPaymentSeeder')
// const  PendingPaymentDetailSeeder = require('./PendingPaymentDetailSeeder')
class DataBaseSeeder {
  async run () {
    await RoleSeeder._run()
    await UserSeeder._run()
    await EmployeeSeeder._run()
    await CustomerSeeder._run()
    await ProductSeeder._run()
    await AssignmentCustomerSeeder._run()
    // await SaleSeeder._run()
    // await SaleDetailSeeder._run()
    // await PendingPaymentSeeder._run()
    // await PendingPaymentDetailSeeder._run()
  }
}

module.exports = DataBaseSeeder
