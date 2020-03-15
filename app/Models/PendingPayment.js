'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PendingPayment extends Model {
  customers () {
    return this.belongsTo('App/Models/AssignmentCustomer', 'customer_id')
  }

  pending_payment_details () {
    return this.hasMany('App/Models/PendingPaymentDetail', 'pending_payment_id')
  }

  static get store() {
    return [
      'customer_id',
      'deposit'
    ]
  }

  static get update() {
    return [
      'deposit'
    ]
  }
}

module.exports = PendingPayment
