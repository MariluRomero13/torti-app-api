'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class SaleDetail extends Model {

  products () {
    return this.hasMany('App/Models/Product', 'product_id')
  }

  sale () {
    return this.belongsTo('App/Models/Sale', 'sale_id')
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
