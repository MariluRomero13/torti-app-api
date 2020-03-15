'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class AssignmentCustomer extends Model {
  employees () {
    return this.belongsTo('App/Models/AssignmentCustomer', 'employee_id')
  }

  customers () {
    return this.belongsTo('App/Models/AssignmentCustomer', 'customer_id')
  }

  static get store() {
    return [
      'employee_id',
      'customer_id',
      'day'
    ]
  }

  static get update() {
    return this.store
  }
}

module.exports = AssignmentCustomer
