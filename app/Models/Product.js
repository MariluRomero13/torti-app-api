'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {
  sale_details () {
    return this.belongsTo('App/Models/SaleDetail', 'product_id')
  }

  pending_payment_details () {
    return this.hasMany('App/Models/PendingPaymentDetail', 'id', 'product_id')
  }

  static get store () {
    return [
      'name',
      'unit_price'
    ]
  }

  static get update () {
    return [
      'name',
      'unit_price',
      'status'
    ]
  }
}

module.exports = Product
