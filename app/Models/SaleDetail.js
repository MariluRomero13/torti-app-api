'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class SaleDetail extends Model {

  products () {
    return this.hasMany('App/Model/Product', 'product_id')
  }

  sales () {
    return this.hasMany('App/Model/Sale', 'sale_id')
  }

  static get store () {
    return [
      'sale_id',
      'product_id',
      'quantity'
    ]
  }
}

module.exports = SaleDetail
