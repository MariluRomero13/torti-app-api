'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Employee extends Model {
  user () {
    return this.belongsTo('App/Models/User', 'user_id')
  }

  assignment_customer () {
    return this.hasMany('App/Models/AssignmentCustomer', 'employee_id')
  }

  sale () {
    return this.belongsTo('App/Models/Sale', 'employee_id')
  }

  static get store() {
    return [
      'user_id',
      'name',
      'paternal',
      'maternal',
      'phone',
      'address'
    ]
  }

  static get update() {
    return this.store
  }
}

module.exports = Employee
