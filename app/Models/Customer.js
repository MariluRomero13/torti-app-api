'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Customer extends Model {
  assignment_customer () {
    return this.hasMany('App/Models/AssignmentCustomer', 'customer_id')
  }

  pending_payments () {
    return this.hasMany('App/Models/PendingPayment', 'customer_id')
  }

  sale () {
    return this.belongsTo('App/Models/Sale', 'customer_id')
  }

  static get store() {
    return [
      'name',
      'phone',
      'address'
    ]
  }

  static get update() {
    return this.store
  }
}

module.exports = Customer
