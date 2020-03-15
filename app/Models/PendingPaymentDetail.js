'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PendingPaymentDetail extends Model {
  pending_payments () {
    return this.hasMany('App/Models/PendingPayment', 'pending_payment_id')
  }

  product () {
    return this.hasMany('App/Models/Product', 'product_id')
  }

  static get store() {
    return [
      'pending_payment_id',
      'product_id',
      'quantity'
    ]
  }
}

module.exports = PendingPaymentDetail
